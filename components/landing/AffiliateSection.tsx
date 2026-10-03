"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "./gsap";

// Illustration only: a 10% commission on a ₦4,800 item. Each seller sets their own rate.
const EXAMPLE_PRICE = 4_800;
const EXAMPLE_RATE = 10;
const COMMISSION = (EXAMPLE_PRICE * EXAMPLE_RATE) / 100;

const steps = [
  { n: "01", title: "Apply and get your code", body: "Tell us where you’ll share. Once approved, you get a personal referral code." },
  { n: "02", title: "Share any product", body: "Every product that offers commission comes with a ready-made link. Post it on WhatsApp, Instagram, X or anywhere." },
  { n: "03", title: "Earn on every sale", body: "When someone buys through your link, you earn the seller’s commission, paid straight into your RUS wallet." },
];

// Buyers fanned out to the right of the affiliate's link; paths are cubic curves from the link node
const ORIGIN = { x: 112, y: 220 };
const buyers = [
  { x: 420, y: 62, initials: "AO" },
  { x: 462, y: 150, initials: "TK" },
  { x: 476, y: 240, initials: "FB" },
  { x: 452, y: 330, initials: "NE" },
  { x: 400, y: 404, initials: "IU" },
];
const pathFor = (v: { x: number; y: number }) =>
  `M${ORIGIN.x},${ORIGIN.y} C${ORIGIN.x + 140},${ORIGIN.y} ${v.x - 170},${v.y} ${v.x - 26},${v.y}`;

const naira = (n: number) => `₦${Math.round(n).toLocaleString("en-NG")}`;

