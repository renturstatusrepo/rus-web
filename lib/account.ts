// Server-only helpers for signed-in marketplace features.
// The API access token lives in an httpOnly cookie and is only ever sent to the API from the server.
import "server-only";
import { cookies } from "next/headers";
import { assetUrl } from "@/lib/marketplace";

const API_URL = process.env.API_URL || "https://api.renturstatus.com/api";

export const TOKEN_COOKIE = "rus_token";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Raw = any;

export type ApiResult = { ok: boolean; status: number; body: Raw };

export async function callApi(path: string, init: { method?: string; body?: unknown; token?: string | null } = {}): Promise<ApiResult> {
  const headers: Record<string, string> = { Accept: "application/json" };
  if (init.body !== undefined) headers["Content-Type"] = "application/json";
  if (init.token) headers.Authorization = `Bearer ${init.token}`;

  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: init.method ?? "GET",
      headers,
      body: init.body === undefined ? undefined : JSON.stringify(init.body),
      cache: "no-store",
    });
    const body = await res.json().catch(() => null);
    // The API reports most failures as HTTP 200 with success: false
    return { ok: res.ok && body?.success !== false, status: res.status, body };
  } catch (error) {
    console.error(`API request failed: ${path}`, error);
    return { ok: false, status: 503, body: { message: "We couldn’t reach RUS. Please try again." } };
  }
}

/**
 * A message worth showing a shopper. Payment gateways and validation pipes return things like
 * `{"customer.email":{"message":"..."}}`, which means nothing to a buyer, so those are logged
 * and replaced with the caller's plain-English fallback.
 */
export function errorMessage(result: ApiResult, fallback: string): string {
  const raw = result.body?.message;
  const message = typeof raw === "string" ? raw : Array.isArray(raw) ? raw.join(", ") : "";
  if (!message) return fallback;

  const technical = message.includes("{") || message.includes('"') || message.length > 160;
  if (technical) {
    console.error(`API error shown as "${fallback}": ${message}`);
    return fallback;
  }
  return message;
}

/**
 * Stores the access token from a login or sign-up response in an httpOnly cookie.
 * Returns false when the response carries no token. Only callable from a server action or route handler.
 */
export async function startSession(body: Raw): Promise<boolean> {
  const accessToken = body?.data?.accessToken ?? body?.accessToken;
  if (typeof accessToken !== "string" || !accessToken) return false;
  const expiresIn = Number(body?.data?.expiresIn ?? body?.expiresIn) || 60 * 60 * 24 * 7;
  (await cookies()).set(TOKEN_COOKIE, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: expiresIn,
  });
  return true;
}

export async function getToken(): Promise<string | null> {
  return (await cookies()).get(TOKEN_COOKIE)?.value ?? null;
}

export type Account = {
  id: string;
  name: string;
  username: string;
  email: string;
  role: "user" | "business" | "icon";
  walletBalance: number;
};

export async function getAccount(): Promise<Account | null> {
  const token = await getToken();
  if (!token) return null;
  const res = await callApi("/user/me", { token });
  const u = res.ok ? res.body?.data : null;
  if (!u?.id) return null;
  return {
    id: u.id,
    name: u.name || u.username || "",
    username: u.username ?? "",
    email: u.email ?? "",
    role: u.role === "business" || u.role === "icon" ? u.role : "user",
    walletBalance: Number(u.wallet_balance || 0),
  };
}

export type Gateway = { id: string; label: string };

// Gateways that finish on a hosted page we can redirect to. Sarepay only offers an in-app widget.
const REDIRECT_GATEWAYS = new Set(["paystack", "monnify", "korapay", "flutterwave"]);

export async function getGateways(): Promise<Gateway[]> {
  const res = await callApi("/payment/gateways");
  const list: Raw[] = res.ok && Array.isArray(res.body?.data) ? res.body.data : [];
  return list.filter((g) => REDIRECT_GATEWAYS.has(String(g?.id).toLowerCase())).map((g) => ({ id: String(g.id).toLowerCase(), label: g.label || g.id }));
}

export type Order = {
  id: string;
  orderId: string;
  /** The checkout this item belongs to: several items bought together share one reference (and one invoice) */
  reference: string;
  status: string;
  price: number;
  deliveryFee: number;
  /** This item's share of any coupon or voucher discount */
  discount: number;
  quantity: number;
  createdAt: string;
  size: string | null;
  color: string | null;
  product: { id: string; title: string; image: string | null } | null;
  /** The store the item was bought from, as shown on the order and its invoice */
  seller: { name: string; logo: string | null };
  deliveryState: string;
  deliveryAddress: string;
  /** Set once an order is cancelled */
  cancellation: { by: "buyer" | "seller" | "admin"; reason: string | null; refund: number } | null;
};

/** The cancellation recorded on an order's shipping details, if any. */
export function readCancellation(details: Raw): Order["cancellation"] {
  if (!details?.cancelled_at) return null;
  const by = details.cancelled_by === "seller" || details.cancelled_by === "admin" ? details.cancelled_by : "buyer";
  return { by, reason: details.cancel_reason || null, refund: Number(details.refund_amount || 0) };
}

export async function getOrders(): Promise<Order[] | null> {
  const token = await getToken();
  if (!token) return null;
  const res = await callApi("/orders/user?limit=50", { token });
  if (res.status === 401) return null;
  const rows: Raw[] = res.ok && Array.isArray(res.body?.data) ? res.body.data : [];
  // Map to a narrow shape: the API joins the seller's full user record onto each product
  return rows.map((o) => ({
    id: String(o.id),
    orderId: o.order_id ?? o.orderId ?? String(o.id),
    reference: o.shipping_details?.parent_order_id || o.order_id || String(o.id),
    status: o.status ?? "paid",
    price: Number(o.price || 0),
    deliveryFee: Number(o.shipping_details?.delivery_fee || 0),
    discount: Number(o.shipping_details?.discount || 0),
    quantity: Number(o.shipping_details?.quantity || 1),
    createdAt: o.created_at,
    size: o.selected_size || null,
    color: o.selected_color || null,
    product: o.product
      ? { id: o.product.id, title: o.product.title ?? "Product", image: assetUrl(o.product.images?.[0]) }
      : null,
    seller: {
      name: o.product?.merchant_name || o.product?.businesses?.name || o.product?.users?.name || o.product?.users?.username || "RUS seller",
      logo: assetUrl(o.product?.merchant_logo || o.product?.businesses?.logo || o.product?.users?.photo),
    },
    deliveryState: o.shipping_details?.state ?? "",
    deliveryAddress: o.shipping_details?.address ?? "",
    cancellation: readCancellation(o.shipping_details),
  }));
}
