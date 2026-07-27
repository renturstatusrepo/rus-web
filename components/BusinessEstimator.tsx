"use client";

import { useState } from "react";

export default function BusinessEstimator() {
  const [budget, setBudget] = useState(25000);
  const [audienceSize, setAudienceSize] = useState(7);

  // Calculate results based on inputs
  const calculateResults = () => {
    const estimatedViews = Math.round(budget / 25);
    const shares = Math.max(1, Math.round(budget / 1000));
    const costPerView = 25;

    return {
      estimatedViews: estimatedViews.toLocaleString(),
      shares: shares.toLocaleString(),
      costPerView: costPerView.toLocaleString(),
    };
  };

  const results = calculateResults();

  const getAudienceLabel = (value: number) => {
    if (value <= 3) return "Niche";
    if (value <= 6) return "Targeted";
    if (value <= 8) return "Broad";
    return "Mass Market";
  };

  return (
    <section className="py-20 bg-slate-50 border-t border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-neutral-dark mb-4">Estimate Your Reach</h2>
            <p className="text-slate-600 mb-8">
              See how far your budget goes with real human status views. Adjust the sliders to simulate your campaign potential.
            </p>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">Campaign Budget</label>
                  <span className="text-sm font-bold text-neutral-dark">₦{budget.toLocaleString()}</span>
                </div>
                <input
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-magenta-pink"
                  type="range"
                  min="5000"
                  max="500000"
                  step="5000"
                  value={budget}
                  onChange={(e) => setBudget(parseInt(e.target.value))}
                />
                <div className="flex justify-between mt-1 text-xs text-slate-500">
                  <span>₦5,000</span>
                  <span>₦500,000</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">Target Audience Size</label>
                  <span className="text-sm font-bold text-neutral-dark">{getAudienceLabel(audienceSize)}</span>
                </div>
                <input
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-magenta-pink"
                  type="range"
                  min="1"
                  max="10"
                  value={audienceSize}
                  onChange={(e) => setAudienceSize(parseInt(e.target.value))}
                />
                <div className="flex justify-between mt-1 text-xs text-slate-500">
                  <span>Niche</span>
                  <span>Mass Market</span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 w-full">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 relative overflow-hidden shadow-lg">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-magenta-pink/10 blur-[80px] rounded-full pointer-events-none"></div>
              <h3 className="text-slate-500 text-sm uppercase tracking-wide font-semibold mb-6">
                Estimated Campaign Impact
              </h3>
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="text-3xl font-bold text-neutral-dark mb-1">{results.estimatedViews}+</div>
                  <div className="text-sm text-slate-500">Verified Status Views</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-neutral-dark mb-1">~{results.shares}</div>
                  <div className="text-sm text-slate-500">Authentic Status Posts</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-neutral-dark mb-1">~₦{results.costPerView}</div>
                  <div className="text-sm text-slate-500">Est. Cost per View</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-1">100%</div>
                  <div className="text-sm text-slate-500">Real Human Audience</div>
                </div>
              </div>
              <button className="w-full py-3 rounded-lg bg-magenta-pink text-white font-bold hover:bg-pink-600 transition-colors">
                Start a Campaign
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

