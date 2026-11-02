import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CopyLink from "@/components/marketplace/CopyLink";
import Pagination from "@/components/marketplace/Pagination";
import { siteUrl } from "@/lib/checkout";
import { formatPrice } from "@/lib/format";
import { getMyAffiliateCode, getPromotableProducts, type PromotableSort } from "@/lib/affiliate";
import { humanizeCategory } from "@/lib/marketplace";
import { referralLink } from "@/lib/referral";

export const metadata: Metadata = { title: "Products to promote", robots: { index: false } };

type SearchParams = Promise<{ sort?: string; q?: string; category?: string; page?: string }>;

/**
 * What an approved affiliate can earn from, ranked.
 *
 * The ordering is the feature: an affiliate is choosing what to spend their audience's attention on,
 * so the page leads with what pays most per sale and lets them re-rank by what actually sells or
 * what has already earned other affiliates money.
 */
const SORTS: Array<{ value: PromotableSort; label: string; hint: string }> = [
  { value: "earning", label: "Pays most", hint: "Highest commission per sale" },
  { value: "top_selling", label: "Top selling", hint: "Most units bought" },
  { value: "top_yielding", label: "Top yielding", hint: "Most commission already paid out to affiliates" },
  { value: "rate", label: "Highest rate", hint: "Biggest percentage" },
  { value: "newest", label: "Newest", hint: "Recently listed" },
];

const isSort = (value: string | undefined): value is PromotableSort =>
  SORTS.some((s) => s.value === value) || value === "price_low";

export default async function PromoteProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const sort: PromotableSort = isSort(sp.sort) ? sp.sort : "earning";
  const page = Math.max(1, Number(sp.page) || 1);

  const [result, code, site] = await Promise.all([
    getPromotableProducts({ sort, q: sp.q, category: sp.category, page }),
    getMyAffiliateCode(),
    siteUrl(),
  ]);

  const query = (next: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    const merged = { sort, q: sp.q, category: sp.category, ...next };
    for (const [key, value] of Object.entries(merged)) {
      if (value && !(key === "sort" && value === "earning")) params.set(key, value);
    }
    const qs = params.toString();
    return `/marketplace/affiliate/products${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-12">
      <div className="mb-6">
        <Link href="/marketplace/affiliate" className="text-sm font-bold text-purple-700 hover:underline">
          ← Affiliate dashboard
        </Link>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">Products to promote</h1>
        <p className="mt-1 text-slate-600">
          Every product here pays you commission on a sale through your link.
        </p>
      </div>

      {!result.ok ? (
        <div className="rounded-3xl border border-amber-200 bg-amber-50 px-6 py-12 text-center">
          <p className="font-extrabold text-amber-900">{result.error}</p>
          <Link href="/marketplace/affiliate" className="mt-3 inline-block text-sm font-bold text-purple-700 hover:underline">
            Go to the affiliate dashboard
          </Link>
        </div>
      ) : (
        <>
          <form action="/marketplace/affiliate/products" className="mb-4 flex flex-wrap gap-2">
            <input type="hidden" name="sort" value={sort} />
            <input
              name="q"
              defaultValue={sp.q ?? ""}
              placeholder="Search products to promote"
              className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-purple-500"
            />
            <button type="submit" className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800">
              Search
            </button>
          </form>

          <div className="mb-6 flex flex-wrap gap-2">
            {SORTS.map((option) => (
              <Link
                key={option.value}
                href={query({ sort: option.value, page: undefined })}
                title={option.hint}
                className={`rounded-full px-4 py-2 text-sm font-bold ${
                  sort === option.value
                    ? "bg-purple-700 text-white"
                    : "border border-slate-300 bg-white text-slate-600 hover:border-purple-400 hover:text-purple-700"
                }`}
              >
                {option.label}
              </Link>
            ))}
          </div>

          <p className="mb-4 text-sm text-slate-500">
            {result.total} {result.total === 1 ? "product" : "products"} paying commission
            {sp.q ? ` matching “${sp.q}”` : ""} · {SORTS.find((s) => s.value === sort)?.hint}
          </p>

          {result.items.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <p className="text-lg font-bold text-slate-900">Nothing to promote here yet</p>
              <p className="mt-2 text-sm text-slate-500">
                {sp.q ? "Try a different search." : "Check back soon — sellers are still joining the programme."}
              </p>
            </div>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {result.items.map((p) => (
                <li key={p.id} className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <Link href={`/marketplace/product/${encodeURIComponent(p.id)}`} className="relative block aspect-square bg-slate-100">
                    {p.image && <Image src={p.image} alt={p.title} fill sizes="(min-width: 1024px) 20rem, 50vw" className="object-cover" />}
                    <span className="absolute left-2 top-2 rounded-full bg-purple-700 px-2.5 py-1 text-xs font-extrabold text-white">
                      {p.affiliateRate}%
                    </span>
                  </Link>

                  <div className="flex flex-1 flex-col gap-3 p-4">
                    <div className="min-w-0">
                      <Link href={`/marketplace/product/${encodeURIComponent(p.id)}`} className="line-clamp-2 font-bold text-slate-900 hover:text-purple-700">
                        {p.title}
                      </Link>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {[humanizeCategory(p.category), p.location].filter(Boolean).join(" · ")}
                      </p>
                    </div>

                    <div className="rounded-xl bg-purple-50 px-3 py-2">
                      <p className="text-xs font-semibold text-purple-900/70">You earn per sale</p>
                      <p className="text-lg font-extrabold text-purple-900">{formatPrice(p.earnPerSale)}</p>
                      <p className="text-xs text-purple-900/60">on {formatPrice(p.price)}</p>
                    </div>

                    <dl className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <dt className="text-[11px] font-semibold text-slate-500">Sold</dt>
                        <dd className="text-sm font-extrabold text-slate-900">{p.unitsSold}</dd>
                      </div>
                      <div>
                        <dt className="text-[11px] font-semibold text-slate-500">Paid out</dt>
                        <dd className="text-sm font-extrabold text-slate-900">{formatPrice(p.commissionEarned)}</dd>
                      </div>
                      <div>
                        <dt className="text-[11px] font-semibold text-slate-500">Clicks</dt>
                        <dd className="text-sm font-extrabold text-slate-900">{p.clicks}</dd>
                      </div>
                    </dl>

                    {code && (
                      <div className="mt-auto">
                        <CopyLink value={referralLink(site, `/marketplace/product/${encodeURIComponent(p.id)}`, code)} />
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}

          {result.pageCount > 1 && (
            <div className="mt-8">
              <Pagination
                page={result.page}
                pageCount={result.pageCount}
                basePath="/marketplace/affiliate/products"
                params={{ sort: sort === "earning" ? "" : sort, q: sp.q ?? "", category: sp.category ?? "" }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
