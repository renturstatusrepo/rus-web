import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/site";

/**
 * What crawlers may read, and where the sitemap is.
 *
 * Everything behind a sign-in or tied to one person is kept out: those pages are useless in a search
 * result, they waste the crawl budget that should be reaching listings, and a cart or order page
 * that did get indexed would be an unpleasant surprise for whoever found it.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/marketplace/cart",
          "/marketplace/checkout",
          "/marketplace/orders",
          "/marketplace/account",
          "/marketplace/sell",
          "/marketplace/login",
          "/marketplace/signup",
          "/marketplace/affiliate",
          // Search result pages: infinite combinations, no unique content of their own
          "/marketplace?q=",
        ],
      },
    ],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    host: SITE_ORIGIN,
  };
}
