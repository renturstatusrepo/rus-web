import "server-only";
import { cookies, headers } from "next/headers";
import { callApi, errorMessage } from "@/lib/account";
import type { PricedCart } from "@/lib/cart";

// Remembers a card top-up while the buyer is on the gateway's page, so the return
// handler verifies the reference we created rather than one from the URL.
const PENDING_COOKIE = "rus_checkout";

export type Shipping = { state: string; address: string };
export type PendingPayment = { reference: string; gateway: string; shipping: Shipping };

export async function savePendingPayment(pending: PendingPayment) {
  (await cookies()).set(PENDING_COOKIE, JSON.stringify(pending), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/marketplace/checkout",
    maxAge: 60 * 60,
  });
}

/** Reads and clears the pending payment, so a reloaded return page can't place the order twice. */
export async function takePendingPayment(): Promise<PendingPayment | null> {
  const store = await cookies();
  const raw = store.get(PENDING_COOKIE)?.value;
  if (!raw) return null;
  store.delete({ name: PENDING_COOKIE, path: "/marketplace/checkout" });
  try {
    const p = JSON.parse(raw);
    if (typeof p?.reference !== "string" || typeof p?.gateway !== "string") return null;
    return { reference: p.reference, gateway: p.gateway, shipping: { state: String(p.shipping?.state ?? ""), address: String(p.shipping?.address ?? "") } };
  } catch {
    return null;
  }
}

export async function siteUrl(): Promise<string> {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export type OrderResult = { ok: true; orderId: string } | { ok: false; error: string };

/** Pays for the cart from the buyer's wallet. The API recomputes prices and charges the token's owner. */
export async function placeCartOrder(token: string, cart: PricedCart, shipping: Shipping): Promise<OrderResult> {
  const res = await callApi("/order/checkout-cart", {
    method: "POST",
    token,
    body: {
      items: cart.lines.map((l) => ({
        product_id: l.productId,
        quantity: l.quantity,
        price: l.unitPrice,
        ...(l.size && { selected_size: l.size }),
        ...(l.color && { selected_color: l.color }),
      })),
      shipping_details: shipping,
    },
  });
  if (!res.ok) return { ok: false, error: errorMessage(res, "We couldn’t place your order. Please try again.") };
  return { ok: true, orderId: String(res.body?.data?.parentOrderId ?? "") };
}

export function newPaymentReference(): string {
  return `RUSWEB-${crypto.randomUUID().replace(/-/g, "").slice(0, 24).toUpperCase()}`;
}
