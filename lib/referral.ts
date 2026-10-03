// Affiliate referral codes, shared by the proxy (which captures them) and the server (which uses them at checkout).

/** The affiliate whose link the buyer last came through. Last click wins, for 7 days. */
export const REF_COOKIE = "rus_ref";
export const REF_MAX_AGE = 60 * 60 * 24 * 7;

/** An anonymous per-browser id, so the API can count a click once per visitor rather than once per page load. */
export const VISITOR_COOKIE = "rus_vid";

/** Referral codes as people type them: trimmed, upper case, and only the characters codes use. */
export function normalizeCode(code: unknown): string | null {
  const value = String(code ?? "").trim().toUpperCase();
  return /^[A-Z0-9]{4,16}$/.test(value) ? value : null;
}

/** A marketplace link that credits this affiliate. */
export function referralLink(siteUrl: string, path: string, code: string): string {
  const url = new URL(path, siteUrl);
  url.searchParams.set("ref", code);
  return url.toString();
}
