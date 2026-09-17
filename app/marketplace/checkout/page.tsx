import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import CheckoutForm from "@/components/marketplace/CheckoutForm";
import { getAccount, getGateways } from "@/lib/account";
import { priceCart, readCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

type SearchParams = Promise<{ payment?: string }>;

const notices: Record<string, { tone: string; text: string }> = {
  failed: {
    tone: "border-red-200 bg-red-50 text-red-800",
    text: "Your card payment didn’t go through, so no order was placed. You can try again.",
  },
  funded: {
    tone: "border-amber-200 bg-amber-50 text-amber-900",
    text: "Your payment was received and added to your RUS wallet, but we couldn’t place the order. Review your cart and pay from your wallet.",
  },
};

export default async function CheckoutPage({ searchParams }: { searchParams: SearchParams }) {
  const account = await getAccount();
  if (!account) redirect("/marketplace/login?next=/marketplace/checkout");

  const [cart, gateways, { payment }] = await Promise.all([priceCart(await readCart()), getGateways(), searchParams]);
  if (cart.lines.length === 0) redirect("/marketplace/cart");
  if (cart.hasProblems) redirect("/marketplace/cart");

  const notice = payment ? notices[payment] : undefined;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8 sm:py-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Checkout</h1>
      {notice && <p className={`mt-6 rounded-xl border p-4 text-sm font-semibold ${notice.tone}`}>{notice.text}</p>}

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          <CheckoutForm total={cart.total} walletBalance={account.walletBalance} gateways={gateways} />
        </div>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 lg:sticky lg:top-24">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-slate-900">Order summary</h2>
            <Link href="/marketplace/cart" className="text-sm font-semibold text-purple-700 hover:underline">
              Edit
            </Link>
          </div>
          <ul className="mt-4 space-y-3 text-sm">
            {cart.lines.map((line) => (
              <li key={line.key} className="flex justify-between gap-3">
                <span className="min-w-0 text-slate-700">
                  <span className="line-clamp-2">{line.product?.title}</span>
                  <span className="text-xs text-slate-500">
                    {[`Qty ${line.quantity}`, line.size, line.color].filter(Boolean).join(" · ")}
                  </span>
                </span>
                <span className="shrink-0 font-semibold">{formatPrice(line.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-600">Delivery</dt>
              <dd className="font-semibold">{cart.delivery > 0 ? formatPrice(cart.delivery) : "—"}</dd>
            </div>
            <div className="flex justify-between text-base">
              <dt className="font-bold">Total</dt>
              <dd className="font-extrabold">{formatPrice(cart.total)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
