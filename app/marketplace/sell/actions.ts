"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { callApi, errorMessage, getAccount, getToken } from "@/lib/account";
import { NIGERIAN_STATES } from "@/lib/format";
import {
  getMyBusiness,
  getMyProduct,
  IMAGE_TYPES,
  MAX_IMAGE_BYTES,
  MAX_PRODUCT_IMAGES,
  uploadImage,
  type OrderStatus,
} from "@/lib/seller";

const text = (value: FormDataEntryValue | null) => (typeof value === "string" ? value.trim() : "");
const amount = (value: FormDataEntryValue | null) => {
  const n = Number(text(value).replace(/,/g, ""));
  return Number.isFinite(n) && n >= 0 ? n : NaN;
};
const files = (formData: FormData, name: string) =>
  formData.getAll(name).filter((f): f is File => f instanceof File && f.size > 0);

async function requireSession() {
  const token = await getToken();
  const account = token ? await getAccount() : null;
  if (!token || !account) redirect("/marketplace/login?next=/marketplace/sell");
  return { token, account };
}

function checkImage(file: File): string | null {
  if (!IMAGE_TYPES.includes(file.type)) return `${file.name} isn’t a JPG, PNG, WEBP or GIF image.`;
  if (file.size > MAX_IMAGE_BYTES) return `${file.name} is larger than 5 MB.`;
  return null;
}

// ── Become a seller ───────────────────────────────────────────────────────────

export type BecomeSellerState = { error?: string } | null;

export async function becomeSeller(_prev: BecomeSellerState, formData: FormData): Promise<BecomeSellerState> {
  const { token, account } = await requireSession();
  if (account.role === "icon") return { error: "Creator accounts can’t open a store. Contact support to switch." };
  if (await getMyBusiness()) redirect("/marketplace/sell");

  const name = text(formData.get("name"));
  const handle = text(formData.get("handle")).toLowerCase();
  const category = text(formData.get("category"));
  const state = text(formData.get("state"));
  const address = text(formData.get("address"));
  const rcNumber = text(formData.get("rcNumber"));
  const [logoFile] = files(formData, "logo");

  if (name.length < 2) return { error: "Enter your business name." };
  if (!/^[a-z0-9](?:[a-z0-9-]{1,38}[a-z0-9])?$/.test(handle)) {
    return { error: "Handles are 3–40 lowercase letters, numbers or hyphens." };
  }
  if (!category) return { error: "Choose what you sell." };
  if (!NIGERIAN_STATES.includes(state)) return { error: "Choose your state." };
  if (address.length < 10) return { error: "Enter your business address." };
  if (rcNumber.length < 5) return { error: "Enter your phone number or RC number." };

  const handleTaken = await callApi(`/business/handle/${encodeURIComponent(handle)}`, { token });
  if (handleTaken.ok) return { error: `The handle “${handle}” is taken. Try another.` };

  let logo: string | undefined;
  if (logoFile) {
    const problem = checkImage(logoFile);
    if (problem) return { error: problem };
    logo = (await uploadImage(token, logoFile)) ?? undefined;
    if (!logo) return { error: "We couldn’t upload your logo. Try again, or skip it for now." };
  }

  const res = await callApi("/business", {
    method: "POST",
    token,
    body: { name, handle, category, country: "Nigeria", state, address, rcNumber, ...(logo && { logo }) },
  });
  if (!res.ok) return { error: errorMessage(res, "We couldn’t set up your store. Please try again.") };

  revalidatePath("/marketplace", "layout");
  redirect("/marketplace/sell?welcome=1");
}

// ── Products ──────────────────────────────────────────────────────────────────

export type ProductFormState = { error?: string } | null;

function readVariants(formData: FormData, prefix: "size" | "color") {
  const names = formData.getAll(`${prefix}Name`).map((v) => text(v));
  const prices = formData.getAll(`${prefix}Price`).map((v) => amount(v));
  return names
    .map((name, i) => ({ name, price: Number.isFinite(prices[i]) ? prices[i] : 0 }))
    .filter((v) => v.name);
}

