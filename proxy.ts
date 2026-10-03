import { NextResponse, type NextRequest } from "next/server";
import { normalizeCode, REF_COOKIE, REF_MAX_AGE, VISITOR_COOKIE } from "@/lib/referral";

const API_URL = process.env.API_URL || "https://api.renturstatus.com/api";

/**
 * Captures affiliate links. A visit with ?ref=CODE is counted as a click, the code is remembered for
 * 7 days (the last affiliate link clicked wins), and the visitor lands on the same page without the
 * parameter, so a refresh or a shared copy of the URL doesn't count again.
 *
 * Checkout sends the remembered code to the API, which decides whether the sale earns commission,
 * so a forged cookie can do no more than a forged link.
 */
export async function proxy(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("ref");
  if (raw === null) return NextResponse.next();

  const clean = request.nextUrl.clone();
  clean.searchParams.delete("ref");
  const response = NextResponse.redirect(clean, 307);

  const code = normalizeCode(raw);
  if (!code) return response;

  const secure = process.env.NODE_ENV === "production";
  let visitor = request.cookies.get(VISITOR_COOKIE)?.value;
  if (!visitor) {
    visitor = crypto.randomUUID();
    response.cookies.set(VISITOR_COOKIE, visitor, { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 365 });
  }

  const productId = request.nextUrl.pathname.match(/^\/marketplace\/product\/([^/]+)/)?.[1];
  let valid = true;
  try {
    const res = await fetch(`${API_URL}/affiliate/click`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ code, visitorId: visitor, ...(productId && { productId: decodeURIComponent(productId) }) }),
      cache: "no-store",
      signal: AbortSignal.timeout(2500),
    });
    const body = await res.json().catch(() => null);
    if (res.ok && body?.data?.valid === false) valid = false;
  } catch {
    // The API is slow or down: remember the code anyway, since checkout checks it again
  }

  if (valid) {
    response.cookies.set(REF_COOKIE, code, { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: REF_MAX_AGE });
  }
  return response;
}

export const config = {
  // Only requests that carry ?ref= reach the proxy, and only pages (never static files or Next internals),
  // so ordinary page views cost nothing extra
  matcher: [
    {
      source: "/((?!_next/|api/|favicon.ico|.*\\.(?:png|jpe?g|webp|gif|svg|ico|css|js|txt|xml|woff2?)$).*)",
      has: [{ type: "query", key: "ref" }],
    },
  ],
};
