import { NextResponse } from "next/server";
import { getToken } from "@/lib/account";
import { readCart } from "@/lib/cart";

/**
 * Whether this visitor is signed in, and what's in their cart.
 *
 * The nav used to read these cookies directly, and because it lives in the marketplace layout that
 * made every page under it — including every product page — render fresh for each request. Pages a
 * search engine should be able to cache can't depend on who is asking, so the nav asks here instead,
 * after the page has already been delivered.
 */
export async function GET() {
  const [token, cart] = await Promise.all([getToken(), readCart()]);

  return NextResponse.json(
    {
      signedIn: Boolean(token),
      cartCount: cart.reduce((sum, line) => sum + line.quantity, 0),
    },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