export async function saveProduct(_prev: ProductFormState, formData: FormData): Promise<ProductFormState> {
  const { token, account } = await requireSession();
  const business = await getMyBusiness();
  if (account.role !== "business" || !business) redirect("/marketplace/sell/setup");

  const id = text(formData.get("id"));
  const existing = id ? await getMyProduct(id, account.id) : null;
  if (id && !existing) return { error: "That product no longer exists." };

  const title = text(formData.get("title"));
  const description = text(formData.get("description"));
  const price = amount(formData.get("price"));
  const quantity = amount(formData.get("quantity"));
  const deliveryFee = amount(formData.get("deliveryFee") || "0");
  const category = text(formData.get("category"));
  const location = text(formData.get("location"));
  const status = text(formData.get("status"));

  if (title.length < 3) return { error: "Give the product a title of at least 3 characters." };
  if (description.length < 10) return { error: "Describe the product in at least 10 characters." };
  if (!Number.isFinite(price) || price <= 0) return { error: "Enter a price above ₦0." };
  if (!Number.isInteger(quantity)) return { error: "Enter how many you have in stock (a whole number)." };
  if (!Number.isFinite(deliveryFee)) return { error: "Enter a delivery fee of ₦0 or more." };
  if (!category) return { error: "Choose a category." };
  if (!["available", "draft", "sold out"].includes(status)) return { error: "Choose whether the product is for sale." };

  const sizes = readVariants(formData, "size");
  const colors = readVariants(formData, "color");

  // Keep only images this product already had, so a form can't attach someone else's files
  const kept = formData.getAll("keepImage").map((v) => text(v)).filter((f) => existing?.imageFiles.includes(f));
  const newImages = files(formData, "images");
  if (kept.length + newImages.length === 0) return { error: "Add at least one photo." };
  if (kept.length + newImages.length > MAX_PRODUCT_IMAGES) return { error: `Use up to ${MAX_PRODUCT_IMAGES} photos.` };
  for (const file of newImages) {
    const problem = checkImage(file);
    if (problem) return { error: problem };
  }

  const uploaded: string[] = [];
  for (const file of newImages) {
    const name = await uploadImage(token, file);
    if (!name) return { error: `We couldn’t upload ${file.name}. Please try again.` };
    uploaded.push(name);
  }

  const body = {
    title,
    description,
    price,
    quantity,
    deliveryFee,
    category,
    ...(location && { location }),
    status,
    images: [...kept, ...uploaded],
    sizes,
    colors,
    businessId: business.id,
  };

  const res = id
    ? await callApi("/product/update", { method: "POST", token, body: { id, ...body } })
    : await callApi("/product/create", { method: "POST", token, body });
  if (!res.ok) return { error: errorMessage(res, "We couldn’t save the product. Please try again.") };

  // Show the change across the catalog, product and store pages now rather than after their 60s cache
  revalidatePath("/marketplace", "layout");
  redirect(`/marketplace/sell?saved=${encodeURIComponent(title)}`);
}

export async function deleteProduct(formData: FormData) {
  const { token } = await requireSession();
  const id = text(formData.get("id"));
  const res = await callApi("/product/delete", { method: "POST", token, body: { id } });
  if (!res.ok) console.error("Product delete failed:", res.body?.message ?? res.status);
  revalidatePath("/marketplace", "layout");
}

// ── Orders ────────────────────────────────────────────────────────────────────

export type OrderStatusState = { error?: string } | null;

/** Seller cancels an order they can't fulfil; the API refunds the buyer in full for that item. */
export async function cancelSellerOrder(_prev: OrderStatusState, formData: FormData): Promise<OrderStatusState> {
  const { token } = await requireSession();
  const id = text(formData.get("id"));
  const reason = text(formData.get("reason")).slice(0, 500);
  if (reason.length < 3) return { error: "Tell the buyer why you’re cancelling." };
  const res = await callApi(`/order/${encodeURIComponent(id)}/cancel`, { method: "POST", token, body: { reason } });
  if (!res.ok) return { error: errorMessage(res, "We couldn’t cancel this order. Please try again.") };
  revalidatePath("/marketplace/sell/orders");
  return null;
}

export async function updateOrderStatus(_prev: OrderStatusState, formData: FormData): Promise<OrderStatusState> {
  const { token } = await requireSession();
  const id = text(formData.get("id"));
  const status = text(formData.get("status")) as OrderStatus;
  if (status !== "in-transit" && status !== "delivered") return { error: "That status can’t be set here." };

  const res = await callApi(`/order/${encodeURIComponent(id)}/status`, { method: "POST", token, body: { status } });
  if (!res.ok) return { error: errorMessage(res, "We couldn’t update this order. Please try again.") };
  revalidatePath("/marketplace/sell/orders");
  return null;
}
