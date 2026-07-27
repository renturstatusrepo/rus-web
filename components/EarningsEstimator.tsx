"use client";

import { useState } from "react";

export default function EarningsEstimator() {
  const [dailyViews, setDailyViews] = useState(250);

  // Calculate realistic monthly earnings based on average daily status views
  const calculateEarnings = (views: number) => {
    // Approx ₦30 estimated earning per daily view per month from active campaigns
    return Math.round(views * 30);
  };

  const earnings = calculateEarnings(dailyViews);
  const percentage = ((dailyViews - 50) / (2000 - 50)) * 100;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setDailyViews(value);
  };

  return (
    <div className="w-full bg-white rounded-2xl p-8 md:p-12 shadow-xl shadow-slate-200/40 border border-slate-200 flex flex-col lg:flex-row gap-12 items-center justify-between overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-magenta-pink/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="flex flex-col gap-6 flex-1 relative z-10 w-full">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-2">
            Estimate Your Monthly Earnings
          </h3>
          <p className="text-slate-600 max-w-md">
            See how much you could make based on your average daily status views and campaign participation.
          </p>
        </div>
        <div className="mt-4 flex flex-col gap-4 w-full max-w-lg">
          <div className="flex justify-between items-end">
            <span className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Average Daily Status Views
            </span>
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-magenta-pink to-primary">
              {dailyViews.toLocaleString()} views
            </span>
          </div>
          <div className="flex h-6 w-full items-center cursor-pointer group py-2">
            <div className="relative flex h-2 flex-1 rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-magenta-pink to-primary"
                style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
              ></div>
              <div
                className="absolute top-1/2 -translate-y-1/2 size-7 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ left: `${Math.min(100, Math.max(0, percentage))}%` }}
              >
                <div className="size-2 rounded-full bg-magenta-pink"></div>
              </div>
            </div>
            <input
              type="range"
              min="50"
              max="2000"
              step="10"
              value={dailyViews}
              onChange={handleSliderChange}
              className="absolute w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-xs font-medium text-slate-400">
            <span>50 views</span>
            <span>2,000+ views</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-slate-50 rounded-2xl p-8 min-w-[300px] text-center border border-slate-100 relative z-10 w-full lg:w-auto shadow-sm">
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">
          Estimated Earnings
        </p>
        <p className="text-5xl md:text-6xl font-extrabold text-magenta-pink tracking-tight">
          ₦{earnings.toLocaleString()}
          <span className="text-xl text-slate-400 font-medium ml-1">/mo</span>
        </p>
        <div className="mt-6 flex items-center gap-2 px-3 py-1.5 bg-pink-50 rounded-full border border-pink-100 text-sm font-bold">
          <span className="material-symbols-outlined text-base bg-clip-text text-transparent bg-gradient-to-r from-magenta-pink to-primary">verified</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-magenta-pink to-primary">Based on view activity</span>
        </div>
      </div>
    </div>
  );
}
  