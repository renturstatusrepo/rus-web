"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const playStoreUrl = "https://play.google.com/store/apps/details?id=com.renturstatus.rus";
  const appStoreUrl = "https://apps.apple.com/us/app/rus-speed-marketing-platform/id6503910431";

  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden border-t border-purple-900/40">
      {/* Ambient Glow Lights */}
      <div className="absolute top-0 left-1/4 size-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 size-96 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12 relative z-10">
        {/* Top Feature Banner Inside Footer */}
        <div className="mb-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 border border-purple-500/30 backdrop-blur-xl shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-left space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-pink-500/20 text-pink-300 border border-pink-500/30">
              ⚡ GET STARTED INSTANTLY
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ready to Monetize Your Status?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Download the RUS mobile app on Android or iOS and start earning daily rewards.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 w-full lg:w-auto">
            <a
              href={playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white text-slate-950 font-bold text-xs shadow-xl hover:bg-slate-100 transition-all hover:scale-105 active:scale-95"
            >
              <svg className="w-5 h-5 fill-current text-slate-950" viewBox="0 0 24 24">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <div className="text-left">
                <div className="text-[9px] uppercase tracking-wider font-semibold text-slate-600">GET IT ON</div>
                <div className="text-xs font-extrabold leading-none">Google Play</div>
              </div>
            </a>

            <a
              href={appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-xl transition-all hover:scale-105 active:scale-95 border border-white/20"
            >
              <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.96.99-3.12-1 .04-2.22.67-2.93 1.5-.63.73-1.18 1.9-1.03 3.03 1.12.09 2.28-.57 2.97-1.41z" />
              </svg>
              <div className="text-left">
                <div className="text-[9px] uppercase tracking-wider font-semibold text-purple-200">DOWNLOAD ON THE</div>
                <div className="text-xs font-extrabold leading-none">App Store</div>
              </div>
            </a>
          </div>
        </div>

        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <Image
                src="/logo.png"
                alt="RUS Logo"
                width={40}
                height={40}
                className="object-contain transition-transform group-hover:rotate-6"
              />
              <span className="text-2xl font-extrabold tracking-tight text-purple-400">
                RUS
              </span>
            </Link>

            <p className="text-sm text-slate-300 max-w-md leading-relaxed">
              RUS (Speed Marketing Platform) is a premier social status monetization platform. Connect with top brands, monetize status views, and enjoy instant bank payouts.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-300 text-xs font-bold border border-purple-500/20">
              <span>🏛️</span> Developed by RUS Limited
            </div>
          </div>

          {/* Legal & Safety */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-black text-white uppercase tracking-widest border-b border-slate-800 pb-2">
              Legal & Safety
            </h4>
            <Link href="/privacy" className="text-sm text-slate-300 hover:text-pink-400 hover:translate-x-1 transition-all">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-slate-300 hover:text-pink-400 hover:translate-x-1 transition-all">
              Terms of Service
            </Link>
            <Link href="/child-safety-standards" className="text-sm text-slate-300 hover:text-pink-400 hover:translate-x-1 transition-all">
              Child Safety Standards
            </Link>
            <Link href="/account-deletion" className="text-sm text-slate-300 hover:text-pink-400 hover:translate-x-1 transition-all">
              Account Deletion
            </Link>
          </div>

          {/* Contact & Apps */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-black text-white uppercase tracking-widest border-b border-slate-800 pb-2">
              Get App & Support
            </h4>
            <a
              href={playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-300 hover:text-pink-400 hover:translate-x-1 transition-all"
            >
              Get on Google Play
            </a>
            <a
              href={appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-300 hover:text-pink-400 hover:translate-x-1 transition-all"
            >
              Download on App Store
            </a>
            <a
              href="mailto:support@renturstatus.com"
              className="text-sm text-pink-400 hover:text-pink-300 font-semibold pt-2 transition-colors"
            >
              ✉️ support@renturstatus.com
            </a>
          </div>
        </div>

        {/* Separator Line */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>© {new Date().getFullYear()} RUS Limited. All rights reserved.</div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-300 font-bold border border-pink-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
            </span>
            The RUS web experience is coming soon 🚀
          </div>
        </div>
      </div>
    </footer>
  );
}
