"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ComingSoonHero() {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const playStoreUrl = "https://play.google.com/store/apps/details?id=com.renturstatus.rus";
  const appDeepLink = "renturstatus://";

  useEffect(() => {
    // Detect mobile device
    const userAgent = typeof window !== "undefined" ? navigator.userAgent || "" : "";
    const isMobile = /android|iphone|ipad|ipod|windows phone/i.test(userAgent);
    setIsMobileDevice(isMobile);
  }, []);

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setEmail("");
    }, 600);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28">
      {/* Background Gradients & Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-purple-500/10 via-pink-500/5 to-transparent blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-20 right-10 size-72 bg-purple-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 left-10 size-72 bg-blue-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Mobile Device Auto-Redirect Banner */}
        {isMobileDevice && (
          <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-purple-900 to-indigo-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-purple-700/50 animate-fade-in-up">
            <div className="flex items-center gap-3 text-left">
              <span className="text-2xl">📱</span>
              <div>
                <h4 className="text-sm font-bold">You're on a Mobile Device!</h4>
                <p className="text-xs text-purple-200">Tap below to open or download the official RentUrStatus app.</p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={appDeepLink}
                className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-center transition-all shadow-md"
              >
                Open App
              </a>
              <a
                href={playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-xl bg-white/10 hover:bg-white/20 text-white text-center transition-all border border-white/20"
              >
                Get App
              </a>
            </div>
          </div>
        )}

        {/* Coming Soon Status Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200/80 text-purple-800 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-600"></span>
          </span>
          <span>Web Dashboard Under Development • <b>Mobile App Live</b></span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-6">
          Monetize Your Social Feed{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-pink-600 to-blue-600">
            On The Go
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
          The official RentUrStatus Web App is coming soon! In the meantime, download our feature-packed Mobile App to start monetizing your status views, running targeted campaigns, and withdrawing cash directly to your bank.
        </p>

        {/* Primary Download CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <a
            href={playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-base shadow-xl shadow-slate-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
            </svg>
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-300">GET IT ON</div>
              <div className="text-sm font-extrabold leading-none">Google Play</div>
            </div>
          </a>

          <a
            href={appDeepLink}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white font-bold text-base shadow-xl shadow-purple-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
            </svg>
            <span>Launch App Directly</span>
          </a>
        </div>

        {/* Email Notification Form */}
        <div className="max-w-xl mx-auto p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-2xl shadow-purple-500/5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-purple-700 mb-2">
            Be First to Access the Web App
          </h3>
          <p className="text-xs text-slate-600 mb-4">
            Enter your email to receive early access and launch updates when our web platform goes live.
          </p>

          {submitted ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2">
              <span>🎉</span> You're on the early access list! We'll notify you as soon as the web app launches.
            </div>
          ) : (
            <form onSubmit={handleNotifySubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all whitespace-nowrap"
              >
                {loading ? "Saving..." : "Notify Me"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
