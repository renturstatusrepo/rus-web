"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Session = { signedIn: boolean; cartCount: number };

/**
 * The marketplace nav.
 *
 * It is a client component on purpose. Reading the session and cart cookies on the server made this
 * component — and therefore the layout, and therefore every page beneath it, including every product
 * page — render fresh on every request, so nothing could be cached for a crawler or a first-time
 * visitor. The links render immediately from static HTML; who you are arrives a moment later.
 */
export default function MarketplaceNav() {
  const [session, setSession] = useState<Session | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    let active = true;
    fetch("/marketplace/session", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: Session | null) => {
        if (active && data) setSession(data);
      })
      .catch(() => {
        // A nav that can't confirm the session still navigates; it just shows the signed-out links
      });
    return () => {
      active = false;
    };
    // Signing in or out, or changing the cart, happens through a navigation
  }, [pathname]);

  const link = "rounded-lg px-2.5 py-2 font-semibold text-slate-600 hover:bg-slate-100 hover:text-purple-700 sm:px-3";

  return (
    <div className="border-b border-slate-200 bg-white">
      <nav aria-label="Marketplace" className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-2 text-sm sm:px-8">
        <Link href="/marketplace" className="font-extrabold text-purple-700">
          Marketplace
        </Link>
        <div className="flex items-center gap-0.5 sm:gap-1">
          <Link href="/marketplace/sell" className={link}>
            Sell
          </Link>
          <Link href="/marketplace/affiliate" className={link}>
            Earn
          </Link>
          {session?.signedIn ? (
            <Link href="/marketplace/account" className={link}>
              Account
            </Link>
          ) : (
            <>
              <Link href="/marketplace/login" className={link}>
                Log in
              </Link>
              <Link href="/marketplace/signup" className={`${link} hidden sm:block`}>
                Sign up
              </Link>
            </>
          )}
          <Link
            href="/marketplace/cart"
            className="ml-1 flex items-center gap-2 rounded-lg bg-purple-700 px-3 py-2 font-bold text-white hover:bg-purple-800"
          >
            Cart
            <span className="min-w-5 rounded-full bg-white px-1.5 text-center text-xs font-extrabold text-purple-700">
              {session ? session.cartCount : ""}
            </span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
