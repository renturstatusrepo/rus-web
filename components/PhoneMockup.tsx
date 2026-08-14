"use client";

import React from "react";
import Image from "next/image";

interface PhoneMockupProps {
  type: "dashboard" | "campaigns" | "wallet";
  className?: string;
}

export default function PhoneMockup({ type, className = "" }: PhoneMockupProps) {
  const images = {
    dashboard: "/dashboard.jpeg",
    campaigns: "/campaign.jpeg",
    wallet: "/wallet.jpeg",
  };

  const titles = {
    dashboard: "RUS Dashboard",
    campaigns: "RUS Campaigns",
    wallet: "RUS Wallet",
  };

  return (
    <div
      className={`relative w-[270px] sm:w-[300px] h-[540px] sm:h-[580px] bg-slate-900 rounded-[44px] p-3 shadow-2xl border-4 border-slate-800 ring-1 ring-slate-700/50 backdrop-blur-xl ${className}`}
    >
      {/* Dynamic Island / Notch */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-between px-2.5 shadow-md">
        <div className="size-2 rounded-full bg-slate-800" />
        <div className="size-2.5 rounded-full bg-blue-900/60 border border-blue-500/40" />
      </div>

      {/* Real Screenshot Container */}
      <div className="relative w-full h-full bg-slate-950 rounded-[34px] overflow-hidden flex items-center justify-center border border-slate-800 select-none">
        <Image
          src={images[type]}
          alt={titles[type]}
          width={300}
          height={580}
          className="w-full h-full object-cover object-top rounded-[34px]"
          priority
        />
      </div>
    </div>
  );
}
