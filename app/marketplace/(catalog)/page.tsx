import Link from "next/link";
import ProductGrid from "@/components/marketplace/ProductGrid";
import Pagination from "@/components/marketplace/Pagination";
import { getCatalog, getCategories, humanizeCategory } from "@/lib/marketplace";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)?.trim() || undefined;
const toNumber = (v: string | undefined) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : undefined;
};

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const q = first(sp.q);
  const category = first(sp.category);
  if (q) return { title: `Results for “${q}”`, robots: { index: false } };
  if (category) return { title: humanizeCategory(category) };
  return {};
}

export default async function MarketplacePage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const q = first(sp.q);
  const category = q ? undefined : first(sp.category);
  const min = q ? undefined : toNumber(first(sp.min));
  const max = q ? undefined : toNumber(first(sp.max));
  const page = toNumber(first(sp.page)) ?? 1;

  const [catalog, categories] = await Promise.all([getCatalog({ q, category, min, max, page }), getCategories()]);
  const activeCategory = categories.find((c) => c.slug === category);

  const chipHref = (slug?: string) => {
    const params = new URLSearchParams();
    if (slug) params.set("category", slug);
    if (min) params.set("min", String(min));
    if (max) params.set("max", String(max));
    const qs = params.toString();
    return qs ? `/marketplace?${qs}` : "/marketplace";
  };

  const heading = q
    ? `Results for “${q}”`
    : activeCategory?.title ?? (category ? humanizeCategory(category) : "All products");

  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 pb-6 pt-8 sm:px-8 sm:pt-12">
          <p className="text-xs font-extrabold uppercase tracking-widest text-purple-700">RUS Marketplace</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Shop from sellers across Nigeria
          </h1>

          <form action="/marketplace" method="get" role="search" className="mt-6 flex gap-2">
            <label htmlFor="marketplace-search" className="sr-only">
              Search products
            </label>
            <input
              id="marketplace-search"
              name="q"
              type="search"
              defaultValue={q}
              placeholder="Search phones, books, fashion…"
              className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
            />
            <button
              type="submit"
              className="rounded-xl bg-purple-700 px-5 py-3 text-sm font-bold text-white hover:bg-purple-800 sm:px-8"
            >
              Search
            </button>
          </form>

          {!q && categories.length > 0 && (
            <nav aria-label="Categories" className="-mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
              {[{ slug: "", title: "All" }, ...categories].map((c) => {
                const active = (category ?? "") === c.slug;
                return (
                  <Link
                    key={c.slug || "all"}
                    href={chipHref(c.slug || undefined)}
                    aria-current={active ? "page" : undefined}
                    className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold ${
                      active
                        ? "border-purple-700 bg-purple-700 text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:border-purple-300 hover:text-purple-700"
                    }`}
                  >
                    {c.title}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">{heading}</h2>
            <p className="mt-1 text-sm text-slate-500">
              {catalog.total.toLocaleString("en-NG")} {catalog.total === 1 ? "product" : "products"}
              {q && (
                <>
                  {" · "}
                  <Link href="/marketplace" className="font-semibold text-purple-700 hover:underline">
                    Clear search
                  </Link>
                </>
              )}
            </p>
          </div>

          {!q && (
            <form action="/marketplace" method="get" className="flex items-end gap-2">
              {category && <input type="hidden" name="category" value={category} />}
              <label className="flex flex-col text-xs font-semibold text-slate-500">
                Min ₦
                <input
                  name="min"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  defaultValue={min}
                  className="mt-1 w-24 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-purple-600 focus:outline-none sm:w-28"
                />
              </label>
              <label className="flex flex-col text-xs font-semibold text-slate-500">
                Max ₦
                <input
                  name="max"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  defaultValue={max}
                  className="mt-1 w-24 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-purple-600 focus:outline-none sm:w-28"
                />
              </label>
              <button
                type="submit"
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:border-purple-400 hover:text-purple-700"
              >
                Apply
              </button>
            </form>
          )}
        </div>

        {catalog.items.length > 0 ? (
          <>
            <ProductGrid products={catalog.items} />
            <Pagination
              page={catalog.page}
              pageCount={catalog.pageCount}
              basePath="/marketplace"
              params={{ q, category, min: min?.toString(), max: max?.toString() }}
            />
          </>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <p className="text-lg font-bold text-slate-900">No products found</p>
            <p className="mt-2 text-sm text-slate-500">Try a different search, category or price range.</p>
            <Link
              href="/marketplace"
              className="mt-6 inline-block rounded-xl bg-purple-700 px-5 py-3 text-sm font-bold text-white hover:bg-purple-800"
            >
              Browse all products
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
