"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/components/landing/gsap";

// Oversized brand wordmark that rises out of the bottom of the footer as it scrolls into view
export default function FooterWordmark() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from(".fw-letter", {
          yPercent: 70,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: 0.6 },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden="true" className="pointer-events-none select-none overflow-hidden -mb-[0.2em] mt-8">
      <div className="flex justify-between text-[34vw] lg:text-[26rem] font-black leading-[0.78] tracking-[-0.06em]">
        {"RUS".split("").map((l) => (
          <span
            key={l}
            className="fw-letter inline-block bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.02)_80%)] bg-clip-text text-transparent"
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
