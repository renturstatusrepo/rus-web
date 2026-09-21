import Link from "next/link";
import { getToken } from "@/lib/account";
import { readCart } from "@/lib/cart";

export default async function MarketplaceNav() {
  const [token, cart] = await Promise.all([getToken(), readCart()]);
  const count = cart.reduce((sum, line) => sum + line.quantity, 0);
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
          {token ? (
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
            <span className="min-w-5 rounded-full bg-white px-1.5 text-center text-xs font-extrabold text-purple-700">{count}</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
