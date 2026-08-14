"use client";

import React from "react";

export default function BrandStory() {
  return (
    <section id="about" className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-purple-100 text-purple-800 border border-purple-200 mb-3">
            💡 WHAT IS RUS?
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Status Monetization, <span className="text-purple-700">Marketplace</span> & Speed Marketing
          </h2>
          <p className="text-base sm:text-lg text-slate-700 font-medium max-w-2xl mx-auto leading-relaxed">
            RUS connects daily status creators, buyers, and verified merchant brands all in one platform.
          </p>
        </div>

        {/* 3 Main Purpose Focus Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1: For Creators / Users */}
          <div className="p-8 rounded-3xl bg-white border-2 border-purple-100 shadow-xl shadow-purple-900/5 hover:border-purple-300 transition-all text-left flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="size-14 rounded-2xl bg-purple-700 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-purple-700/30">
                  📲
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                  For Creators & Users
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-3">
                Status Monetization
              </h3>

              <ul className="space-y-3 text-sm sm:text-base font-semibold text-slate-700">
                <li className="flex items-center gap-2.5">
                  <span className="size-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>Pick brand campaigns & post to status</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="size-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>Submit view proof & earn cash per view</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="size-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>Withdraw directly to your bank account</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-700">
              <span>⚡ Spin & Win Bonus</span>
              <span>💸 Instant Payouts</span>
            </div>
          </div>

          {/* Card 2: In-App Marketplace */}
          <div className="p-8 rounded-3xl bg-white border-2 border-pink-100 shadow-xl shadow-pink-900/5 hover:border-pink-300 transition-all text-left flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="size-14 rounded-2xl bg-pink-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-pink-600/30">
                  🛍️
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider text-pink-700 bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
                  In-App Marketplace
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-3">
                Shop & Sell Online
              </h3>

              <ul className="space-y-3 text-sm sm:text-base font-semibold text-slate-700">
                <li className="flex items-center gap-2.5">
                  <span className="size-5 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>Explore verified merchant stores & products</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="size-5 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>Buy event tickets & claim merchant coupons</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="size-5 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>Open your own store & manage sales easily</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-pink-700">
              <span>🎟️ Event Tickets</span>
              <span>🏪 Merchant Stores</span>
            </div>
          </div>

          {/* Card 3: For Businesses / Brands */}
          <div className="p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-xl shadow-slate-900/5 hover:border-purple-300 transition-all text-left flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="size-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                  📢
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-300">
                  For Brands & Merchants
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-3">
                Speed Marketing
              </h3>

              <ul className="space-y-3 text-sm sm:text-base font-semibold text-slate-700">
                <li className="flex items-center gap-2.5">
                  <span className="size-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>Post ads on thousands of real status feeds</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="size-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>Pay strictly for verified real-human views</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="size-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>Drive instant sales & event bookings</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
              <span>📈 High ROI Ads</span>
              <span>🎯 Real Human Views</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
