"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { callApi, errorMessage, getAccount, getGateways, getToken, startSession, TOKEN_COOKIE } from "@/lib/account";
import { lineKey, MAX_LINES, MAX_QUANTITY, priceCart, readCart, writeCart } from "@/lib/cart";
import { newPaymentReference, placeCartOrder, savePendingPayment, siteUrl } from "@/lib/checkout";
import { NIGERIAN_STATES, safeNext } from "@/lib/format";
import { getProduct } from "@/lib/marketplace";

const text = (value: FormDataEntryValue | null) => (typeof value === "string" ? value.trim() : "");
const quantityOf = (value: FormDataEntryValue | null) => {
  const n = Number(value);
  return Number.isInteger(n) ? n : 1;
};

// ── Cart ──────────────────────────────────────────────────────────────────────

export type CartActionState = { ok?: boolean; error?: string } | null;

export async function addToCart(_prev: CartActionState, formData: FormData): Promise<CartActionState> {
  const productId = text(formData.get("productId"));
  const size = text(formData.get("size")) || undefined;
  const color = text(formData.get("color")) || undefined;
  const quantity = Math.min(MAX_QUANTITY, Math.max(1, quantityOf(formData.get("quantity"))));

  const product = await getProduct(productId);
  if (!product?.available) return { error: "This product is no longer available." };
  if (product.sizes.length > 0 && !product.sizes.some((s) => s.name === size)) return { error: "Please choose a size." };
  if (product.colors.length > 0 && !product.colors.some((c) => c.name === color)) return { error: "Please choose a colour." };

  const lines = await readCart();
  const key = lineKey({ productId, size, color });
  const existing = lines.find((l) => lineKey(l) === key);
  if (existing) {
    existing.quantity = Math.min(MAX_QUANTITY, existing.quantity + quantity);
  } else {
    if (lines.length >= MAX_LINES) return { error: `Your cart can hold up to ${MAX_LINES} different items.` };
    lines.push({ productId, quantity, ...(size && { size }), ...(color && { color }) });
  }
  await writeCart(lines);
  return { ok: true };
}

export async function setCartQuantity(formData: FormData) {
  const key = text(formData.get("key"));
  const quantity = Math.min(MAX_QUANTITY, quantityOf(formData.get("quantity")));
  const lines = await readCart();
  await writeCart(
    quantity < 1 ? lines.filter((l) => lineKey(l) !== key) : lines.map((l) => (lineKey(l) === key ? { ...l, quantity } : l)),
  );
}

export async function removeFromCart(formData: FormData) {
  const key = text(formData.get("key"));
  await writeCart((await readCart()).filter((l) => lineKey(l) !== key));
}

// ── Sign in ───────────────────────────────────────────────────────────────────

export type LoginState = { step: "password" | "code"; email?: string; challenge?: string; error?: string };

export async function requestLoginCode(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = text(formData.get("email")).toLowerCase();
  const password = typeof formData.get("password") === "string" ? (formData.get("password") as string) : "";
  if (!email || !password) return { step: "password", email, error: "Enter your email and password." };

  const res = await callApi("/user/login", { method: "POST", body: { email, password } });
  if (!res.ok) return { step: "password", email, error: errorMessage(res, "Those details didn’t work. Please try again.") };
  return { step: "code", email, challenge: typeof res.body?.token === "string" ? res.body.token : "" };
}

export async function verifyLoginCode(prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = text(formData.get("email")).toLowerCase();
  const code = text(formData.get("code"));
  const challenge = text(formData.get("challenge"));
  if (!code) return { ...prev, error: "Enter the code we emailed you." };

  const res = await callApi("/user/verify-otp", { method: "POST", body: { email, code, token: challenge } });
  if (!res.ok || !(await startSession(res.body))) {
    return { step: "code", email, challenge, error: errorMessage(res, "That code didn’t work. Please try again.") };
  }
  redirect(safeNext(text(formData.get("next"))));
}

