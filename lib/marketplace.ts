// Server-only data layer for the web marketplace.
// Every API record is mapped to a narrow public shape here, so contact details,
// balances and other private fields returned by the API never reach the browser.
import "server-only";

export { formatPrice } from "@/lib/format";

const API_URL = process.env.API_URL || "https://api.renturstatus.com/api";
const ASSET_URL = process.env.ASSET_URL || "https://rus-assets.fra1.cdn.digitaloceanspaces.com";
const LINK_URL = process.env.LINK_URL || "https://link.renturstatus.com";

export const PAGE_SIZE = 24;

export type Variant = { name: string; price: number };

export type ProductSummary = {
  id: string;
  title: string;
  price: number;
  image: string | null;
  category: string;
  location: string | null;
  businessName: string | null;
  /** Sizes or colours mean the buyer must pick a variant on the product page before adding to the cart. */
  needsChoice: boolean;
};

export type Product = ProductSummary & {
  description: string;
  images: string[];
  deliveryFee: number;
  quantity: number | null;
  sizes: Variant[];
  colors: Variant[];
  createdAt: string;
  sellerId: string;
  seller: Seller | null;
  available: boolean;
  appLink: string;
};

export type Seller = {
  id: string;
  username: string;
  name: string;
  photo: string | null;
  verified: boolean;
  location: string | null;
  bio: string | null;
};

export type Category = { slug: string; title: string };

export type Page<T> = { items: T[]; total: number; page: number; pageCount: number };

type ApiResponse<T> = { success: boolean; data?: T; total?: number; message?: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Raw = any;

async function api<T>(path: string, revalidate = 60): Promise<ApiResponse<T> | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, { next: { revalidate } });
    if (!res.ok) return null;
    const json = (await res.json()) as ApiResponse<T>;
    return json.success ? json : null;
  } catch (error) {
    console.error(`Marketplace API request failed: ${path}`, error);
    return null;
  }
}

export function assetUrl(file: unknown): string | null {
  if (typeof file !== "string" || !file) return null;
  return file.startsWith("http") ? file : `${ASSET_URL}/images/${file}`;
}

/** "electronics-and gadgets" -> "Electronics and Gadgets"; strips generated slug suffixes. */
export function humanizeCategory(slug: string): string {
  const cleaned = slug
    .trim()
    .replace(/-[a-z0-9]{16,}$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ");
  return cleaned.replace(/\b\w+/g, (w) => (["and", "in", "of"].includes(w) ? w : w[0].toUpperCase() + w.slice(1)));
}

function toVariants(list: unknown): Variant[] {
  if (!Array.isArray(list)) return [];
  return list
    .map((v: Raw) => (typeof v === "string" ? { name: v, price: 0 } : { name: String(v?.name ?? ""), price: Number(v?.price || 0) }))
    .filter((v) => v.name);
}

function toSummary(p: Raw): ProductSummary {
  const images: unknown[] = Array.isArray(p.images) ? p.images : [];
  return {
    id: p.id,
    title: p.title ?? "Untitled product",
    price: Number(p.price || 0),
    image: assetUrl(images[0]),
    category: p.category ?? "",
    location: p.location || null,
    businessName: p.businesses?.name || null,
    needsChoice: toVariants(p.sizes).length > 0 || toVariants(p.colors).length > 0,
  };
}

function toSeller(u: Raw): Seller | null {
  if (!u?.id || !u?.username) return null;
  return {
    id: u.id,
    username: u.username,
    name: u.name || u.username,
    photo: assetUrl(u.photo),
    verified: Boolean(u.verified),
    location: u.location || null,
    bio: u.bio || null,
  };
}

// The API has no "for sale" filter on every list endpoint, and plans share the products table.
const isListable = (p: Raw) => p && p.status === "available" && p.category !== "plan";

function toPage(res: ApiResponse<Raw[]> | null, page: number, limit = PAGE_SIZE): Page<ProductSummary> {
  const total = res?.total ?? 0;
  return {
    items: (res?.data ?? []).filter(isListable).map(toSummary),
    total,
    page,
    pageCount: Math.max(1, Math.ceil(total / limit)),
  };
}

export type CatalogQuery = { q?: string; category?: string; min?: number; max?: number; page?: number };

export async function getCatalog({ q, category, min, max, page = 1 }: CatalogQuery): Promise<Page<ProductSummary>> {
  const params = new URLSearchParams({ page: String(page), limit: String(PAGE_SIZE) });

  if (q) {
    // The search endpoint interpolates q into a PostgREST or() filter, where commas and
    // parentheses are syntax. Strip them so queries like "red, shoes" don't break.
    params.set("q", q.replace(/[,()]/g, " ").trim());
    return toPage(await api<Raw[]>(`/products/web-search?${params}`, 30), page);
  }

  params.set("status", "available");
  if (category) params.set("category", category);
  if (min) params.set("price_from", String(min));
  if (max) params.set("price_to", String(max));
  return toPage(await api<Raw[]>(`/products/filter?${params}`), page);
}

export async function getCategories(): Promise<Category[]> {
  const res = await api<Raw[]>("/categories?limit=100", 3600);
  if (res?.data?.length) {
    return res.data
      .filter((c: Raw) => c?.slug && c.slug !== "plan")
      .map((c: Raw) => ({ slug: c.slug, title: c.title || humanizeCategory(c.slug) }));
  }

  // GET /categories currently requires auth. Until it is public, derive the
  // list from categories that recent listings actually use.
  const recent = await api<Raw[]>("/products/filter?status=available&limit=100", 3600);
  const slugs = new Set<string>();
  for (const p of recent?.data ?? []) if (isListable(p) && p.category?.trim()) slugs.add(p.category);
  return [...slugs].map((slug) => ({ slug, title: humanizeCategory(slug) })).sort((a, b) => a.title.localeCompare(b.title));
}

export async function getProduct(id: string): Promise<Product | null> {
  const res = await api<Raw>(`/product/${encodeURIComponent(id)}`);
  const p = res?.data;
  if (!p || p.category === "plan" || p.active === false) return null;

  const images = (Array.isArray(p.images) ? p.images : []).map(assetUrl).filter(Boolean) as string[];
  return {
    ...toSummary(p),
    description: p.description ?? "",
    images,
    deliveryFee: Number(p.delivery_fee || 0),
    quantity: typeof p.quantity === "number" ? p.quantity : null,
    sizes: toVariants(p.sizes),
    colors: toVariants(p.colors),
    createdAt: p.created_at,
    sellerId: p.user_id,
    seller: toSeller(p.users),
    available: p.status === "available",
    appLink: `${LINK_URL}/p/${encodeURIComponent(p.id)}`,
  };
}

export async function getRating(productId: string): Promise<{ average: number; count: number } | null> {
  const res = await api<Raw>(`/product/${encodeURIComponent(productId)}/rating/average`, 300);
  const average = Number(res?.data?.average ?? 0);
  const count = Number(res?.data?.count ?? 0);
  return count > 0 ? { average, count } : null;
}

export async function getSeller(username: string): Promise<Seller | null> {
  const res = await api<Raw>(`/user/slug/${encodeURIComponent(username)}`, 300);
  return toSeller(res?.data);
}

export async function getSellerProducts(sellerId: string, page = 1, limit = PAGE_SIZE): Promise<Page<ProductSummary>> {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  return toPage(await api<Raw[]>(`/products/user/${encodeURIComponent(sellerId)}?${params}`), page, limit);
}
