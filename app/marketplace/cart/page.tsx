import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { removeFromCart, setCartQuantity } from "@/app/marketplace/actions";
import { MAX_QUANTITY, priceCart, readCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = { title: "Your cart", robots: { index: false } };

export default async function CartPage() {
  const cart = await priceCart(await readCart());

  if (cart.lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-2xl font-extrabold text-slate-900">Your cart is empty</h1>
        <p className="mt-3 text-slate-600">Find something you love on the marketplace.</p>
        <Link
          href="/marketplace"
          className="mt-8 inline-block rounded-xl bg-purple-700 px-6 py-3 text-sm font-bold text-white hover:bg-purple-800"
        >
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8 sm:py-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Your cart</h1>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <ul className="min-w-0 space-y-3">
          {cart.lines.map((line) => (
            <li key={line.key} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4">
              <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:size-24">
                {line.product?.image && <Image src={line.product.image} alt="" fill sizes="96px" className="object-cover" />}
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex items-start justify-between gap-3">
                  {line.product ? (
                    <Link
                      href={`/marketplace/product/${encodeURIComponent(line.productId)}`}
                      className="line-clamp-2 font-bold text-slate-900 hover:text-purple-700"
                    >
                      {line.product.title}
                    </Link>
                  ) : (
                    <span className="font-bold text-slate-500">Unavailable product</span>
                  )}
                  <span className="shrink-0 font-extrabold text-slate-900">{formatPrice(line.lineTotal)}</span>
                </div>
                <p className="text-xs text-slate-500">
                  {[line.size && `Size ${line.size}`, line.color && `Colour ${line.color}`, `${formatPrice(line.unitPrice)} each`]
                    .filter(Boolean)
                    .join(" · ")}
                  {line.deliveryFee > 0 && ` · ${formatPrice(line.deliveryFee)} delivery`}
                </p>
                {line.problem && <p className="text-xs font-semibold text-red-600">{line.problem}</p>}

                <div className="mt-auto flex items-center gap-2 pt-2">
                  {!line.problem && (
                    <div className="flex items-center rounded-lg border border-slate-200">
                      <form action={setCartQuantity}>
                        <input type="hidden" name="key" value={line.key} />
                        <input type="hidden" name="quantity" value={line.quantity - 1} />
                        <button type="submit" aria-label="Decrease quantity" className="px-3 py-1.5 font-bold text-slate-600 hover:text-purple-700">
                          −
                        </button>
                      </form>
                      <span className="min-w-8 text-center text-sm font-bold" aria-label="Quantity">
                        {line.quantity}
                      </span>
                      <form action={setCartQuantity}>
                        <input type="hidden" name="key" value={line.key} />
                        <input type="hidden" name="quantity" value={line.quantity + 1} />
                        <button
                          type="submit"
                          aria-label="Increase quantity"
                          disabled={line.quantity >= MAX_QUANTITY}
                          className="px-3 py-1.5 font-bold text-slate-600 hover:text-purple-700 disabled:opacity-40"
                        >
                          +
                        </button>
                      </form>
                    </div>
                  )}
                  <form action={removeFromCart}>
                    <input type="hidden" name="key" value={line.key} />
                    <button type="submit" className="px-2 py-1.5 text-sm font-semibold text-slate-500 hover:text-red-600">
                      Remove
                    </button>
                  </form>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit space-y-4 rounded-2xl border border-slate-200 bg-white p-5 lg:sticky lg:top-24">
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-600">Items</dt>
              <dd className="font-semibold">{formatPrice(cart.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-600">Delivery</dt>
              <dd className="font-semibold">{cart.delivery > 0 ? formatPrice(cart.delivery) : "—"}</dd>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-2 text-base">
              <dt className="font-bold">Total</dt>
              <dd className="font-extrabold">{formatPrice(cart.total)}</dd>
            </div>
          </dl>
          {cart.hasProblems ? (
            <p className="text-sm font-semibold text-red-600">Remove unavailable items to continue.</p>
          ) : (
            <Link
              href="/marketplace/checkout"
              className="block rounded-xl bg-purple-700 px-6 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-purple-700/20 hover:bg-purple-800"
            >
              Checkout
            </Link>
          )}
        </aside>
      </div>
    </div>
  );
}
