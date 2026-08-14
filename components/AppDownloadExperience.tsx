"use client";

import React from "react";

export default function AppDownloadExperience() {
  const playStoreUrl = "https://play.google.com/store/apps/details?id=com.renturstatus.rus";
  const appStoreUrl = "https://apps.apple.com/us/app/rus-speed-marketing-platform/id6503910431";

  return (
    <section className="py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200 mb-4">
          📲 CHOOSE YOUR PLATFORM
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Download RUS Mobile App
        </h2>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-14 leading-relaxed">
          Available now on Android and iOS. Experience RUS on your smartphone today while we build the upcoming web platform.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Android Box */}
          <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl flex flex-col justify-between items-center text-center space-y-6 border border-slate-800">
            <div className="size-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-3xl border border-emerald-500/30">
              🤖
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Android</h3>
              <p className="text-xs text-slate-300">Compatible with Android 8.0 and above</p>
            </div>
            <a
              href={playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-lg transition-all"
            >
              <svg className="w-6 h-6 fill-current text-slate-950" viewBox="0 0 24 24">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <span>Get it on Google Play</span>
            </a>
          </div>

          {/* iOS Box */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col justify-between items-center text-center space-y-6 border border-purple-700/50">
            <div className="size-16 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center text-3xl border border-purple-500/30">
              🍏
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">iOS</h3>
              <p className="text-xs text-purple-200">Compatible with iOS 14.0 and above</p>
            </div>
            <a
              href={appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-extrabold text-sm shadow-lg transition-all"
            >
              <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.96.99-3.12-1 .04-2.22.67-2.93 1.5-.63.73-1.18 1.9-1.03 3.03 1.12.09 2.28-.57 2.97-1.41z" />
              </svg>
              <span>Download on the App Store</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
