"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "./gsap";
import { formatPrice } from "@/lib/format";
import type { ProductSummary } from "@/lib/marketplace";

export default function FeaturedProducts({ products }: { products: ProductSummary[] }) {
  const root = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from(".fp-heading > *", {
          y: 40,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".fp-heading", start: "top 80%" },
        });
        gsap.from(".fp-card", {
          x: 160,
          rotate: 4,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: rail.current, start: "top 85%" },
          // Hand the cards back to CSS afterwards, so the hover lift (a CSS translate) works again
          clearProps: "transform,translate,rotate,scale",
        });
      });
    },
    { scope: root },
  );

  // Slide the rail by roughly one screen of cards; native scrolling and snapping still work by touch/trackpad
  const slide = contextSafe((e: React.MouseEvent<HTMLButtonElement>, dir: 1 | -1) => {
    const el = e.currentTarget.closest("section")?.querySelector<HTMLElement>(".fp-rail");
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.to(el, {
      scrollTo: { x: el.scrollLeft + dir * el.clientWidth * 0.85 },
      duration: reduce ? 0 : 0.9,
      ease: "power3.inOut",
      // Snapping would yank the rail mid-tween, so pause it until the slide lands
      onStart: () => void (el.style.scrollSnapType = "none"),
      onComplete: () => void (el.style.scrollSnapType = ""),
    });
  });

  if (products.length === 0) return null;

  return (
    <section ref={root} className="relative bg-white py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute -top-20 right-[-10%] size-[480px] rounded-full bg-rus-pink/10 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="fp-heading flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold tracking-[0.25em] text-rus-pink mb-3">FRESH ON THE MARKETPLACE</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-slate-900">
              Shop sellers across <span className="text-rus-gradient">Nigeria.</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={(e) => slide(e, -1)}
              aria-label="Previous products"
              className="size-12 rounded-full border border-slate-200 grid place-items-center text-slate-700 hover:border-rus-indigo hover:text-rus-indigo"
            >
              ←
            </button>
            <button
              type="button"
              onClick={(e) => slide(e, 1)}
              aria-label="Next products"
              className="size-12 rounded-full border border-slate-200 grid place-items-center text-slate-700 hover:border-rus-indigo hover:text-rus-indigo"
            >
              →
            </button>
            <Link
              href="/marketplace"
              className="ml-2 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-rus-ink text-white text-sm font-bold hover:bg-slate-800"
            >
              Browse all
            </Link>
          </div>
        </div>
      </div>

      {/* Rail lines up with the content column on the left and bleeds off the right edge */}
      <div
        ref={rail}
        className="fp-rail flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 px-4 sm:px-6 scroll-pl-4 sm:scroll-pl-6 xl:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] xl:scroll-pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/marketplace/product/${encodeURIComponent(p.id)}`}
            className="fp-card group relative shrink-0 snap-start w-[72vw] sm:w-[280px] lg:w-[300px] rounded-[28px] bg-slate-50 border border-slate-200/80 overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-rus-indigo/15 transition-[translate,box-shadow] duration-500"
          >
            <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden">
              {p.image && (
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(min-width: 1024px) 300px, (min-width: 640px) 280px, 72vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
              <span className="absolute left-3 bottom-3 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur text-sm font-extrabold text-slate-900 shadow">
                {formatPrice(p.price)}
              </span>
              <span className="absolute right-3 top-3 size-10 rounded-full bg-white/90 backdrop-blur grid place-items-center text-slate-900 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300">
                ↗
              </span>
            </div>
            <div className="p-4">
              <h3 className="line-clamp-1 font-bold text-slate-900 group-hover:text-rus-indigo">{p.title}</h3>
              <p className="mt-0.5 truncate text-sm text-slate-500">
                {[p.businessName, p.location].filter(Boolean).join(" · ") || "RUS Marketplace"}
              </p>
            </div>
          </Link>
        ))}

        <Link
          href="/marketplace"
          className="fp-card shrink-0 snap-start w-[72vw] sm:w-[280px] lg:w-[300px] rounded-[28px] p-8 flex flex-col justify-between text-white bg-[linear-gradient(150deg,var(--color-rus-pink),var(--color-rus-indigo)_55%,var(--color-rus-cyan))] hover:-translate-y-1 transition-[translate] duration-500"
        >
          <span className="text-xs font-extrabold tracking-[0.25em] text-white/80">MARKETPLACE</span>
          <span>
            <span className="block text-3xl font-extrabold leading-tight">See everything for sale</span>
            <span className="mt-4 inline-flex items-center gap-2 font-bold">
              Open the Marketplace <span aria-hidden="true">→</span>
            </span>
          </span>
        </Link>
      </div>
    </section>
  );
}
