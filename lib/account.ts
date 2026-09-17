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

export function errorMessage(result: ApiResult, fallback: string): string {
  const message = result.body?.message;
  return typeof message === "string" && message ? message : Array.isArray(message) ? message.join(", ") : fallback;
}

export async function getToken(): Promise<string | null> {
  return (await cookies()).get(TOKEN_COOKIE)?.value ?? null;
}

export type Account = { id: string; name: string; email: string; walletBalance: number };

export async function getAccount(): Promise<Account | null> {
  const token = await getToken();
  if (!token) return null;
  const res = await callApi("/user/me", { token });
  const u = res.ok ? res.body?.data : null;
  if (!u?.id) return null;
  return { id: u.id, name: u.name || u.username || "", email: u.email ?? "", walletBalance: Number(u.wallet_balance || 0) };
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
  status: string;
  price: number;
  deliveryFee: number;
  quantity: number;
  createdAt: string;
  size: string | null;
  color: string | null;
  product: { id: string; title: string; image: string | null } | null;
};

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
    status: o.status ?? "paid",
    price: Number(o.price || 0),
    deliveryFee: Number(o.shipping_details?.delivery_fee || 0),
    quantity: Number(o.shipping_details?.quantity || 1),
    createdAt: o.created_at,
    size: o.selected_size || null,
    color: o.selected_color || null,
    product: o.product
      ? { id: o.product.id, title: o.product.title ?? "Product", image: assetUrl(o.product.images?.[0]) }
      : null,
  }));
}
