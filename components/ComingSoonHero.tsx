"use client";

import { useState, useEffect } from "react";
import PhoneMockup from "./PhoneMockup";

export default function ComingSoonHero() {
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  const playStoreUrl = "https://play.google.com/store/apps/details?id=com.renturstatus.rus";
  const appStoreUrl = "https://apps.apple.com/us/app/rus-speed-marketing-platform/id6503910431";
  const appDeepLink = "renturstatus://";

  useEffect(() => {
    const userAgent = typeof window !== "undefined" ? navigator.userAgent || "" : "";
    const isMobile = /android|iphone|ipad|ipod|windows phone/i.test(userAgent);
    setIsMobileDevice(isMobile);
  }, []);

  return (
    <section className="relative overflow-hidden pt-10 pb-20 lg:pt-16 lg:pb-32 bg-white">
      {/* Glow & Particles Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-purple-500/10 via-pink-500/5 to-transparent blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-20 right-10 size-80 bg-purple-600/15 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-40 left-10 size-80 bg-blue-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        {/* Mobile Device Auto-Detection Banner */}
        {isMobileDevice && (
          <div className="max-w-3xl mx-auto mb-8 p-4 rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-purple-700/50">
            <div className="flex items-center gap-3 text-left">
              <span className="text-2xl">📱</span>
              <div>
                <h4 className="text-sm font-bold">You're on a Mobile Device!</h4>
                <p className="text-xs text-purple-200">Open or download the RUS app directly.</p>
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

        {/* Coming Soon Indicator Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200/80 text-purple-900 text-xs sm:text-sm font-bold mb-6 shadow-sm">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-600"></span>
          </span>
          <span>WEB APP COMING SOON • <b>MOBILE APP READY</b></span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.12] mb-6 max-w-5xl mx-auto">
          RUS is{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-pink-600 to-indigo-600">
            Coming to the Web.
          </span>
        </h1>

        {/* Supporting Message */}
        <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
          The web experience is almost here. In the meantime, manage your RUS experience from our mobile apps on iOS and Android.
        </p>

        {/* Primary Download CTAs (Authentic Badges) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          {/* Google Play Button */}
          <a
            href={playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-7 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-base shadow-xl shadow-slate-950/15 transition-all hover:scale-[1.02] active:scale-[0.98] border border-slate-800"
          >
            <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
              <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
            </svg>
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">GET IT ON</div>
              <div className="text-sm font-extrabold leading-none">Google Play</div>
            </div>
          </a>

          {/* Apple App Store Button */}
          <a
            href={appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-purple-700 via-pink-600 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white font-bold text-base shadow-xl shadow-purple-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.96.99-3.12-1 .04-2.22.67-2.93 1.5-.63.73-1.18 1.9-1.03 3.03 1.12.09 2.28-.57 2.97-1.41z" />
            </svg>
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-wider font-semibold text-purple-200">DOWNLOAD ON THE</div>
              <div className="text-sm font-extrabold leading-none">App Store</div>
            </div>
          </a>
        </div>

        {/* Sophisticated Smartphone Mockups Showcase Composition */}
        <div className="relative max-w-5xl mx-auto mt-8 pt-6">
          {/* Subtle Glow Ring behind phones */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-80 bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-blue-600/20 rounded-full blur-3xl -z-10" />

          {/* Desktop Overlapping Trio Composition */}
          <div className="hidden md:flex items-center justify-center -space-x-16 lg:-space-x-20 perspective-1000">
            {/* Left Phone: Status Campaigns */}
            <div className="transform -rotate-6 scale-90 translate-y-6 hover:translate-y-0 transition-transform duration-500 z-10">
              <PhoneMockup type="campaigns" />
            </div>

            {/* Center Phone: Main Dashboard */}
            <div className="transform scale-105 -translate-y-2 z-30 shadow-2xl hover:scale-110 transition-transform duration-500">
              <PhoneMockup type="dashboard" />
            </div>

            {/* Right Phone: Instant Wallet Withdrawals */}
            <div className="transform rotate-6 scale-90 translate-y-6 hover:translate-y-0 transition-transform duration-500 z-10">
              <PhoneMockup type="wallet" />
            </div>
          </div>

          {/* Mobile Single Hero Mockup */}
          <div className="md:hidden flex items-center justify-center">
            <PhoneMockup type="dashboard" className="scale-95" />
          </div>
        </div>
      </div>
    </section>
  );
}
