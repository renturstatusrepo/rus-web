import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCart from "@/components/marketplace/AddToCart";
import ProductGallery from "@/components/marketplace/ProductGallery";
import ProductGrid from "@/components/marketplace/ProductGrid";
import ProductPersonal from "@/components/marketplace/ProductPersonal";
import { formatPrice, getAllListings, getProduct, getRating, getSellerProducts, humanizeCategory } from "@/lib/marketplace";
import { absoluteUrl, categoryPath, priceValidUntil, productPath } from "@/lib/site";

type Params = Promise<{ id: string }>;

/**
 * Re-rendered at most every five minutes, and shared by everyone who asks for it. Nothing on this
 * page depends on who is asking: the app link and the affiliate share box fetch themselves after
 * load, which is what lets a crawler — and every shopper — be served from cache.
 */
export const revalidate = 300;

/**
 * Prerenders a slice of the catalogue at build time so the most likely entry points are already
 * sitting in the cache, and lets every other product render on first request and be cached from
 * then on. Without any static params Next has nothing to prerender and treats each request as
 * one-off work.
 */
export async function generateStaticParams() {
  const listings = await getAllListings(200).catch(() => []);
  return listings.map((listing) => ({ id: listing.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: "Product not found" };

  const description = product.description.slice(0, 160) || `${product.title} on the RUS marketplace`;
  return {
    title: product.title,
    description,
    alternates: { canonical: `/marketplace/product/${encodeURIComponent(product.id)}` },
    openGraph: {
      title: `${product.title} · ${formatPrice(product.price)}`,
      description,
      images: product.images.slice(0, 1),
      type: "website",
    },
    twitter: { card: "summary_large_image", title: product.title, description, images: product.images.slice(0, 1) },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  const offersCommission = product.available && product.affiliateRate > 0;
  const [rating, more] = await Promise.all([getRating(product.id), getSellerProducts(product.sellerId, 1, 9)]);
  const related = more.items.filter((p) => p.id !== product.id).slice(0, 8);
  const sellerName = product.businessName ?? product.seller?.name;

  const url = absoluteUrl(productPath(product.id));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description || `${product.title} from ${sellerName ?? "a verified seller"} on the RUS marketplace.`,
    image: product.images,
    url,
    sku: product.id,
    category: humanizeCategory(product.category),
    itemCondition: "https://schema.org/NewCondition",
    ...(sellerName && { brand: { "@type": "Brand", name: sellerName } }),
    ...(rating && {
      aggregateRating: { "@type": "AggregateRating", ratingValue: rating.average, reviewCount: rating.count },
    }),
    offers: {
      "@type": "Offer",
      url,
      price: product.price,
      priceCurrency: "NGN",
      priceValidUntil: priceValidUntil(),
      availability: product.available ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
      ...(sellerName && { seller: { "@type": "Organization", name: sellerName } }),
      // Merchant listings read richer when delivery is stated outright
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: { "@type": "MonetaryAmount", value: product.deliveryFee, currency: "NGN" },
        shippingDestination: { "@type": "DefinedRegion", addressCountry: "NG" },
      },
    },
  };

  // Where this page sits, which can earn a breadcrumb trail in the result itself
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Marketplace", item: absoluteUrl("/marketplace") },
      ...(product.category
        ? [{ "@type": "ListItem", position: 2, name: humanizeCategory(product.category), item: absoluteUrl(categoryPath(product.category)) }]
        : []),
      { "@type": "ListItem", position: product.category ? 3 : 2, name: product.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c") }}
      />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-8 sm:py-10">
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link href="/marketplace" className="font-semibold hover:text-purple-700">
            Marketplace
          </Link>
          {product.category && (
            <>
              <span aria-hidden="true">/</span>
              <Link
                href={`/marketplace?category=${encodeURIComponent(product.category)}`}
                className="font-semibold hover:text-purple-700"
              >
                {humanizeCategory(product.category)}
              </Link>
            </>
          )}
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <ProductGallery images={product.images} title={product.title} />

          <div className="flex min-w-0 flex-col gap-6">
            <div>
              <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl">
                {product.title}
              </h1>
              {rating && (
                <p className="mt-2 text-sm font-semibold text-slate-600">
                  <span className="text-amber-500" aria-hidden="true">★</span> {rating.average.toFixed(1)} · {rating.count}{" "}
                  {rating.count === 1 ? "review" : "reviews"}
                </p>
              )}
              <p className="mt-4 text-3xl font-extrabold text-slate-900">{formatPrice(product.price)}</p>
              {(product.deliveryFee > 0 || product.location) && (
                <p className="mt-1 text-sm text-slate-500">
                  {[
                    product.deliveryFee > 0 && `+ ${formatPrice(product.deliveryFee)} delivery`,
                    product.location && `Ships from ${product.location}`,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              )}
            </div>

            {product.available ? (
              <div className="space-y-3">
                <AddToCart productId={product.id} sizes={product.sizes} colors={product.colors} />
                <ProductPersonal
                  productId={product.id}
                  price={product.price}
                  affiliateRate={product.affiliateRate}
                  offersCommission={offersCommission}
                />
              </div>
            ) : (
              <p className="rounded-2xl border border-slate-200 bg-slate-100 p-5 text-center font-bold text-slate-600">
                This product is no longer available
              </p>
            )}

            {product.seller && (
              <Link
                href={`/marketplace/store/${encodeURIComponent(product.seller.username)}`}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 hover:border-purple-300"
              >
                <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-purple-100">
                  {product.seller.photo ? (
                    <Image src={product.seller.photo} alt="" fill sizes="48px" className="object-cover" />
                  ) : (
                    <span className="flex h-full items-center justify-center text-lg font-extrabold text-purple-700">
                      {product.seller.name[0]?.toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-slate-500">Sold by</p>
                  <p className="truncate font-bold text-slate-900">
                    {sellerName}
                    {product.seller.verified && (
                      <span className="ml-2 rounded-full bg-purple-100 px-2 py-0.5 align-middle text-[10px] font-extrabold uppercase text-purple-700">
                        Verified
                      </span>
                    )}
                  </p>
                </div>
                <span className="text-sm font-bold text-purple-700">Visit store</span>
              </Link>
            )}

            {product.description && (
              <div>
                <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-500">Description</h2>
                <p className="mt-2 whitespace-pre-line leading-relaxed text-slate-700">{product.description}</p>
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-xl font-extrabold text-slate-900">More from this seller</h2>
            <ProductGrid products={related} />
          </section>
        )}
      </div>
    </>
  );
}
