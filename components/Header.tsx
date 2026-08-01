"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const playStoreUrl = "https://play.google.com/store/apps/details?id=com.renturstatus.rus";

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 py-4 lg:px-20">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative size-10 flex items-center justify-center transition-transform group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="RUS Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-pink-600 to-blue-600">
              RentUrStatus
            </span>
            <span className="text-[10px] font-semibold tracking-wider uppercase text-purple-600">
              Mobile App Live
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600"></span>
            </span>
            Web App Coming Soon
          </span>

          <a
            href={playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white text-sm font-bold shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Get Mobile App</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-700 hover:text-purple-700"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-2 border-t border-slate-100 mt-3 animate-fade-in-up">
          <div className="flex flex-col gap-3">
            <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-purple-800">Web App Status</span>
              <span className="text-xs font-bold text-pink-600">Coming Soon 🚀</span>
            </div>

            <a
              href={playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-purple-700 text-white font-bold text-sm shadow-md"
            >
              <span>Download Mobile App</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

