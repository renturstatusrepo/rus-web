import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AffiliateApplyForm from "@/components/marketplace/AffiliateApplyForm";
import AffiliateLinkBuilder from "@/components/marketplace/AffiliateLinkBuilder";
import CopyLink from "@/components/marketplace/CopyLink";
import { getAffiliateSettings, getMyAffiliate, getMyCommissions, type Commission, type CommissionStatus } from "@/lib/affiliate";
import { siteUrl } from "@/lib/checkout";
import { formatPrice } from "@/lib/format";
import { referralLink } from "@/lib/referral";

export const metadata: Metadata = {
  title: "Affiliate programme",
  description: "Share RUS Marketplace products and earn a commission on every sale your link brings in.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const card = "rounded-2xl border border-slate-200 bg-white p-5 sm:p-6";

const commissionBadge: Record<CommissionStatus, { label: string; className: string }> = {
  pending: { label: "Awaiting delivery", className: "bg-amber-100 text-amber-800" },
  holding: { label: "Earned", className: "bg-sky-100 text-sky-800" },
  released: { label: "Paid", className: "bg-emerald-100 text-emerald-800" },
  void: { label: "Void", className: "bg-slate-100 text-slate-500" },
};

const date = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" }) : "";

function HowItWorks({ minRate, maxRate, holdDays }: { minRate: number; maxRate: number; holdDays: number }) {
  const steps = [
    { title: "Apply", body: "Tell us where you’ll share. Once approved you get a personal referral code." },
    { title: "Share products", body: `Sellers choose what they offer, from ${minRate}% to ${maxRate}% of the price. Share any product with your link.` },
    {
      title: "Get paid",
      body: `When someone buys within 7 days of clicking your link, you earn on every item in their order that offers commission. It’s paid to your wallet ${holdDays} days after they confirm delivery.`,
    },
  ];
  return (
    <ol className="grid gap-4 sm:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s.title} className={card}>
          <span className="flex size-9 items-center justify-center rounded-full bg-purple-100 text-sm font-extrabold text-purple-700">{i + 1}</span>
          <h3 className="mt-3 font-extrabold text-slate-900">{s.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

function CommissionRow({ c }: { c: Commission }) {
  const badge = commissionBadge[c.status];
  const note =
    c.status === "pending"
      ? "Earned once the buyer confirms delivery"
      : c.status === "holding"
        ? `Paid to your wallet on ${date(c.holdUntil)}`
        : c.status === "released"
          ? `Paid on ${date(c.releasedAt)}`
          : c.voidReason || "Not earned";
  return (
    <li className="flex items-center gap-4 py-4">
      <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-slate-100">
        {c.product?.image && <Image src={c.product.image} alt="" fill sizes="56px" className="object-cover" />}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-bold text-slate-900">{c.product?.title ?? "A product"}</p>
        <p className="text-xs text-slate-500">
          {c.rate}% of {formatPrice(c.base)} · {date(c.createdAt)} · #{c.orderRef.slice(0, 12)}
        </p>
        <p className="mt-0.5 text-xs text-slate-600">{note}</p>
      </div>
      <div className="text-right">
        <p className={`font-extrabold ${c.status === "void" ? "text-slate-400 line-through" : "text-slate-900"}`}>{formatPrice(c.amount)}</p>
        <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-bold ${badge.className}`}>{badge.label}</span>
      </div>
    </li>
  );
}

export default async function AffiliatePage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const [mine, site] = await Promise.all([getMyAffiliate(), siteUrl()]);
  const settings = mine?.settings ?? (await getAffiliateSettings());
  const affiliate = mine?.affiliate ?? null;

  const header = (
    <div className="mb-8">
      <p className="text-xs font-extrabold uppercase tracking-widest text-purple-700">RUS Affiliates</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Share products. Earn on every sale.</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Get a personal link, share Marketplace products with the people who trust you, and earn up to {settings.maxRate}% when
        they buy.
      </p>
    </div>
  );

  // Signed out: explain, then send them to log in
  if (!mine) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8 sm:py-12">
        {header}
        <HowItWorks {...settings} />
        <div className={`${card} mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between`}>
          <p className="font-semibold text-slate-700">Log in or create a free account to apply.</p>
          <div className="flex gap-3">
            <Link href="/marketplace/login?next=/marketplace/affiliate" className="rounded-xl bg-purple-700 px-5 py-3 text-sm font-bold text-white hover:bg-purple-800">
              Log in
            </Link>
            <Link href="/marketplace/signup?next=/marketplace/affiliate" className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:border-purple-400">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Approved: the dashboard
  if (affiliate?.status === "approved" && affiliate.code) {
    const [commissions] = await Promise.all([getMyCommissions()]);
    const stats = mine.stats ?? { clicks: 0, sales: 0, pending: 0, holding: 0, released: 0 };
    const tiles = [
      { label: "Link clicks", value: stats.clicks.toLocaleString("en-NG") },
      { label: "Sales", value: stats.sales.toLocaleString("en-NG") },
      { label: "Awaiting delivery", value: formatPrice(stats.pending) },
      { label: "Earned, paying soon", value: formatPrice(stats.holding) },
      { label: "Paid to wallet", value: formatPrice(stats.released) },
    ];
    return (
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8 sm:py-12">
        <div className="mb-8">
          <p className="text-xs font-extrabold uppercase tracking-widest text-purple-700">RUS Affiliates</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">Your affiliate dashboard</h1>
        </div>

        <section className={`${card} space-y-5`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-500">Your code</h2>
              <p className="mt-1 font-mono text-2xl font-extrabold tracking-wider text-slate-900">{affiliate.code}</p>
            </div>
            <p className="max-w-sm text-sm text-slate-600">
              Every product page shows what you’ll earn and a ready-made link when you’re logged in.
            </p>
          </div>
          <div>
            <p className="mb-1.5 text-sm font-semibold text-slate-700">Link to the whole Marketplace</p>
            <CopyLink value={referralLink(site, "/marketplace", affiliate.code)} />
          </div>
          <AffiliateLinkBuilder siteUrl={site} code={affiliate.code} />
        </section>

        <section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {tiles.map((t) => (
            <div key={t.label} className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-semibold text-slate-500">{t.label}</p>
              <p className="mt-1 text-xl font-extrabold text-slate-900">{t.value}</p>
            </div>
          ))}
        </section>

        <section className={`${card} mt-6`}>
          <h2 className="text-lg font-extrabold text-slate-900">Commissions</h2>
          {commissions.length ? (
            <ul className="divide-y divide-slate-100">
              {commissions.map((c) => (
                <CommissionRow key={c.id} c={c} />
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-slate-600">
              No sales yet. Share a product link: when someone buys through it, the commission shows up here.
            </p>
          )}
        </section>

        <p className="mt-6 text-xs text-slate-500">
          Commission is worked out on the item price after any discount, not on delivery. It’s paid {settings.holdDays} days after the
          buyer confirms delivery, and isn’t earned on cancelled orders, your own purchases or your own listings.
        </p>
      </div>
    );
  }

  // Everyone else: their application's state, or the form
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8 sm:py-12">
      {header}

      {affiliate?.status === "pending" && (
        <div className={`${card} mb-6 border-amber-200 bg-amber-50`}>
          <h2 className="font-extrabold text-amber-900">{sp.applied ? "Application sent!" : "Your application is under review"}</h2>
          <p className="mt-1 text-sm text-amber-900/80">
            We’ll notify you and email you when it’s approved. You can update your details below while you wait.
          </p>
        </div>
      )}
      {affiliate?.status === "rejected" && (
        <div className={`${card} mb-6 border-red-200 bg-red-50`}>
          <h2 className="font-extrabold text-red-900">Your last application wasn’t approved</h2>
          {affiliate.reviewNote && <p className="mt-1 text-sm text-red-900/80">Note from our team: {affiliate.reviewNote}</p>}
          <p className="mt-1 text-sm text-red-900/80">You can apply again with more detail.</p>
        </div>
      )}
      {affiliate?.status === "suspended" ? (
        <div className={`${card} border-slate-300`}>
          <h2 className="font-extrabold text-slate-900">Your affiliate account is suspended</h2>
          <p className="mt-1 text-sm text-slate-600">
            New sales through your links don’t earn commission. Commission you’d already earned isn’t affected. Contact{" "}
            <a href="mailto:support@renturstatus.com" className="font-semibold text-purple-700 hover:underline">
              support@renturstatus.com
            </a>{" "}
            if you think this is a mistake.
          </p>
        </div>
      ) : (
        <>
          {!affiliate && <HowItWorks {...settings} />}
          <section className={`${card} mt-6`}>
            <h2 className="mb-4 text-lg font-extrabold text-slate-900">
              {affiliate?.status === "pending" ? "Your application" : "Apply"}
            </h2>
            <AffiliateApplyForm
              channels={affiliate?.channels}
              audience={affiliate?.audience}
              mode={affiliate?.status === "pending" ? "update" : affiliate?.status === "rejected" ? "again" : "new"}
            />
          </section>
        </>
      )}
    </div>
  );
}
