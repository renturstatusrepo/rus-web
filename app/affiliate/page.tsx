import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAffiliateSettings } from "@/lib/affiliate";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "Affiliate programme: how it works and how you’re paid | RUS",
  description:
    "Share RUS Marketplace products with your own link and earn a commission on every sale. How commission is worked out, when it’s paid and how to withdraw it.",
};

// Settings change rarely; refresh this page's numbers every 5 minutes
export const revalidate = 300;

const section = "rounded-3xl border border-slate-200 bg-white p-6 sm:p-10";
const eyebrow = "text-xs font-extrabold uppercase tracking-[0.2em]";

export default async function AffiliateInfoPage() {
  const { holdDays, minRate, maxRate } = await getAffiliateSettings();

  const steps = [
    { title: "Apply", body: "Tell us where you’ll share links, such as your WhatsApp status, groups, Instagram or X. It’s free." },
    { title: "Get your code", body: "Once our team approves you, you get a personal referral code and an affiliate dashboard." },
    { title: "Share products", body: "Every product that offers commission shows what you’ll earn and a ready-made link. You can also link to stores, categories or the whole Marketplace." },
    { title: "Earn on sales", body: "When someone buys through your link, the commission is yours, paid into your RUS wallet." },
  ];

  const timeline = [
    {
      label: "Order placed",
      status: "Awaiting delivery",
      tone: "bg-amber-100 text-amber-800",
      body: "Your commission is recorded the moment a buyer pays, and held with the seller’s payment in escrow.",
    },
    {
      label: "Buyer confirms delivery",
      status: "Earned",
      tone: "bg-sky-100 text-sky-800",
      body: `The commission is now yours. It’s held for ${holdDays} days, which gives time to sort out any dispute or fraud.`,
    },
    {
      label: `${holdDays} days later`,
      status: "Paid",
      tone: "bg-emerald-100 text-emerald-800",
      body: "It’s paid into your RUS wallet automatically. Spend it on the Marketplace or withdraw it to your bank in the RUS app.",
    },
  ];

  const faqs = [
    { q: "Does it cost anything to join?", a: "No. Applying and being an affiliate is free, and the commission comes out of the seller’s share, never from you." },
    { q: "Do buyers pay more when they use my link?", a: "No. Buyers pay exactly the same price. The seller shares part of what they receive with you." },
    {
      q: "How long does my link count for?",
      a: "7 days from the last affiliate link the buyer clicked. If they click someone else’s link after yours, the newer link gets the sale.",
    },
    {
      q: "What if the buyer adds other things to their cart?",
      a: "You earn on every item in their order that offers commission, at each seller’s own rate, not just the product you shared.",
    },
    {
      q: "What doesn’t earn commission?",
      a: "Cancelled or refunded orders, your own purchases, products you sell yourself, and delivery fees. Commission on orders that turn out to be fraudulent can be voided.",
    },
    { q: "Where can I see my earnings?", a: "In your affiliate dashboard: clicks, sales, and every commission with its status and the date it will be paid." },
    { q: "How do I get the money out?", a: "Commission is paid into your RUS wallet. From there you can withdraw to your bank account in the RUS app, like any other wallet balance." },
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative isolate overflow-hidden bg-rus-ink text-white">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(40rem_28rem_at_0%_0%,rgba(224,64,154,0.3),transparent_70%),radial-gradient(40rem_30rem_at_100%_100%,rgba(69,197,240,0.22),transparent_70%)]" />
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
            <p className={`${eyebrow} text-rus-cyan`}>RUS affiliate programme</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              Share products. <span className="text-rus-gradient">Earn on every sale.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              Recommend RUS Marketplace products to the people who trust you. When they buy through your link, you earn the seller’s
              commission, from {minRate}% up to {maxRate}% of the price.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/marketplace/affiliate" className="rounded-2xl bg-white px-6 py-3.5 text-center font-bold text-rus-ink hover:bg-white/90">
                Become an affiliate
              </Link>
              <Link
                href="/marketplace"
                className="rounded-2xl border border-white/20 px-6 py-3.5 text-center font-bold text-white hover:bg-white/10"
              >
                Browse products
              </Link>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-5xl space-y-8 px-4 py-12 sm:px-6 sm:py-16">
          {/* How it works */}
          <section className={section}>
            <p className={`${eyebrow} text-rus-pink`}>How it works</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">Four steps from sharing to getting paid</h2>
            <ol className="mt-8 grid gap-5 sm:grid-cols-2">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-4 rounded-2xl bg-slate-50 p-5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rus-pink to-rus-indigo font-extrabold text-white">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-extrabold text-slate-900">{s.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-slate-600">{s.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </section>

          {/* Earnings */}
          <section className={section}>
            <p className={`${eyebrow} text-rus-indigo`}>What you earn</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">Sellers set the commission</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-slate-600">
              Each seller chooses what they offer on each product, from {minRate}% to {maxRate}%. Your commission is that percentage of
              the item’s price after any discount. Delivery fees don’t count, and buyers never pay extra.
            </p>
            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-bold">Example sale</th>
                    <th className="px-4 py-3 font-bold">Commission</th>
                    <th className="px-4 py-3 text-right font-bold">You earn</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {[
                    { item: "Sneakers", price: 15_000, rate: 10 },
                    { item: "Phone case", price: 4_000, rate: 20 },
                    { item: "Wristwatch with a ₦2,000 coupon", price: 25_000, discount: 2_000, rate: 5 },
                  ].map((row) => {
                    const base = row.price - (row.discount ?? 0);
                    return (
                      <tr key={row.item}>
                        <td className="px-4 py-3">
                          {row.item} · {formatPrice(row.price)}
                        </td>
                        <td className="px-4 py-3">
                          {row.rate}% of {formatPrice(base)}
                        </td>
                        <td className="px-4 py-3 text-right font-extrabold text-slate-900">{formatPrice((base * row.rate) / 100)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <ul className="mt-6 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
              <li className="rounded-xl bg-slate-50 p-4">
                <b className="text-slate-900">Every eligible item counts.</b> If the buyer adds more to their cart, you earn on each item that offers
                commission.
              </li>
              <li className="rounded-xl bg-slate-50 p-4">
                <b className="text-slate-900">Your link lasts 7 days.</b> The most recent affiliate link a buyer clicked gets the sale.
              </li>
            </ul>
          </section>

          {/* Payments */}
          <section className={section}>
            <p className={`${eyebrow} text-emerald-600`}>Payments</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">When and how you’re paid</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-slate-600">
              Commission follows the order. You can track each one in your dashboard as it moves through these stages.
            </p>
            <ol className="relative mt-8 space-y-6 border-l-2 border-slate-200 pl-6">
              {timeline.map((t) => (
                <li key={t.label} className="relative">
                  <span className="absolute -left-[33px] top-1 size-4 rounded-full border-4 border-white bg-gradient-to-br from-rus-pink to-rus-cyan shadow" />
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-extrabold text-slate-900">{t.label}</h3>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${t.tone}`}>{t.status}</span>
                  </div>
                  <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-600">{t.body}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
              <b>When commission isn’t paid:</b> if an order is cancelled or refunded before the buyer confirms delivery, there’s nothing to pay
              on it. Commission found to come from fraud or self-referral can be voided during the {holdDays}-day hold, and the amount goes back
              to the seller.
            </div>
          </section>

          {/* Sellers */}
          <section className={section}>
            <p className={`${eyebrow} text-rus-pink`}>For sellers</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">Let affiliates sell for you</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-slate-600">
              Add a commission to any product from your seller dashboard. Affiliates will share it, and you only pay when a sale they brought
              in is delivered and confirmed. The commission comes out of your share of that sale; the RUS platform fee doesn’t change.
            </p>
            <Link href="/marketplace/sell" className="mt-6 inline-block font-bold text-rus-indigo hover:underline">
              Go to your seller dashboard →
            </Link>
          </section>

          {/* FAQ */}
          <section className={section}>
            <p className={`${eyebrow} text-slate-500`}>Questions</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">Frequently asked</h2>
            <div className="mt-6 divide-y divide-slate-100">
              {faqs.map((f) => (
                <details key={f.q} className="group py-4">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-slate-900">
                    {f.q}
                    <span className="text-slate-400 transition-transform group-open:rotate-45" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-3xl bg-rus-ink p-8 text-center text-white sm:p-12">
            <h2 className="text-3xl font-extrabold tracking-tight">Ready to start earning?</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/65">Apply in a minute. We’ll let you know as soon as you’re approved.</p>
            <Link
              href="/marketplace/affiliate"
              className="mt-7 inline-block rounded-2xl bg-white px-7 py-3.5 font-bold text-rus-ink hover:bg-white/90"
            >
              Become an affiliate
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
