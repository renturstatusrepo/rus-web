"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CopyLink from "@/components/marketplace/CopyLink";
import { formatPrice } from "@/lib/format";

type Personal = { appLink: string; affiliateCode: string | null; shareLink: string | null };

/**
 * The parts of a product page that depend on who is looking: the "open in the app" link (phones
 * only, carrying any affiliate code the visitor arrived with) and the affiliate's own share link.
 *
 * Reading the user agent and the session cookies on the server made the whole page render fresh for
 * every request, so none of it could be cached — the opposite of what a page we want search engines
 * to index and shoppers to load quickly needs. Everything a crawler cares about is in the static
 * HTML; these two extras arrive afterwards.
 */
export default function ProductPersonal({
  productId,
  price,
  affiliateRate,
  offersCommission,
}: {
  productId: string;
  price: number;
  affiliateRate: number;
  offersCommission: boolean;
}) {
  const [personal, setPersonal] = useState<Personal | null>(null);
  const [onPhone, setOnPhone] = useState(false);

  useEffect(() => {
    let active = true;
    fetch(`/marketplace/product/${encodeURIComponent(productId)}/personal`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: Personal | null) => {
        if (!active || !data) return;
        // The app link is only useful on a phone that could have the app installed
        setOnPhone(/android|iphone|ipad|ipod/i.test(navigator.userAgent));
        setPersonal(data);
      })
      .catch(() => {
        // Without this the page simply shows no app link and no share box, which is the right default
      });
    return () => {
      active = false;
    };
  }, [productId]);

  return (
    <>
      {onPhone && personal?.appLink && (
        <a href={personal.appLink} className="block text-center text-sm font-semibold text-purple-700 hover:underline">
          Have the RUS app? Open this product there
        </a>
      )}

      {offersCommission && (
        <div className="rounded-2xl border border-purple-200 bg-purple-50/70 p-4">
          {personal?.affiliateCode && personal.shareLink ? (
            <>
              <p className="font-extrabold text-purple-900">
                Earn {formatPrice((price * affiliateRate) / 100)} per sale
                <span className="ml-1 text-sm font-semibold text-purple-700">({affiliateRate}%)</span>
              </p>
              <p className="mb-3 mt-0.5 text-sm text-purple-900/70">
                Share your link. You also earn on anything else they buy that offers commission.
              </p>
              <CopyLink value={personal.shareLink} />
            </>
          ) : (
            <p className="text-sm text-purple-900">
              <span className="font-bold">Affiliates earn {affiliateRate}%</span> sharing this product.{" "}
              <Link href="/marketplace/affiliate" className="font-bold text-purple-700 underline-offset-2 hover:underline">
                Become an affiliate →
              </Link>
            </p>
          )}
        </div>
      )}
    </>
  );
}
