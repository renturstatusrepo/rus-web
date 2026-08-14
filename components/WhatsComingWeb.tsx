"use client";

import React from "react";

export default function WhatsComingWeb() {
  const upcomingFeatures = [
    {
      icon: "🌐",
      title: "Seamless Web Experience",
      description: "Access your RUS account directly from any desktop or mobile browser without app dependencies.",
      badge: "COMING SOON TO WEB",
    },
    {
      icon: "💻",
      title: "Advanced Brand Analytics",
      description: "Broader screen real estate for businesses to manage status ad campaigns, view analytics, and track performance.",
      badge: "COMING SOON TO WEB",
    },
    {
      icon: "⚡",
      title: "Instant Sync",
      description: "Real-time sync between your mobile app profile, wallet balances, and web dashboard.",
      badge: "COMING SOON TO WEB",
    },
    {
      icon: "🚀",
      title: "More Capabilities On The Way",
      description: "Bulk brand campaign scheduling, expanded analytics, and deeper business integration tools are being built.",
      badge: "IN DEVELOPMENT",
    },
  ];

  return (
    <section id="whats-coming" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
            🚀 WHAT'S COMING TO THE WEB
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            A New Way to Experience RUS.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            The web experience is currently being developed and will provide a convenient, browser-based platform for all RUS users and business partner brands.
          </p>
        </div>

        {/* Feature Teaser Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {upcomingFeatures.map((item, index) => (
            <div
              key={index}
              className="relative p-6 rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="size-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-2xl">
                    {item.icon}
                  </div>
                  <span className="text-[9px] font-extrabold tracking-wider uppercase text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200/80">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] font-bold text-purple-600">
                <span>Feature in Progress</span>
                <span>⏳</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
