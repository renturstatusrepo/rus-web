/**
 * The site's own address, for anything that must be absolute and cannot ask for request headers:
 * canonical URLs, Open Graph images, the sitemap and robots.txt.
 *
 * siteUrl() in lib/checkout reads the incoming host, which is right for redirecting a payment back
 * to wherever the user actually is, but reading headers opts a page out of static rendering — and a
 * sitemap has no request to read in the first place.
 */
export const SITE_ORIGIN = (process.env.SITE_URL || "https://www.renturstatus.com").replace(/\/+$/, "");

/** An absolute URL on this site, for metadata and structured data. */
export const absoluteUrl = (path: string) => `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;

export const productPath = (id: string) => `/marketplace/product/${encodeURIComponent(id)}`;
export const categoryPath = (slug: string) => `/marketplace?category=${encodeURIComponent(slug)}`;

/**
 * How long a quoted price stays valid in structured data. Lives here rather than in the page because
 * it reads the clock: a page computes it once, when it is rendered or regenerated, not per visitor.
 */
export function priceValidUntil(days = 90): string {
  return new Date(Date.now() + days * 86_400_000).toISOString().slice(0, 10);
}
