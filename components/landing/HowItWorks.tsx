"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "./gsap";

const steps = [
  {
    n: "01",
    title: "Pick a brand campaign",
    body: "Browse verified campaigns from real brands every day and choose the ones that fit your audience.",
    image: "/campaign.jpeg",
    alt: "RUS campaigns screen",
  },
  {
    n: "02",
    title: "Post it & prove the views",
    body: "Share the campaign to your status, then submit your view proof right in the app. No guesswork.",
    image: "/dashboard.jpeg",
    alt: "RUS dashboard screen",
  },
  {
    n: "03",
    title: "Cash out to your bank",
    body: "Earnings land in your RUS wallet. Withdraw straight to your local bank account whenever you like.",
    image: "/wallet.jpeg",
    alt: "RUS wallet screen",
  },
];

function Phone({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative w-[280px] h-[580px] rounded-[46px] bg-rus-ink p-3 border-4 border-slate-800 shadow-[0_40px_120px_-20px_rgba(74,95,176,0.55)] ${className}`}
    >
      <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-5 rounded-full bg-black z-20" />
      <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-slate-950">{children}</div>
    </div>
  );
}

export default function HowItWorks() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: pin the section and scrub through the three steps while the phone screen changes.
      // Reduced motion keeps the crossfades (the steps share one spot) but drops the movement.
      mm.add({ desktop: "(min-width: 1024px)", reduce: "(prefers-reduced-motion: reduce)" }, (ctx) => {
        if (!ctx.conditions?.desktop) return;
        const m = ctx.conditions.reduce ? 0 : 1;
        const texts = gsap.utils.toArray<HTMLElement>(".hiw-step");
        const screens = gsap.utils.toArray<HTMLElement>(".hiw-screen");
        const dots = gsap.utils.toArray<HTMLElement>(".hiw-dot");

        gsap.set(texts.slice(1), { autoAlpha: 0, y: 60 * m });
        gsap.set(screens.slice(1), { autoAlpha: 0, scale: 1 + 0.08 * m });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: ".hiw-pin",
            start: "top top",
            end: "+=220%",
            pin: true,
            scrub: 0.8,
            snap: { snapTo: "labelsDirectional", duration: { min: 0.2, max: 0.6 }, ease: "power1.inOut" },
          },
        });

        tl.addLabel("s0").to(".hiw-progress", { scaleY: 1 / 3, ease: "none", duration: 0.5 }, 0);
        for (let i = 1; i < steps.length; i++) {
          const at = `s${i - 1}+=0.5`;
          tl.to(texts[i - 1], { autoAlpha: 0, y: -60 * m, duration: 0.5 }, at)
            .to(texts[i], { autoAlpha: 1, y: 0, duration: 0.5 }, `${at}+=0.15`)
            .to(screens[i - 1], { autoAlpha: 0, scale: 1 - 0.06 * m, duration: 0.6 }, at)
            .to(screens[i], { autoAlpha: 1, scale: 1, duration: 0.6 }, at)
            .to(".hiw-phone", { rotateY: (i % 2 ? -14 : 14) * m, rotateX: 4 * m, duration: 0.6 }, at)
            .to(dots[i], { backgroundColor: "#e0409a", scale: 1.25, duration: 0.3 }, at)
            .to(".hiw-progress", { scaleY: (i + 1) / 3, ease: "none", duration: 0.65 }, at)
            .addLabel(`s${i}`);
        }
        tl.to(".hiw-phone", { rotateY: 0, rotateX: 0, duration: 0.4 });
      });

      // Mobile / tablet: simple reveal per step
      mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
        gsap.utils.toArray<HTMLElement>(".hiw-card").forEach((card) => {
          gsap.from(card, {
            y: 60,
            autoAlpha: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
          });
        });
      });

      mm.add(MOTION_OK, () => {
        gsap.from(".hiw-heading > *", {
          y: 40,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".hiw-heading", start: "top 80%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="how-it-works" ref={root} className="relative bg-white text-slate-900">
      <div className="hiw-pin relative lg:h-screen flex flex-col justify-center py-24 lg:py-0 overflow-hidden">
        <div className="pointer-events-none absolute -right-40 top-1/4 size-[520px] rounded-full bg-rus-cyan/15 blur-[120px]" />
        <div className="pointer-events-none absolute -left-40 bottom-0 size-[460px] rounded-full bg-rus-pink/10 blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full lg:pt-16 lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-x-14 lg:items-center">
          <div className="hiw-heading max-w-2xl mb-12 lg:mb-0 lg:col-start-2 lg:row-start-1 lg:self-end">
            <p className="text-xs font-extrabold tracking-[0.25em] text-rus-pink mb-3">HOW IT WORKS</p>
            <h2 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight leading-[1.05]">
              Three taps from <span className="text-rus-gradient">status to salary.</span>
            </h2>
          </div>

          {/* Desktop pinned story: these join the grid above, so the heading sits over the step copy */}
          <div className="hidden lg:contents">
            <div className="relative h-[260px] w-1.5 rounded-full bg-slate-100 lg:col-start-1 lg:row-start-2 lg:self-start lg:mt-10">
              <div className="hiw-progress absolute inset-0 origin-top scale-y-0 rounded-full bg-gradient-to-b from-rus-pink via-rus-indigo to-rus-cyan" />
              {steps.map((s, i) => (
                <span
                  key={s.n}
                  className={`hiw-dot absolute left-1/2 -translate-x-1/2 size-4 rounded-full border-4 border-white shadow ${i === 0 ? "bg-rus-pink scale-125" : "bg-slate-300"}`}
                  style={{ top: `calc(${(i / (steps.length - 1)) * 100}% - 8px)` }}
                />
              ))}
            </div>

            <div className="relative h-[340px] lg:col-start-2 lg:row-start-2">
              {steps.map((s) => (
                <div key={s.n} className="hiw-step absolute inset-0 flex flex-col justify-center">
                  <span className="text-[7rem] leading-none font-extrabold text-slate-100 -mb-10 select-none">{s.n}</span>
                  <h3 className="relative text-4xl font-extrabold tracking-tight mb-4">{s.title}</h3>
                  <p className="relative text-lg text-slate-600 max-w-md leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>

            <div className="[perspective:1200px] pr-8 lg:col-start-3 lg:row-start-1 lg:row-span-2">
              <Phone className="hiw-phone">
                {steps.map((s, i) => (
                  <Image
                    key={s.n}
                    src={s.image}
                    alt={s.alt}
                    fill
                    sizes="280px"
                    className="hiw-screen object-cover object-top"
                    priority={i === 0}
                  />
                ))}
              </Phone>
            </div>
          </div>

          {/* Mobile stacked steps */}
          <div className="lg:hidden grid gap-6 sm:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="hiw-card rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
                <div className="relative h-64 mb-6 rounded-2xl overflow-hidden bg-slate-950">
                  <Image src={s.image} alt={s.alt} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover object-top" />
                </div>
                <span className="text-sm font-extrabold text-rus-pink">{s.n}</span>
                <h3 className="text-2xl font-extrabold tracking-tight mt-1 mb-2">{s.title}</h3>
                <p className="text-slate-600 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
