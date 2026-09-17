import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Pagination from "@/components/marketplace/Pagination";
import ProductGrid from "@/components/marketplace/ProductGrid";
import { getSeller, getSellerProducts } from "@/lib/marketplace";

type Params = Promise<{ username: string }>;
type SearchParams = Promise<{ page?: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { username } = await params;
  const seller = await getSeller(decodeURIComponent(username));
  if (!seller) return { title: "Store not found" };
  return {
    title: `${seller.name}'s store`,
    description: seller.bio || `Shop products from ${seller.name} on the RUS marketplace.`,
    openGraph: { images: seller.photo ? [seller.photo] : [] },
  };
}

export default async function StorePage({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const [{ username }, sp] = await Promise.all([params, searchParams]);
  const seller = await getSeller(decodeURIComponent(username));
  if (!seller) notFound();

  const page = Math.max(1, Math.floor(Number(sp.page)) || 1);
  const products = await getSellerProducts(seller.id, page);
  const storeName = products.items.find((p) => p.businessName)?.businessName ?? seller.name;

  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-5 px-4 py-8 sm:px-8 sm:py-12">
          <div className="relative size-20 shrink-0 overflow-hidden rounded-full border-4 border-purple-100 bg-purple-100 sm:size-24">
            {seller.photo ? (
              <Image src={seller.photo} alt="" fill sizes="96px" className="object-cover" priority />
            ) : (
              <span className="flex h-full items-center justify-center text-3xl font-extrabold text-purple-700">
                {seller.name[0]?.toUpperCase()}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              {storeName}
              {seller.verified && (
                <span className="ml-3 rounded-full bg-purple-100 px-2.5 py-1 align-middle text-xs font-extrabold uppercase text-purple-700">
                  Verified
                </span>
              )}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              @{seller.username}
              {seller.location && ` · ${seller.location}`}
            </p>
            {seller.bio && <p className="mt-3 max-w-2xl text-slate-600">{seller.bio}</p>}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
        {products.items.length > 0 ? (
          <>
            <ProductGrid products={products.items} />
            <Pagination
              page={products.page}
              pageCount={products.pageCount}
              basePath={`/marketplace/store/${encodeURIComponent(seller.username)}`}
            />
          </>
        ) : (
          <p className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center font-semibold text-slate-500">
            This store has no products for sale right now.
          </p>
        )}
      </section>
    </>
  );
}
