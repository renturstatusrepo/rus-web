import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DeleteProductButton from "@/components/marketplace/DeleteProductButton";
import { formatPrice } from "@/lib/format";
import { humanizeCategory } from "@/lib/marketplace";
import { getMyProducts, type ProductStatus } from "@/lib/seller";

export const metadata: Metadata = { title: "Your products", robots: { index: false } };

type SearchParams = Promise<{ saved?: string; welcome?: string }>;

const statusBadge: Record<ProductStatus, { label: string; className: string }> = {
  available: { label: "For sale", className: "bg-emerald-50 text-emerald-700" },
  draft: { label: "Draft", className: "bg-slate-100 text-slate-600" },
  "sold out": { label: "Sold out", className: "bg-amber-50 text-amber-800" },
};

export default async function SellerProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const [products, { saved, welcome }] = await Promise.all([getMyProducts(), searchParams]);

  return (
    <>
      {welcome && (
        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900">
          <p className="font-extrabold">Your store is open</p>
          <p className="mt-1 text-sm">Add your first product and it will appear on the marketplace straight away.</p>
        </div>
      )}
      {saved && (
        <p className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
          Saved “{saved}”.
        </p>
      )}

      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          {products.length} {products.length === 1 ? "product" : "products"}
        </p>
        <Link
          href="/marketplace/sell/products/new"
          className="rounded-xl bg-purple-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-purple-700/20 hover:bg-purple-800"
        >
          + Add product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <p className="text-lg font-bold text-slate-900">No products yet</p>
          <p className="mt-2 text-sm text-slate-500">Add photos, a price and a description, and buyers can start ordering.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {products.map((p) => {
            const badge = statusBadge[p.status];
            return (
              <li key={p.id} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center">
                <div className="flex min-w-0 flex-1 gap-4">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:size-20">
                    {p.images[0] && <Image src={p.images[0]} alt="" fill sizes="80px" className="object-cover" />}
                  </div>
                  <div className="min-w-0">
                    <p className="line-clamp-1 font-bold text-slate-900">{p.title}</p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {[humanizeCategory(p.category), `${p.quantity} in stock`, p.sizes.length + p.colors.length > 0 && "Has options"]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="font-extrabold text-slate-900">{formatPrice(p.price)}</span>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${badge.className}`}>{badge.label}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 sm:shrink-0">
                  {p.status === "available" && (
                    <Link
                      href={`/marketplace/product/${encodeURIComponent(p.id)}`}
                      className="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-500 hover:text-purple-700"
                    >
                      View
                    </Link>
                  )}
                  <Link
                    href={`/marketplace/sell/products/${encodeURIComponent(p.id)}/edit`}
                    className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-purple-400 hover:text-purple-700"
                  >
                    Edit
                  </Link>
                  <DeleteProductButton id={p.id} title={p.title} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
