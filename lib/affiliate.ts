// Server-only reads for the affiliate programme. Account data is fetched with the signed-in user's token;
// the referral cookie is read here so it never has to reach client code.
import "server-only";
import { cookies } from "next/headers";
import { callApi, getToken } from "@/lib/account";
import { assetUrl } from "@/lib/marketplace";
import { normalizeCode, REF_COOKIE } from "@/lib/referral";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Raw = any;

export type AffiliateSettings = { holdDays: number; minRate: number; maxRate: number };
const DEFAULT_SETTINGS: AffiliateSettings = { holdDays: 7, minRate: 1, maxRate: 50 };

export type AffiliateStatus = "pending" | "approved" | "rejected" | "suspended";

export type Affiliate = {
  status: AffiliateStatus;
  code: string | null;
  channels: string;
  audience: string;
  reviewNote: string | null;
  appliedAt: string;
};

export type AffiliateStats = { clicks: number; sales: number; pending: number; holding: number; released: number };

export type CommissionStatus = "pending" | "holding" | "released" | "void";

export type Commission = {
  id: string;
  orderRef: string;
  product: { id: string; title: string; image: string | null } | null;
  rate: number;
  base: number;
  amount: number;
  status: CommissionStatus;
  holdUntil: string | null;
  releasedAt: string | null;
  voidReason: string | null;
  createdAt: string;
};

/** The referral code this browser last arrived with, if any. */
export async function getReferralCode(): Promise<string | null> {
  return normalizeCode((await cookies()).get(REF_COOKIE)?.value);
}

const API_URL = process.env.API_URL || "https://api.renturstatus.com/api";

/** Public programme settings. Cached for 5 minutes: they change rarely, and pages that show them can stay static. */
export async function getAffiliateSettings(): Promise<AffiliateSettings> {
  try {
    const res = await fetch(`${API_URL}/affiliate/settings`, { next: { revalidate: 300 } });
    const s = res.ok ? (await res.json())?.data : null;
    return s ? { holdDays: Number(s.holdDays), minRate: Number(s.minRate), maxRate: Number(s.maxRate) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function toAffiliate(a: Raw): Affiliate | null {
  if (!a?.status) return null;
  return {
    status: a.status,
    code: a.code ?? null,
    channels: a.channels ?? "",
    audience: a.audience ?? "",
    reviewNote: a.review_note ?? null,
    appliedAt: a.created_at,
  };
}

/** The signed-in user's affiliate account, stats and the programme's settings. Null when signed out. */
export async function getMyAffiliate(): Promise<{ affiliate: Affiliate | null; stats: AffiliateStats | null; settings: AffiliateSettings } | null> {
  const token = await getToken();
  if (!token) return null;
  const res = await callApi("/affiliate/me", { token });
  if (res.status === 401) return null;
  const d = res.ok ? res.body?.data : null;
  const s = d?.stats;
  return {
    affiliate: toAffiliate(d?.affiliate),
    stats: s
      ? { clicks: Number(s.clicks || 0), sales: Number(s.sales || 0), pending: Number(s.pending || 0), holding: Number(s.holding || 0), released: Number(s.released || 0) }
      : null,
    settings: d?.settings
      ? { holdDays: Number(d.settings.holdDays), minRate: Number(d.settings.minRate), maxRate: Number(d.settings.maxRate) }
      : DEFAULT_SETTINGS,
  };
}

/** The approved affiliate's referral code, for showing "earn with this" on product pages. */
export async function getMyAffiliateCode(): Promise<string | null> {
  const mine = await getMyAffiliate();
  return mine?.affiliate?.status === "approved" ? mine.affiliate.code : null;
}

export async function getMyCommissions(limit = 50): Promise<Commission[]> {
  const token = await getToken();
  if (!token) return [];
  const res = await callApi(`/affiliate/commissions?limit=${limit}`, { token });
  const rows: Raw[] = res.ok && Array.isArray(res.body?.data) ? res.body.data : [];
  return rows.map((c) => {
    let image: string | null = null;
    try {
      const parsed = JSON.parse(c.product?.image ?? "null");
      image = assetUrl(Array.isArray(parsed) ? parsed[0] : parsed);
    } catch {
      image = assetUrl(c.product?.image);
    }
    return {
      id: String(c.id),
      orderRef: c.order_ref ?? "",
      product: c.product ? { id: c.product.id, title: c.product.title ?? "Product", image } : null,
      rate: Number(c.rate || 0),
      base: Number(c.base_amount || 0),
      amount: Number(c.amount || 0),
      status: c.status,
      holdUntil: c.hold_until ?? null,
      releasedAt: c.released_at ?? null,
      voidReason: c.void_reason ?? null,
      createdAt: c.created_at,
    };
  });
}
