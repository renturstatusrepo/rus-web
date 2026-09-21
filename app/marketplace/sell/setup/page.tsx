import type { Metadata } from "next";
import { redirect } from "next/navigation";
import BecomeSellerForm from "@/components/marketplace/BecomeSellerForm";
import { getAccount } from "@/lib/account";
import { getCategories } from "@/lib/marketplace";
import { getMyBusiness } from "@/lib/seller";

export const metadata: Metadata = { title: "Open your store", robots: { index: false } };

export default async function BecomeSellerPage() {
  const account = await getAccount();
  if (!account) redirect("/marketplace/signup?next=/marketplace/sell/setup");
  if (account.role === "business" && (await getMyBusiness())) redirect("/marketplace/sell");

  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:py-16">
      <p className="text-xs font-extrabold uppercase tracking-widest text-purple-700">Sell on RUS</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">Open your store</h1>
      <p className="mt-3 text-slate-600">
        Upgrade to a business account to list products and receive orders. Buyers pay into escrow, and the money is
        released to your wallet once they confirm delivery.
      </p>

      {account.role === "icon" ? (
        <p className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
          Your account is set up as a creator account, which can’t open a store. Contact RUS support to switch.
        </p>
      ) : (
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
          <BecomeSellerForm categories={categories} suggestedName={account.name} />
        </div>
      )}
    </div>
  );
}
