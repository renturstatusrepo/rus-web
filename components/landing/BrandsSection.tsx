"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "./gsap";
import { PLAY_STORE_URL } from "./links";

const statement =
  "Put your brand on thousands of real status feeds. Pay only for verified human views. Sell out today, not next quarter.";

const perks = [
  { k: "Real reach", v: "Ads run on genuine people's status feeds, seen by their own contacts." },
  { k: "Verified views", v: "Creators submit view proof, so you pay for humans, not bots." },
  { k: "Speed", v: "Launch a campaign from the app and start getting views the same day." },
];

export default function BrandsSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        // Words light up as the statement scrolls through the viewport
        gsap.fromTo(
          ".br-word",
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: { trigger: ".br-statement", start: "top 80%", end: "bottom 45%", scrub: true },
          },
        );
        gsap.from(".br-perk", {
          y: 50,
          autoAlpha: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".br-perks", start: "top 85%" },
        });
        gsap.to(".br-orb", {
          yPercent: -30,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="brands" ref={root} className="relative isolate overflow-hidden bg-rus-ink text-white py-28 sm:py-36">
      <div className="br-orb pointer-events-none absolute -z-10 right-[-10%] top-[10%] size-[600px] rounded-full bg-rus-indigo/35 blur-[150px]" />
      <div className="pointer-events-none absolute -z-10 left-[-10%] bottom-[-10%] size-[500px] rounded-full bg-rus-pink/20 blur-[140px]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-extrabold tracking-[0.25em] text-rus-cyan mb-6">FOR BRANDS · SPEED MARKETING</p>
        <p className="br-statement text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] mb-20">
          {statement.split(" ").map((w, i) => (
            <span key={i} className="br-word">
              {w}{" "}
            </span>
          ))}
        </p>

        <div className="br-perks grid md:grid-cols-3 gap-px rounded-3xl overflow-hidden bg-white/10 border border-white/10 mb-14">
          {perks.map((p, i) => (
            <div key={p.k} className="br-perk bg-rus-ink/90 p-8 backdrop-blur">
              <span className="text-sm font-extrabold text-white/40">0{i + 1}</span>
              <h3 className="mt-3 text-xl font-extrabold">{p.k}</h3>
              <p className="mt-2 text-white/60 leading-relaxed">{p.v}</p>
            </div>
          ))}
        </div>

        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-white text-rus-ink font-extrabold hover:-translate-y-0.5"
        >
          Start a campaign in the app
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </section>
  );
}