export async function logout() {
  (await cookies()).delete(TOKEN_COOKIE);
  redirect("/marketplace");
}

// ── Checkout ──────────────────────────────────────────────────────────────────

export type CheckoutState = { error?: string } | null;

export async function placeOrder(_prev: CheckoutState, formData: FormData): Promise<CheckoutState> {
  const token = await getToken();
  const account = token ? await getAccount() : null;
  if (!token || !account) redirect("/marketplace/login?next=/marketplace/checkout");

  const shipping = { state: text(formData.get("state")), address: text(formData.get("address")) };
  if (!NIGERIAN_STATES.includes(shipping.state)) return { error: "Choose the state we should deliver to." };
  if (shipping.address.length < 10) return { error: "Enter your full delivery address." };

  const cart = await priceCart(await readCart());
  if (cart.lines.length === 0) redirect("/marketplace/cart");
  if (cart.hasProblems) return { error: "Some items in your cart need attention. Please review your cart." };

  if (account.walletBalance >= cart.total) {
    const result = await placeCartOrder(token, cart, shipping);
    if (!result.ok) return { error: result.error };
    await writeCart([]);
    redirect(`/marketplace/orders?placed=${encodeURIComponent(result.orderId)}`);
  }

  // Not enough in the wallet: top it up by the difference with a card, then place the order on return
  const gateways = await getGateways();
  const gateway = gateways.find((g) => g.id === text(formData.get("gateway"))) ?? gateways[0];
  if (!gateway) return { error: "Card payments are unavailable right now. Please try again later." };

  const reference = newPaymentReference();
  const res = await callApi("/payment/initialize", {
    method: "POST",
    token,
    body: {
      gateway: gateway.id,
      amount: Math.ceil(cart.total - account.walletBalance),
      email: account.email,
      userId: account.id,
      reference,
      purpose: "Store Purchase",
      callbackUrl: `${await siteUrl()}/marketplace/checkout/complete`,
      metadata: { source: "web" },
    },
  });
  const paymentUrl = res.body?.data?.paymentUrl;
  if (!res.ok || typeof paymentUrl !== "string" || !paymentUrl.startsWith("https://")) {
    // Gateway failures read like "unexpected response format (Status 502)" — useless to a shopper
    console.error(`Card payment could not be started via ${gateway.id}:`, res.body?.message ?? res.status);
    return { error: `We couldn’t reach ${gateway.label} just now. Please try again in a moment.` };
  }

  await savePendingPayment({ reference, gateway: gateway.id, shipping });
  redirect(paymentUrl);
}

// ── Orders ────────────────────────────────────────────────────────────────────

export type CancelState = { error?: string; refund?: number } | null;

/** Buyer cancels an order that hasn't shipped; the API refunds them to their wallet. */
export async function cancelMyOrder(_prev: CancelState, formData: FormData): Promise<CancelState> {
  const token = await getToken();
  if (!token) redirect("/marketplace/login?next=/marketplace/orders");
  const id = text(formData.get("id"));
  const reason = text(formData.get("reason")).slice(0, 500);
  const res = await callApi(`/order/${encodeURIComponent(id)}/cancel`, { method: "POST", token, body: { reason } });
  if (!res.ok) return { error: errorMessage(res, "We couldn’t cancel this order. Please try again.") };
  revalidatePath("/marketplace/orders");
  revalidatePath("/marketplace/account");
  return { refund: Number(res.body?.data?.refund || 0) };
}

export type ReceiptState = { error?: string; ok?: boolean } | null;

export async function confirmReceipt(_prev: ReceiptState, formData: FormData): Promise<ReceiptState> {
  const token = await getToken();
  if (!token) redirect("/marketplace/login?next=/marketplace/orders");
  const id = text(formData.get("id"));
  const res = await callApi(`/order/${encodeURIComponent(id)}/confirm-receipt`, { method: "POST", token });
  if (!res.ok) return { error: errorMessage(res, "We couldn’t confirm this order. Please try again.") };
  revalidatePath("/marketplace/orders");
  return { ok: true };
}
