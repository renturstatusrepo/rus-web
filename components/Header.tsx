"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-solid border-slate-200 px-6 py-4 lg:px-40">
      <div className="flex items-center justify-between whitespace-nowrap">
        <Link href="/" className="flex items-center gap-3 text-slate-900 hover:opacity-80 transition-opacity">
          <div className="relative size-10 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="RUS Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>
          <span className="text-lg font-bold leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-magenta-pink to-primary">
            RUS
          </span>
        </Link>
        <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
          <nav className="flex items-center gap-8">
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-slate-700 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-magenta-pink hover:to-primary transition-all"
            >
              How it Works
            </Link>
            <Link
              href="#for-users"
              className="text-sm font-medium text-slate-700 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-magenta-pink hover:to-primary transition-all"
            >
              For Users
            </Link>
            <Link
              href="#for-business"
              className="text-sm font-medium text-slate-700 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-magenta-pink hover:to-primary transition-all"
            >
              For Business
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-slate-700 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-magenta-pink hover:to-primary transition-all"
            >
              Testimonials
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium text-slate-700 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-magenta-pink hover:to-primary transition-all"
            >
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="#for-users"
              className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-white border border-slate-200 hover:border-magenta-pink text-slate-700 hover:text-magenta-pink text-sm font-bold transition-all"
            >
              <span className="truncate">Start Earning</span>
            </Link>
            <Link
              href="#for-business"
              className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-magenta-pink hover:bg-pink-600 text-white text-sm font-bold transition-all shadow-lg shadow-pink-500/25"
            >
              <span className="truncate">Get Started</span>
            </Link>
          </div>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-900 p-2"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">
            {mobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 mt-4 pt-4 pb-4">
          <nav className="flex flex-col gap-4">
            <Link
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-700 hover:text-magenta-pink transition-colors py-2"
            >
              How it Works
            </Link>
            <Link
              href="#for-users"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-700 hover:text-magenta-pink transition-colors py-2"
            >
              For Users
            </Link>
            <Link
              href="#for-business"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-700 hover:text-magenta-pink transition-colors py-2"
            >
              For Business
            </Link>
            <Link
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-700 hover:text-magenta-pink transition-colors py-2"
            >
              Testimonials
            </Link>
            <Link
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-700 hover:text-magenta-pink transition-colors py-2"
            >
              FAQ
            </Link>
            <div className="flex flex-col gap-3 pt-2">
              <Link
                href="#for-users"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center rounded-lg h-10 px-4 bg-white border border-slate-200 hover:border-magenta-pink text-slate-700 hover:text-magenta-pink text-sm font-bold transition-all"
              >
                Start Earning
              </Link>
              <Link
                href="#for-business"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center rounded-lg h-10 px-4 bg-magenta-pink hover:bg-pink-600 text-white text-sm font-bold transition-all"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

