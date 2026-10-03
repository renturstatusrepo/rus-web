"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "./gsap";
import StoreBadges from "./StoreBadges";

const comingToWeb = ["Brand analytics dashboard", "Instant sync with your app", "Bulk campaign scheduling"];

export default function FinalCTA() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          ".cta-panel",
          { scale: 0.88, borderRadius: 64 },
          {
            scale: 1,
            borderRadius: 40,
            ease: "none",
            scrollTrigger: { trigger: ".cta-panel", start: "top bottom", end: "top 35%", scrub: true },
          },
        );
        gsap.from(".cta-reveal", {
          y: 40,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cta-panel", start: "top 65%" },
        });
        gsap.to(".cta-logo", { rotate: 360, duration: 24, repeat: -1, ease: "none" });
      });
    },
    { scope: root },
  );

  return (
    <section id="download" ref={root} className="bg-white py-20 sm:py-28 px-3 sm:px-6">
      <div className="cta-panel relative isolate overflow-hidden max-w-7xl mx-auto rounded-[40px] bg-rus-ink text-white px-6 py-20 sm:px-16 sm:py-24 text-center">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_110%,rgba(224,64,154,0.55),transparent_45%),radial-gradient(circle_at_85%_-10%,rgba(69,197,240,0.45),transparent_45%),radial-gradient(circle_at_50%_50%,rgba(74,95,176,0.35),transparent_60%)]" />

        <div className="cta-reveal relative mx-auto mb-10 size-24">
          <svg className="cta-logo absolute -inset-5 size-[136px]" viewBox="0 0 100 100" aria-hidden="true">
            <defs>
              <linearGradient id="cta-ring" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0" stopColor="#e0409a" />
                <stop offset="0.5" stopColor="#4a5fb0" />
                <stop offset="1" stopColor="#45c5f0" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="46" fill="none" stroke="url(#cta-ring)" strokeWidth="3" strokeDasharray="40 8.2" strokeLinecap="round" />
          </svg>
          <Image src="/logo-192.webp" alt="" width={96} height={96} className="relative rounded-[22px]" />
        </div>

        <h2 className="cta-reveal text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] max-w-3xl mx-auto">
          Your next status could <span className="text-rus-gradient whitespace-nowrap">pay you.</span>
        </h2>
        <p className="cta-reveal mt-6 text-lg text-white/65 max-w-xl mx-auto leading-relaxed">
          Download RUS on Android or iOS and start earning from the campaigns you share today.
        </p>
        <StoreBadges variant="dark" className="cta-reveal mt-10 justify-center" />

        <div className="cta-reveal mt-14 pt-10 border-t border-white/10">
          <p className="text-[11px] font-extrabold tracking-[0.25em] text-white/45 mb-4">COMING SOON TO THE WEB</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {comingToWeb.map((c) => (
              <span key={c} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-semibold text-white/75">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