export default function AffiliateSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from(".af-reveal", {
          y: 40,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".af-copy", start: "top 78%" },
        });

        // Draw the network in: the link appears, lines grow out to the buyers, then the earnings card
        gsap
          .timeline({ scrollTrigger: { trigger: ".af-stage", start: "top 75%" } })
          .from(".af-origin", { scale: 0, transformOrigin: "50% 50%", duration: 0.7, ease: "back.out(2)" })
          .from(".af-line", { strokeDashoffset: 400, autoAlpha: 0, duration: 1, stagger: 0.08, ease: "power2.out" }, "-=0.2")
          .from(".af-buyer", { scale: 0, transformOrigin: "50% 50%", duration: 0.6, stagger: 0.08, ease: "back.out(2.2)" }, "-=0.7")
          .from(".af-wallet", { y: 30, autoAlpha: 0, duration: 0.7, ease: "power3.out" }, "-=0.4");

        // A sale travels from the link to a buyer, the commission pops, and the earnings tick up
        const amount = document.querySelector<HTMLElement>(".af-amount");
        const sales = document.querySelector<HTMLElement>(".af-sales");
        const total = { value: 0, sales: 0 };
        const pulses = gsap.utils.toArray<SVGCircleElement>(".af-pulse");
        const rings = gsap.utils.toArray<SVGGElement>(".af-ring");
        const pops = gsap.utils.toArray<SVGGElement>(".af-pop");

        const loop = gsap.timeline({ repeat: -1, paused: true, delay: 0.4 });
        const order = [2, 0, 3, 1, 4, 2, 4, 0];
        order.forEach((bi, k) => {
          const at = k * 0.9;
          const path = `#af-path-${bi}`;
          loop
            .set(pulses[bi], { autoAlpha: 1 }, at)
            .to(pulses[bi], { motionPath: { path, align: path, alignOrigin: [0.5, 0.5] }, duration: 1.1, ease: "power1.inOut" }, at)
            .set(pulses[bi], { autoAlpha: 0 }, at + 1.1)
            // immediateRender: false, or every badge would show (and every ring jump) as soon as the timeline is built
            .fromTo(rings[bi], { rotate: 0 }, { rotate: 120, svgOrigin: `${buyers[bi].x} ${buyers[bi].y}`, duration: 0.6, ease: "power3.out", immediateRender: false }, at + 1.1)
            .fromTo(pops[bi], { y: 0, autoAlpha: 1 }, { y: -34, autoAlpha: 0, duration: 1.3, ease: "power2.out", immediateRender: false }, at + 1.1)
            .to(
              total,
              {
                value: `+=${COMMISSION}`,
                sales: "+=1",
                duration: 0.5,
                ease: "power2.out",
                onUpdate: () => {
                  if (amount) amount.textContent = naira(total.value);
                  if (sales) sales.textContent = String(Math.round(total.sales));
                },
              },
              at + 1.1,
            );
        });
        loop.set(total, { value: 0, sales: 0 }, order.length * 0.9 + 1.6);

        // Only animate while the section is on screen
        gsap.timeline({
          scrollTrigger: {
            trigger: ".af-stage",
            start: "top 80%",
            end: "bottom top",
            onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
          },
        });

        // Lines keep flowing toward the buyers
        gsap.to(".af-line", { strokeDashoffset: -40, duration: 1.6, ease: "none", repeat: -1 });
      });
    },
    { scope: root },
  );

  return (
    <section id="affiliate" ref={root} className="relative isolate overflow-hidden bg-rus-ink text-white py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(36rem_28rem_at_0%_20%,rgba(69,197,240,0.16),transparent_70%),radial-gradient(36rem_30rem_at_100%_90%,rgba(224,64,154,0.22),transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-10 items-center">
        <div className="af-copy">
          <p className="af-reveal text-xs font-extrabold tracking-[0.25em] text-rus-cyan mb-3">AFFILIATE MARKETING</p>
          <h2 className="af-reveal text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">
            Share products. <span className="text-rus-gradient">Earn on every sale.</span>
          </h2>
          <p className="af-reveal mt-6 text-lg text-white/65 leading-relaxed max-w-xl">
            Become a RUS affiliate and get paid for the sales you bring to Marketplace sellers. They set the commission, up to 50%
            of the price, and you earn it whenever someone buys through your link.
          </p>

          <ol className="mt-10 space-y-6">
            {steps.map((s) => (
              <li key={s.n} className="af-reveal flex gap-5">
                <span className="shrink-0 size-11 rounded-2xl bg-white/5 border border-white/10 grid place-items-center text-sm font-extrabold text-rus-cyan">
                  {s.n}
                </span>
                <span>
                  <span className="block text-lg font-bold">{s.title}</span>
                  <span className="block mt-1 text-white/60 leading-relaxed">{s.body}</span>
                </span>
              </li>
            ))}
          </ol>

          <div className="af-reveal mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <Link
              href="/marketplace/affiliate"
              className="group inline-flex w-fit items-center gap-3 px-6 py-3.5 rounded-2xl bg-white text-rus-ink font-bold hover:-translate-y-0.5"
            >
              Become an affiliate
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link href="/affiliate" className="inline-flex w-fit items-center gap-2 text-sm font-bold text-white/80 hover:text-white">
              How it works and how you’re paid →
            </Link>
          </div>
        </div>

        {/* Your link, buyers, and the commission each sale earns */}
        <div className="af-stage relative">
          <svg
            viewBox="0 0 540 470"
            className="w-full h-auto"
            role="img"
            aria-label="Your referral link bringing buyers to Marketplace products, each sale paying commission into your wallet"
          >
            <defs>
              <linearGradient id="af-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#e0409a" />
                <stop offset="0.55" stopColor="#4a5fb0" />
                <stop offset="1" stopColor="#45c5f0" />
              </linearGradient>
              <radialGradient id="af-glow">
                <stop offset="0" stopColor="#e0409a" stopOpacity="0.55" />
                <stop offset="1" stopColor="#e0409a" stopOpacity="0" />
              </radialGradient>
            </defs>

            {buyers.map((b, i) => (
              <path
                key={i}
                id={`af-path-${i}`}
                className="af-line"
                d={pathFor(b)}
                fill="none"
                stroke="url(#af-grad)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="6 14"
                opacity="0.7"
              />
            ))}

            <g className="af-origin">
              <circle cx={ORIGIN.x} cy={ORIGIN.y} r="70" fill="url(#af-glow)" />
              <circle cx={ORIGIN.x} cy={ORIGIN.y} r="34" fill="#14163a" stroke="url(#af-grad)" strokeWidth="3" />
              <path
                d={`M${ORIGIN.x - 9},${ORIGIN.y + 5} l-3,3 a7,7 0 0 1 -10,-10 l6,-6 a7,7 0 0 1 10,0 M${ORIGIN.x + 9},${ORIGIN.y - 5} l3,-3 a7,7 0 0 1 10,10 l-6,6 a7,7 0 0 1 -10,0 M${ORIGIN.x - 6},${ORIGIN.y + 6} l12,-12`}
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                transform="translate(5 -1)"
              />
              <g transform={`translate(${ORIGIN.x - 92} ${ORIGIN.y + 50})`}>
                <rect width="184" height="30" rx="15" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" />
                <text x="92" y="20" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="11.5" fontWeight="600">
                  renturstatus.com/…?ref=
                  <tspan fill="#45c5f0">YOU</tspan>
                </text>
              </g>
            </g>

            {buyers.map((b, i) => (
              <g key={i} className="af-buyer">
                <g className="af-ring">
                  <circle cx={b.x} cy={b.y} r="27" fill="none" stroke="url(#af-grad)" strokeWidth="3" strokeDasharray="30 12.4" strokeLinecap="round" />
                </g>
                <circle cx={b.x} cy={b.y} r="21" fill="#1c1f4a" />
                <text x={b.x} y={b.y + 5} textAnchor="middle" fill="white" fontSize="13" fontWeight="700">
                  {b.initials}
                </text>
                <g className="af-pop" opacity="0">
                  <rect x={b.x - 32} y={b.y - 62} width="64" height="24" rx="12" fill="#10b981" />
                  <text x={b.x} y={b.y - 45} textAnchor="middle" fill="white" fontSize="12" fontWeight="800">
                    +{naira(COMMISSION)}
                  </text>
                </g>
              </g>
            ))}

            {buyers.map((_, i) => (
              <circle key={i} className="af-pulse" r="6" fill="white" opacity="0" style={{ filter: "drop-shadow(0 0 6px #45c5f0)" }} />
            ))}
          </svg>

          <div className="af-wallet absolute left-0 bottom-0 sm:bottom-2 w-[240px] rounded-2xl border border-white/10 bg-white/[0.07] backdrop-blur-xl p-4 shadow-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">Affiliate earnings</p>
            <p className="af-amount mt-1 text-3xl font-extrabold tabular-nums">{naira(COMMISSION * 3)}</p>
            <p className="mt-1 text-xs text-white/55">
              from <span className="af-sales tabular-nums">3</span> sales through your link
            </p>
            <p className="mt-2 text-[10px] text-white/35">Example: {EXAMPLE_RATE}% on a {naira(EXAMPLE_PRICE)} item</p>
          </div>
        </div>
      </div>
    </section>
  );
}
