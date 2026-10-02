"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "./gsap";

const pillars = [
  {
    tag: "For creators & users",
    title: "Status Monetization",
    icon: "📲",
    accent: "from-rus-pink to-[#a368d0]",
    glow: "bg-rus-pink/30",
    points: ["Pick brand campaigns & post to status", "Submit view proof & earn cash per view", "Withdraw directly to your bank account"],
    foot: ["⚡ Spin & Win bonus", "💸 Instant payouts"],
  },
  {
    tag: "Live on web & app",
    title: "Shop & Sell Online",
    icon: "🛍️",
    accent: "from-[#a368d0] to-rus-indigo",
    glow: "bg-rus-indigo/35",
    points: ["Explore verified merchant stores & products", "Buy event tickets & claim merchant coupons", "Open your own store & manage sales easily"],
    foot: ["🎟️ Event tickets", "🏪 Merchant stores"],
    href: "/marketplace",
  },
  {
    tag: "For brands & merchants",
    title: "Speed Marketing",
    icon: "📢",
    accent: "from-rus-indigo to-rus-cyan",
    glow: "bg-rus-cyan/30",
    points: ["Post ads on thousands of real status feeds", "Pay strictly for verified real-human views", "Drive instant sales & event bookings"],
    foot: ["📈 High ROI ads", "🎯 Real human views"],
  },
];

export default function Pillars() {
  const root = useRef<HTMLElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from(".pl-heading > *", {
          y: 40,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".pl-heading", start: "top 80%" },
        });
        gsap.from(".pl-card", {
          y: 100,
          autoAlpha: 0,
          rotateX: -12,
          transformOrigin: "50% 100%",
          stagger: 0.15,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: ".pl-grid", start: "top 80%" },
        });
      });
    },
    { scope: root },
  );

  // Cards tilt toward the pointer and a glow follows it
  const onMove = contextSafe((e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    gsap.to(card, { rotateY: (px - 0.5) * 12, rotateX: (0.5 - py) * 10, transformPerspective: 900, duration: 0.5, ease: "power2.out" });
    gsap.to(card.querySelector(".pl-glow"), { left: `${px * 100}%`, top: `${py * 100}%`, autoAlpha: 1, duration: 0.4 });
  });
  const onLeave = contextSafe((e: React.PointerEvent<HTMLElement>) => {
    const card = e.currentTarget;
    gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });
    gsap.to(card.querySelector(".pl-glow"), { autoAlpha: 0, duration: 0.4 });
  });

  return (
    <section id="features" ref={root} className="relative bg-slate-50 py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="pl-heading text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-extrabold tracking-[0.25em] text-rus-indigo mb-3">ONE PLATFORM, THREE WAYS IN</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-slate-900">
            Earn, shop and <span className="text-rus-gradient">advertise</span> in one app.
          </h2>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed">
            RUS connects daily status creators, shoppers and verified merchant brands, all in one place.
          </p>
        </div>

        <div className="pl-grid grid md:grid-cols-3 gap-6 [perspective:1200px]">
          {pillars.map((p) => {
            const cardProps = {
              onPointerMove: onMove,
              onPointerLeave: onLeave,
              className:
                "pl-card group relative block overflow-hidden rounded-[28px] bg-white border border-slate-200/80 p-8 shadow-xl shadow-slate-900/5 [transform-style:preserve-3d]",
            };
            const body = (
              <>
                <span
                  className={`pl-glow pointer-events-none invisible absolute size-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${p.glow}`}
                />
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${p.accent}`} />
                <div className="relative">
                  <div className="flex items-center justify-between mb-8">
                    <span className={`size-14 rounded-2xl bg-gradient-to-br ${p.accent} grid place-items-center text-2xl shadow-lg`}>
                      {p.icon}
                    </span>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                      {p.tag}
                    </span>
                  </div>
                  <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-5">{p.title}</h3>
                  <ul className="space-y-3 text-[15px] font-medium text-slate-700 mb-8">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-3">
                        <span className={`mt-1 size-4 shrink-0 rounded-full bg-gradient-to-br ${p.accent}`} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600">
                    {p.foot.map((f) => (
                      <span key={f}>{f}</span>
                    ))}
                  </div>
                  {p.href && (
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-rus-indigo">
                      Visit the Marketplace <span className="transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  )}
                </div>
              </>
            );
            return p.href ? (
              <Link key={p.title} href={p.href} {...cardProps}>
                {body}
              </Link>
            ) : (
              <div key={p.title} {...cardProps}>
                {body}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
