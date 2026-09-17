import Image from "next/image";
import Link from "next/link";
import { formatPrice, type ProductSummary } from "@/lib/marketplace";

export default function ProductCard({ product }: { product: ProductSummary }) {
  return (
    <Link
      href={`/marketplace/product/${encodeURIComponent(product.id)}`}
      className="group flex w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-0.5 hover:border-purple-300 hover:shadow-soft focus-visible:outline-2 focus-visible:outline-purple-600"
    >
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
      <div className="flex flex-1 flex-col gap-1 p-3 sm:p-4">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug text-slate-900 group-hover:text-purple-700">
          {product.title}
        </h3>
        {product.businessName && <p className="truncate text-xs text-slate-500">{product.businessName}</p>}
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <span className="text-base font-extrabold text-slate-900">{formatPrice(product.price)}</span>
          {product.location && <span className="truncate text-xs text-slate-500">{product.location}</span>}
        </div>
      </div>
    </Link>
  );
}
