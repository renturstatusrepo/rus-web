import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import SellerTabs from "@/components/marketplace/SellerTabs";
import { getAccount } from "@/lib/account";
import { getMyBusiness } from "@/lib/seller";

export default async function SellerDashboardLayout({ children }: { children: React.ReactNode }) {
  const account = await getAccount();
  if (!account) redirect("/marketplace/login?next=/marketplace/sell");
  const business = await getMyBusiness();
  if (account.role !== "business" || !business) redirect("/marketplace/sell/setup");

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-10">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative size-14 shrink-0 overflow-hidden rounded-2xl bg-purple-100">
            {business.logo ? (
              <Image src={business.logo} alt="" fill sizes="56px" className="object-cover" />
            ) : (
              <span className="flex h-full items-center justify-center text-xl font-extrabold text-purple-700">
                {business.name[0]?.toUpperCase()}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-extrabold uppercase tracking-widest text-purple-700">Seller dashboard</p>
            <h1 className="truncate text-2xl font-extrabold tracking-tight text-slate-900">{business.name}</h1>
          </div>
        </div>
        {account.username && (
          <Link
            href={`/marketplace/store/${encodeURIComponent(account.username)}`}
            className="self-start rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-purple-400 hover:text-purple-700 sm:self-auto"
          >
            View my store
          </Link>
        )}
      </header>
      <SellerTabs />
      <div className="mt-6">{children}</div>
    </div>
  );
}
