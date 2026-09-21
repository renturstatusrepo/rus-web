import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { logout } from "@/app/marketplace/actions";
import { getAccount } from "@/lib/account";
import { formatPrice } from "@/lib/format";
import { getMyBusiness } from "@/lib/seller";

export const metadata: Metadata = { title: "Your account", robots: { index: false } };

export default async function AccountPage() {
  const account = await getAccount();
  if (!account) redirect("/marketplace/login?next=/marketplace/account");
  const business = account.role === "business" ? await getMyBusiness() : null;

  const card = "rounded-2xl border border-slate-200 bg-white p-5 sm:p-6";

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-8 sm:py-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Hi, {account.name.split(" ")[0] || "there"}</h1>
      <p className="mt-1 text-sm text-slate-500">
        {account.email}
        {account.username && ` · @${account.username}`}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <section className={card}>
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-500">Wallet</h2>
          <p className="mt-2 text-3xl font-extrabold text-slate-900">{formatPrice(account.walletBalance)}</p>
          <p className="mt-1 text-sm text-slate-500">Used first at checkout. Top up or withdraw in the RUS app.</p>
        </section>

        <section className={card}>
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-500">Shopping</h2>
          <p className="mt-2 text-sm text-slate-600">Track deliveries and confirm when your orders arrive.</p>
          <Link href="/marketplace/orders" className="mt-4 inline-block text-sm font-bold text-purple-700 hover:underline">
            Your orders →
          </Link>
        </section>

        <section className={`${card} sm:col-span-2`}>
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-500">Selling</h2>
          {business ? (
            <>
              <p className="mt-2 font-bold text-slate-900">{business.name}</p>
              <p className="text-sm text-slate-600">Manage your products and ship orders from your seller dashboard.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/marketplace/sell"
                  className="rounded-xl bg-purple-700 px-5 py-3 text-sm font-bold text-white hover:bg-purple-800"
                >
                  Seller dashboard
                </Link>
                <Link
                  href="/marketplace/sell/orders?status=paid"
                  className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:border-purple-400"
                >
                  Orders to ship
                </Link>
              </div>
            </>
          ) : account.role === "icon" ? (
            <p className="mt-2 text-sm text-slate-600">Creator accounts can’t open a store. Contact RUS support to switch.</p>
          ) : (
            <>
              <p className="mt-2 text-sm text-slate-600">
                Have something to sell? Upgrade to a business account for free and list your products on the marketplace.
              </p>
              <Link
                href="/marketplace/sell/setup"
                className="mt-4 inline-block rounded-xl bg-purple-700 px-5 py-3 text-sm font-bold text-white hover:bg-purple-800"
              >
                Become a seller
              </Link>
            </>
          )}
        </section>
      </div>

      <form action={logout} className="mt-10">
        <button type="submit" className="text-sm font-semibold text-slate-500 hover:text-red-600">
          Log out
        </button>
      </form>
    </div>
  );
}
