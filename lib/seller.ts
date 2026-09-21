// Server-only reads for the seller dashboard. Every call runs with the signed-in seller's token,
// and the API only returns their own business, products and orders.
import "server-only";
import { callApi, getToken, readCancellation, type Order } from "@/lib/account";
import { assetUrl, type Variant } from "@/lib/marketplace";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Raw = any;

export type Business = {
  id: string;
  name: string;
  handle: string | null;
  category: string | null;
  state: string | null;
  address: string | null;
  logo: string | null;
};

export async function getMyBusiness(): Promise<Business | null> {
  const token = await getToken();
  if (!token) return null;
  const res = await callApi("/business", { token });
  const b: Raw = res.ok && Array.isArray(res.body?.data) ? res.body.data[0] : null;
  if (!b?.id) return null;
  return {
    id: b.id,
    name: b.name,
    handle: b.handle ?? null,
    category: b.category ?? null,
    state: b.state ?? null,
    address: b.address ?? null,
    logo: assetUrl(b.logo),
  };
}

export type ProductStatus = "available" | "sold out" | "draft";

export type SellerProduct = {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  deliveryFee: number;
  category: string;
  location: string;
  status: ProductStatus;
  /** Stored file names, as the API expects them back */
  imageFiles: string[];
  /** The same images as displayable URLs */
  images: string[];
  sizes: Variant[];
  colors: Variant[];
  createdAt: string;
};

const toVariants = (list: unknown): Variant[] =>
  Array.isArray(list)
    ? list
        .map((v: Raw) => (typeof v === "string" ? { name: v, price: 0 } : { name: String(v?.name ?? ""), price: Number(v?.price || 0) }))
        .filter((v) => v.name)
    : [];

function toSellerProduct(p: Raw): SellerProduct {
  const files: string[] = (Array.isArray(p.images) ? p.images : []).filter((f: unknown) => typeof f === "string" && f);
  return {
    id: p.id,
    title: p.title ?? "",
    description: p.description ?? "",
    price: Number(p.price || 0),
    quantity: Number(p.quantity || 0),
    deliveryFee: Number(p.delivery_fee || 0),
    category: p.category ?? "",
    location: p.location ?? "",
    status: p.status === "sold out" || p.status === "draft" ? p.status : "available",
    imageFiles: files,
    images: files.map(assetUrl).filter(Boolean) as string[],
    sizes: toVariants(p.sizes),
    colors: toVariants(p.colors),
    createdAt: p.created_at,
  };
}

export async function getMyProducts(): Promise<SellerProduct[]> {
  const token = await getToken();
  if (!token) return [];
  const res = await callApi("/products/user?limit=100", { token });
  const rows: Raw[] = res.ok && Array.isArray(res.body?.data) ? res.body.data : [];
  return rows.filter((p) => p.category !== "plan").map(toSellerProduct);
}

/** One of the seller's own products, drafts included, for the edit form. */
export async function getMyProduct(id: string, sellerId: string): Promise<SellerProduct | null> {
  const token = await getToken();
  if (!token) return null;
  const res = await callApi(`/product/${encodeURIComponent(id)}`, { token });
  const p: Raw = res.ok ? res.body?.data : null;
  // The API refuses edits from anyone else anyway; this just avoids showing them the form
  return p?.id && p.user_id === sellerId ? toSellerProduct(p) : null;
}

export type OrderStatus = "paid" | "in-transit" | "delivered" | "completed" | "cancelled";

export type SellerOrder = {
  id: string;
  orderId: string;
  status: OrderStatus;
  amount: number;
  quantity: number;
  size: string | null;
  color: string | null;
  createdAt: string;
  buyerName: string;
  deliveryState: string;
  deliveryAddress: string;
  product: { id: string; title: string; image: string | null } | null;
  cancellation: Order["cancellation"];
};

export async function getSellerOrders(status?: OrderStatus): Promise<SellerOrder[]> {
  const token = await getToken();
  if (!token) return [];
  const params = new URLSearchParams({ limit: "100" });
  if (status) params.set("status", status);
  const res = await callApi(`/orders/merchant?${params}`, { token });
  const rows: Raw[] = res.ok && Array.isArray(res.body?.data) ? res.body.data : [];
  return rows.map((o) => {
    const shipping = o.shipping_details ?? {};
    return {
      id: String(o.id),
      orderId: o.order_id ?? String(o.id),
      status: o.status,
      // What the buyer paid for this item, which is also what a cancellation refunds
      amount: Math.max(0, Number(o.price || 0) + Number(shipping.delivery_fee || 0) - Number(shipping.discount || 0)),
      quantity: Number(shipping.quantity || 1),
      size: o.selected_size || null,
      color: o.selected_color || null,
      createdAt: o.created_at,
      buyerName: o.users?.name || o.users?.username || "Buyer",
      deliveryState: shipping.state ?? "",
      deliveryAddress: shipping.address ?? "",
      product: o.product ? { id: o.product.id, title: o.product.title ?? "Product", image: assetUrl(o.product.images?.[0]) } : null,
      cancellation: readCancellation(shipping),
    };
  });
}

const API_URL = process.env.API_URL || "https://api.renturstatus.com/api";

export const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export const MAX_PRODUCT_IMAGES = 6;

/** Sends one image to the API's upload endpoint and returns the stored file name. */
export async function uploadImage(token: string, file: File): Promise<string | null> {
  const body = new FormData();
  body.append("file", file, file.name || "image");
  try {
    const res = await fetch(`${API_URL}/upload/image`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body,
      cache: "no-store",
    });
    const json = await res.json().catch(() => null);
    const name = json?.data?.file;
    return res.ok && json?.success !== false && typeof name === "string" ? name : null;
  } catch (error) {
    console.error("Image upload failed", error);
    return null;
  }
}
