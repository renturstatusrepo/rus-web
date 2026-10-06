import type { MetadataRoute } from "next";
import { getAllListings, getCategories } from "@/lib/marketplace";
import { SITE_ORIGIN, categoryPath, productPath } from "@/lib/site";

/**
 * Without this, the only route to a product page is crawling the catalogue — which is paginated and
 * now shuffled daily, so a crawler that visits twice sees a different order and may never reach the
 * same listing twice. Everything that should be found gets listed here instead.
 *
 * Rebuilt hourly: new listings matter more than a perfectly fresh timestamp on old ones.
 */
export const revalidate = 3600;

const PAGES: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/marketplace", priority: 0.9, changeFrequency: "daily" },
  { path: "/affiliate", priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  { path: "/cookies", priority: 0.2, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [listings, categories] = await Promise.all([
    getAllListings().catch(() => []),
    getCategories().catch(() => []),
  ]);

  const now = new Date();

  return [
    ...PAGES.map(({ path, priority, changeFrequency }) => ({
      url: `${SITE_ORIGIN}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...categories.map((category) => ({
      url: `${SITE_ORIGIN}${categoryPath(category.slug)}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.7,
    })),
    ...listings.map((listing) => ({
      url: `${SITE_ORIGIN}${productPath(listing.id)}`,
      lastModified: listing.updatedAt ? new Date(listing.updatedAt) : now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
