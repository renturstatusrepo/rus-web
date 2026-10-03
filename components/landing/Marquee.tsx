"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger, MOTION_OK } from "./gsap";

const items = [
  "Monetize your status",
  "Pay per verified view",
  "Instant bank payouts",
  "Speed marketing",
  "Verified merchant stores",
  "Event tickets",
  "Earn as an affiliate",
  "Daily Spin & Win",
  "Real human reach",
];

export default function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const loop = gsap.to(".marquee-track", { xPercent: -50, duration: 32, ease: "none", repeat: -1 });

        // Scrolling speeds the marquee up (and reverses it when scrolling back up), then it eases back to cruise
        let settle: gsap.core.Tween | undefined;
        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const boost = gsap.utils.clamp(-6, 6, self.getVelocity() / 300);
            settle?.kill();
            loop.timeScale(boost >= 0 ? 1 + boost : boost - 1);
            settle = gsap.to(loop, { timeScale: self.direction, duration: 1.2, ease: "power2.out" });
          },
        });
      });
    },
    { scope: root },
  );

  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <span key={t} className="flex items-center gap-8 pr-8 text-2xl sm:text-4xl font-extrabold tracking-tight whitespace-nowrap">
          {t}
          <svg viewBox="0 0 24 24" className="size-6 sm:size-8 shrink-0" aria-hidden="true">
            <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="9 4.2" />
          </svg>
        </span>
      ))}
    </div>
  );

  return (
    <div
      ref={root}
      className="relative overflow-hidden py-6 sm:py-8 text-white bg-[linear-gradient(100deg,var(--color-rus-pink),var(--color-rus-indigo)_50%,var(--color-rus-cyan))] -rotate-1 scale-[1.02] -mt-6 z-10 shadow-2xl shadow-rus-indigo/30"
    >
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
