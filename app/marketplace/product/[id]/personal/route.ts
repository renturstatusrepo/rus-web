import { NextResponse } from "next/server";
import { getMyAffiliateCode, getReferralCode } from "@/lib/affiliate";
import { siteUrl } from "@/lib/checkout";
import { getProduct } from "@/lib/marketplace";
import { referralLink } from "@/lib/referral";
import { productPath } from "@/lib/site";

/**
 * The per-visitor parts of a product page: the app link carrying whatever affiliate code brought
 * them here, and this visitor's own share link when they are an approved affiliate.
 *
 * These live behind a request rather than in the page so the page itself can be cached and served
 * to a crawler, or to a shopper, without rendering it again for each one.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const [referral, affiliateCode, site] = await Promise.all([
    getReferralCode(),
    product.affiliateRate > 0 ? getMyAffiliateCode() : null,
    siteUrl(),
  ]);

  return NextResponse.json(
    {
      appLink: referral ? `${product.appLink}?ref=${encodeURIComponent(referral)}` : product.appLink,
      affiliateCode: affiliateCode ?? null,
      shareLink: affiliateCode ? referralLink(site, productPath(product.id), affiliateCode) : null,
    },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
