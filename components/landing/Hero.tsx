"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef, useSyncExternalStore } from "react";
import { gsap, useGSAP, MOTION_OK, REDUCED_MOTION } from "./gsap";
import StoreBadges from "./StoreBadges";
import { APP_DEEP_LINK, PLAY_STORE_URL } from "./links";
import type { SceneState } from "./HeroScene";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const noopSubscribe = () => () => {};

const headline: { text: string; gradient?: boolean }[][] = [
  [{ text: "Your" }, { text: "status" }],
  [{ text: "is" }, { text: "worth", gradient: true }, { text: "more.", gradient: true }],
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const scene = useRef<SceneState>({ scroll: 0 });
  // The user agent never changes, so there is nothing to subscribe to; the server render assumes desktop
  const isMobileDevice = useSyncExternalStore(
    noopSubscribe,
    () => /android|iphone|ipad|ipod|windows phone/i.test(navigator.userAgent || ""),
    () => false,
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.set("[data-intro]", { autoAlpha: 1 })
          .from(".hero-badge", { y: -16, autoAlpha: 0, duration: 0.8 })
          .from(".hero-word", { yPercent: 115, rotate: 4, duration: 1.1, stagger: 0.07 }, "-=0.5")
          .from(".hero-copy", { y: 24, autoAlpha: 0, duration: 0.9 }, "-=0.7")
          .from(".hero-cta > *", { y: 20, autoAlpha: 0, duration: 0.8, stagger: 0.1 }, "-=0.6")
          .from(".hero-stage", { scale: 0.75, autoAlpha: 0, duration: 1.6, ease: "expo.out" }, 0.2)
          .from(".hero-chip", { scale: 0.6, autoAlpha: 0, duration: 0.7, stagger: 0.12, ease: "back.out(2)" }, "-=1");

        // Drifting chips around the 3D icon
        gsap.utils.toArray<HTMLElement>(".hero-chip").forEach((chip, i) => {
          gsap.to(chip, { y: i % 2 ? 10 : -10, duration: 2.4 + i * 0.4, repeat: -1, yoyo: true, ease: "sine.inOut" });
        });

        // Scroll: push the copy back and hand progress to the 3D scene
        gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        })
          .to(scene.current, { scroll: 1, ease: "none" }, 0)
          .to(".hero-text", { yPercent: -18, autoAlpha: 0.2, ease: "none" }, 0)
          .to(".hero-chips", { yPercent: -40, autoAlpha: 0, ease: "none" }, 0);
      });

      mm.add(REDUCED_MOTION, () => {
        gsap.set("[data-intro]", { autoAlpha: 1 });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative isolate overflow-hidden bg-rus-ink text-white pt-28 pb-20 lg:pt-36 lg:pb-28 min-h-[100svh] flex items-center"
    >
      {/* Ambient brand glow + grid */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-32 size-[560px] rounded-full bg-rus-pink/25 blur-[140px]" />
        <div className="absolute top-1/3 -right-40 size-[620px] rounded-full bg-rus-cyan/20 blur-[150px]" />
        <div className="absolute bottom-0 left-1/3 size-[420px] rounded-full bg-rus-indigo/30 blur-[130px]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-6 items-center">
        <div className="hero-text relative z-10">
          {isMobileDevice && (
            <div className="mb-8 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-between gap-4">
              <div className="text-left">
                <p className="text-sm font-bold">You&apos;re on mobile</p>
                <p className="text-xs text-white/60">Open or download the RUS app directly.</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <a href={APP_DEEP_LINK} className="px-4 py-2 text-xs font-bold rounded-xl bg-rus-pink hover:bg-pink-500">
                  Open App
                </a>
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-white/10 hover:bg-white/20 border border-white/15"
                >
                  Get App
                </a>
              </div>
            </div>
          )}

          <div
            data-intro
            className="hero-badge inline-flex items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs sm:text-sm font-semibold text-white/80 mb-7"
          >
            <span className="px-2 py-0.5 rounded-full bg-rus-pink text-[10px] font-extrabold tracking-wider text-white">NEW</span>
            Marketplace is now live on the web
          </div>

          <h1 data-intro className="font-extrabold tracking-tight leading-[0.98] text-[13vw] sm:text-7xl lg:text-[5.6rem] mb-7">
            {headline.map((line, li) => (
              <span key={li} className="block">
                {line.map((w, wi) => (
                  <span key={wi} className="inline-block overflow-hidden align-bottom pb-[0.08em] mr-[0.22em] last:mr-0">
                    <span className={`hero-word inline-block ${w.gradient ? "text-rus-gradient" : ""}`}>{w.text}</span>
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p data-intro className="hero-copy text-lg sm:text-xl text-white/65 max-w-xl leading-relaxed mb-10">
            Post brand campaigns to your status, get paid for every verified view, and cash out straight to your bank.
            Brands reach real people, fast.
          </p>

          <div data-intro className="hero-cta flex flex-col gap-5">
            <StoreBadges variant="dark" />
            <Link
              href="/marketplace"
              className="group inline-flex items-center gap-2 text-sm font-bold text-white/80 hover:text-white w-fit"
            >
              Explore the Marketplace
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* 3D stage */}
        <div data-intro className="hero-stage relative h-[380px] sm:h-[460px] lg:h-[600px]">
          <HeroScene state={scene} />
          <div className="hero-chips pointer-events-none absolute inset-0 hidden sm:block">
            <div className="hero-chip absolute top-[12%] left-[2%] px-4 py-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xl shadow-2xl">
              <p className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Per verified view</p>
              <p className="text-lg font-extrabold">You get paid</p>
            </div>
            <div className="hero-chip absolute bottom-[16%] right-[0%] px-4 py-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xl shadow-2xl flex items-center gap-3">
              <span className="size-9 rounded-xl bg-emerald-400/20 text-emerald-300 grid place-items-center font-black">₦</span>
              <span>
                <span className="block text-[10px] uppercase tracking-widest text-white/50 font-bold">Withdrawal</span>
                <span className="block text-sm font-extrabold">Straight to your bank</span>
              </span>
            </div>
            <div className="hero-chip absolute bottom-[6%] left-[10%] px-3.5 py-2 rounded-full bg-rus-pink/20 border border-rus-pink/40 backdrop-blur-xl text-xs font-bold">
              ⚡ Daily Spin &amp; Win
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-[10px] tracking-[0.3em] text-white/40 font-bold">
        SCROLL
        <span className="h-10 w-px bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
