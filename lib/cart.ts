// The cart lives in an httpOnly cookie so the server can render and price it, and so it
// survives the redirect out to the payment gateway and back.
import "server-only";
import { cookies } from "next/headers";
import { getProduct, type Product } from "@/lib/marketplace";

export const CART_COOKIE = "rus_cart";
export const MAX_LINES = 30;
export const MAX_QUANTITY = 99;

export type CartLine = { productId: string; quantity: number; size?: string; color?: string };

export const lineKey = (line: Pick<CartLine, "productId" | "size" | "color">) =>
  [line.productId, line.size ?? "", line.color ?? ""].join("|");

export async function readCart(): Promise<CartLine[]> {
  const raw = (await cookies()).get(CART_COOKIE)?.value;
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((l) => l && typeof l.productId === "string" && Number.isInteger(l.quantity))
      .map((l) => ({
        productId: l.productId,
        quantity: Math.min(MAX_QUANTITY, Math.max(1, l.quantity)),
        ...(typeof l.size === "string" && l.size && { size: l.size }),
        ...(typeof l.color === "string" && l.color && { color: l.color }),
      }))
      .slice(0, MAX_LINES);
  } catch {
    return [];
  }
}

/** Only callable from a server action or route handler. */
export async function writeCart(lines: CartLine[]) {
  const store = await cookies();
  if (lines.length === 0) {
    store.delete(CART_COOKIE);
    return;
  }
  store.set(CART_COOKIE, JSON.stringify(lines.slice(0, MAX_LINES)), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export type PricedLine = CartLine & {
  key: string;
  product: Product | null;
  unitPrice: number;
  lineTotal: number;
  deliveryFee: number;
  problem: string | null;
};

export type PricedCart = { lines: PricedLine[]; subtotal: number; delivery: number; total: number; hasProblems: boolean };

/** Prices the cart the same way the API's cart checkout does: variant prices add to the base price,
 *  and each line pays its product's delivery fee once, regardless of quantity. */
export async function priceCart(lines: CartLine[]): Promise<PricedCart> {
  const products = await Promise.all(lines.map((l) => getProduct(l.productId)));

  const priced = lines.map((line, i): PricedLine => {
    const product = products[i];
    const size = product?.sizes.find((s) => s.name === line.size);
    const color = product?.colors.find((c) => c.name === line.color);

    let problem: string | null = null;
    if (!product) problem = "This product is no longer listed";
    else if (!product.available) problem = "This product is no longer available";
    else if (product.sizes.length > 0 && !size) problem = "Choose a size for this product";
    else if (product.colors.length > 0 && !color) problem = "Choose a colour for this product";

    const unitPrice = (product?.price ?? 0) + (size?.price ?? 0) + (color?.price ?? 0);
    return {
      ...line,
      key: lineKey(line),
      product,
      unitPrice,
      lineTotal: unitPrice * line.quantity,
      deliveryFee: product?.deliveryFee ?? 0,
      problem,
    };
  });

  const payable = priced.filter((l) => !l.problem);
  const subtotal = payable.reduce((sum, l) => sum + l.lineTotal, 0);
  const delivery = payable.reduce((sum, l) => sum + l.deliveryFee, 0);
  return { lines: priced, subtotal, delivery, total: subtotal + delivery, hasProblems: priced.some((l) => l.problem) };
}
