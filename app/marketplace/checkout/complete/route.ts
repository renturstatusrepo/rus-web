import { NextResponse } from "next/server";
import { callApi, getToken } from "@/lib/account";
import { priceCart, readCart, writeCart } from "@/lib/cart";
import { placeCartOrder, siteUrl, takePendingPayment } from "@/lib/checkout";

// The payment gateway sends the buyer back here after a card top-up.
export async function GET() {
  const base = await siteUrl();
  const go = (path: string) => NextResponse.redirect(new URL(path, base), 303);

  const pending = await takePendingPayment();
  if (!pending) return go("/marketplace/orders");

  const token = await getToken();
  if (!token) return go("/marketplace/login?next=/marketplace/checkout");

  // Verifying with the gateway also credits the wallet (idempotently) if the webhook hasn't yet
  const params = new URLSearchParams({ gateway: pending.gateway, reference: pending.reference });
  const verified = await callApi(`/payment/verify?${params}`, { token });
  if (!verified.ok || verified.body?.data?.status !== "success") return go("/marketplace/checkout?payment=failed");

  const cart = await priceCart(await readCart());
  if (cart.lines.length === 0 || cart.hasProblems) return go("/marketplace/checkout?payment=funded");

  const result = await placeCartOrder(token, cart, pending.shipping);
  if (!result.ok) return go("/marketplace/checkout?payment=funded");

  await writeCart([]);
  return go(`/marketplace/orders?placed=${encodeURIComponent(result.orderId)}`);
}
