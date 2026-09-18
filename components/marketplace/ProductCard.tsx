import Image from "next/image";
import Link from "next/link";
import { formatPrice, type ProductSummary } from "@/lib/marketplace";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }: { product: ProductSummary }) {
  const href = `/marketplace/product/${encodeURIComponent(product.id)}`;

  return (
    <div className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-0.5 hover:border-purple-300 hover:shadow-soft">
      <Link href={href} className="flex flex-1 flex-col focus-visible:outline-2 focus-visible:outline-purple-600">
        <div className="relative aspect-square bg-slate-100">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(min-width: 1280px) 20vw, (min-width: 768px) 30vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm font-semibold text-slate-400">No image</div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-1 p-3 pb-0 sm:p-4 sm:pb-0">
          <h3 className="line-clamp-2 text-sm font-bold leading-snug text-slate-900 group-hover:text-purple-700">
            {product.title}
          </h3>
          {product.businessName && <p className="truncate text-xs text-slate-500">{product.businessName}</p>}
        </div>
      </Link>

      <div className="flex items-end justify-between gap-2 p-3 pt-2 sm:p-4 sm:pt-2">
        <div className="min-w-0">
          <p className="text-base font-extrabold text-slate-900">{formatPrice(product.price)}</p>
          {product.location && <p className="truncate text-xs text-slate-500">{product.location}</p>}
        </div>

        {product.needsChoice ? (
          <Link
            href={href}
            aria-label={`Choose size or colour for ${product.title}`}
            title="Choose options"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100"
          >
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              <circle cx="9" cy="7" r="2" fill="currentColor" stroke="none" />
              <circle cx="15" cy="12" r="2" fill="currentColor" stroke="none" />
              <circle cx="10" cy="17" r="2" fill="currentColor" stroke="none" />
            </svg>
          </Link>
        ) : (
          <AddToCartButton productId={product.id} title={product.title} />
        )}
      </div>
    </div>
  );
}
