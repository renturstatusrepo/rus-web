"use client";

import React from "react";
import PhoneMockup from "./PhoneMockup";

export default function MobileAppCTA() {
  const playStoreUrl = "https://play.google.com/store/apps/details?id=com.renturstatus.rus";
  const appStoreUrl = "https://apps.apple.com/us/app/rus-speed-marketing-platform/id6503910431";

  return (
    <section id="mobile-app" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle Background Lighting */}
      <div className="absolute top-0 right-0 size-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 size-96 bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Conversion Copy & App Badges */}
          <div className="text-left space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
              ⚡ LIVE & AVAILABLE NOW
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Get RUS on Mobile
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Don't wait for the web experience. Download the official RUS mobile app on Android or iOS and get started today.
            </p>

            {/* Feature Highlights Bullets */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="size-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-500/30">
                  ✓
                </div>
                <span className="text-sm font-semibold text-slate-200">
                  Monetize your status views with daily verified brand campaigns
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="size-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-500/30">
                  ✓
                </div>
                <span className="text-sm font-semibold text-slate-200">
                  Instant local bank transfers directly to your account
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="size-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-500/30">
                  ✓
                </div>
                <span className="text-sm font-semibold text-slate-200">
                  Daily Spin & Win wheel rewards & bonus coins
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <a
                href={playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-white text-slate-950 font-bold text-sm shadow-xl hover:bg-slate-100 transition-all"
              >
                <svg className="w-6 h-6 fill-current text-slate-950" viewBox="0 0 24 24">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-600">GET IT ON</div>
                  <div className="text-sm font-extrabold leading-none">Google Play</div>
                </div>
              </a>

              <a
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-sm shadow-xl transition-all"
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
          </div>

          {/* Right Column: Interactive Device Showcase */}
          <div className="flex justify-center items-center">
            <div className="relative">
              <PhoneMockup type="wallet" className="scale-100 shadow-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
