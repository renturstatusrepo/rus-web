"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger } from "./gsap";
import { PLAY_STORE_URL } from "./links";

const links = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#brands", label: "For brands" },
  { href: "/marketplace", label: "Marketplace" },
];

export default function LandingNav() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const { contextSafe } = useGSAP(
    () => {
      // Glass background once the page has scrolled
      ScrollTrigger.create({
        start: 40,
        end: "max",
        toggleClass: { targets: root.current, className: "nav-scrolled" },
      });
    },
    { scope: root },
  );

  // In-page links glide to their section, landing just under the fixed nav
  const jump = contextSafe((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false);
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.to(window, { scrollTo: { y: href, offsetY: 72 }, duration: reduce ? 0 : 1.1, ease: "power3.inOut" });
    history.replaceState(null, "", href);
  });

  return (
    <header
      ref={root}
      className="group/nav fixed inset-x-0 top-0 z-50 px-3 sm:px-6 pt-3 transition-[padding] duration-300 [&.nav-scrolled]:pt-2"
    >
      <div className="nav-inner intro-up [--intro-y:-30px] [--d:0.1s] max-w-7xl mx-auto flex items-center justify-between rounded-2xl px-4 sm:px-5 py-3 border border-transparent transition-colors duration-300 group-[.nav-scrolled]/nav:bg-rus-ink/75 group-[.nav-scrolled]/nav:border-white/10 group-[.nav-scrolled]/nav:backdrop-blur-xl group-[.nav-scrolled]/nav:shadow-2xl">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image src="/logo-192.webp" alt="RUS Logo" width={36} height={36} className="transition-transform group-hover:rotate-6" priority />
          <span className="text-xl font-extrabold tracking-tight text-white">RUS</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-white/70">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={(e) => jump(e, l.href)} className="hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>

        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-rus-ink text-sm font-bold hover:bg-white/90"
        >
          Download App
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-white"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden mt-2 rounded-2xl bg-rus-ink/95 border border-white/10 backdrop-blur-xl p-4 flex flex-col gap-1 animate-fade-in-up">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={(e) => jump(e, l.href)}
              className="px-3 py-2.5 rounded-lg text-sm font-semibold text-white/80 hover:bg-white/5"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 py-3 rounded-xl bg-white text-rus-ink text-center text-sm font-bold"
          >
            Download App
          </a>
        </div>
      )}
    </header>
  );
}
