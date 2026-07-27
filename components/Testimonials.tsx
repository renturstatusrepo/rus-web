"use client";

import { useState } from "react";

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState("featured");

  const tabs = [
    { id: "featured", label: "Featured Stories" },
    { id: "advertisers", label: "Businesses" },
    { id: "earners", label: "Creators & Earners" },
  ];

  const testimonials = [
    {
      name: "Tunde Adebayo",
      role: "Fashion Brand Owner",
      type: "Advertiser",
      verified: true,
      verifiedColor: "primary",
      badgeBg: "bg-pink-50",
      badgeText: "text-magenta-pink",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
      quote:
        "Running campaigns on RUS helped our clothing line reach real buyers directly on WhatsApp. The engagement was genuine, social, and effective.",
    },
    {
      name: "Amaka Nwosu",
      role: "Student & Creator",
      type: "Earner",
      verified: true,
      verifiedColor: "green-500",
      badgeBg: "bg-slate-100",
      badgeText: "text-slate-600",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
      quote:
        "I post campaign statuses during my free time. Payouts go straight to my wallet once verified. It's transparent and super easy to use.",
    },
    {
      name: "Chidi Okonkwo",
      role: "Digital Marketer",
      type: "Advertiser",
      verified: true,
      verifiedColor: "primary",
      badgeBg: "bg-pink-50",
      badgeText: "text-magenta-pink",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
      quote:
        "Unlike display ads plagued by bot traffic, RUS status campaigns connect our business with real people through trusted peer sharing.",
    },
    {
      name: "Blessing Ndukwe",
      role: "Small Business Owner",
      type: "Earner",
      verified: true,
      verifiedColor: "green-500",
      badgeBg: "bg-slate-100",
      badgeText: "text-slate-600",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
      quote:
        "The platform gives full control. I only pick campaign statuses that fit my personal brand and audience, making it feel totally natural.",
    },
  ];

  const ratingBreakdown = [
    { stars: 5, percentage: 88 },
    { stars: 4, percentage: 9 },
    { stars: 3, percentage: 2 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 0 },
  ];

  return (
    <section className="relative bg-white py-12">
      <div className="px-4 md:px-40 flex flex-1 justify-center py-12">
        <div className="flex flex-col max-w-[960px] flex-1 items-center text-center">
          <h2 className="text-neutral-dark text-3xl md:text-5xl font-bold leading-tight tracking-[-0.015em] px-4 pb-4">
            Trusted by Brands, Loved by People
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl px-4 leading-relaxed">
            See how RUS is connecting businesses with real audience attention. Whether you're launching a campaign or sharing statuses, the experience is built on trust and transparency.
          </p>
        </div>
      </div>

      <div className="px-4 md:px-40 flex flex-1 justify-center pb-8">
        <div className="flex flex-col max-w-[960px] flex-1">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex flex-col gap-2 items-center md:items-start">
              <div className="flex items-baseline gap-2">
                <p className="text-neutral-dark text-5xl font-black leading-tight tracking-[-0.033em]">4.9</p>
                <span className="text-slate-600 text-sm font-medium">/ 5.0</span>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-2xl bg-clip-text text-transparent bg-gradient-to-r from-magenta-pink to-primary"
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="text-neutral-dark text-base font-medium leading-normal mt-1">Verified Platform Feedback</p>
            </div>
            <div className="grid min-w-[280px] max-w-[400px] flex-1 grid-cols-[20px_1fr_40px] items-center gap-y-3">
              {ratingBreakdown.map((rating) => (
                <div key={rating.stars} className="contents">
                  <p className="text-neutral-dark text-sm font-bold leading-normal">{rating.stars}</p>
                  <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="rounded-full bg-gradient-to-r from-magenta-pink to-primary"
                      style={{ width: `${rating.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-slate-600 text-sm font-normal leading-normal text-right">{rating.percentage}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-40 flex flex-1 justify-center py-5 sticky top-0 z-10 bg-white/95 backdrop-blur-sm">
        <div className="flex flex-col max-w-[960px] flex-1">
          <div className="pb-3">
            <div className="flex border-b border-slate-200 px-4 gap-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`cursor-pointer flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 transition-colors ${
                    activeTab === tab.id
                      ? "border-b-magenta-pink text-neutral-dark"
                      : "border-b-transparent text-slate-600 hover:text-neutral-dark"
                  }`}
                >
                  <p className="text-sm font-bold leading-normal tracking-[0.015em]">{tab.label}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-40 flex flex-1 justify-center py-5">
        <div className="max-w-[960px] flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="flex flex-col rounded-2xl p-8 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-14 w-14 rounded-full overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-neutral-dark text-lg font-bold">{testimonial.name}</p>
                      {testimonial.verified && (
                        <span
                          className={`material-symbols-outlined text-lg ${
                            testimonial.verifiedColor === "primary"
                              ? "bg-clip-text text-transparent bg-gradient-to-r from-magenta-pink to-primary"
                              : "text-green-500"
                          }`}
                          title={testimonial.type === "Advertiser" ? "Verified Business" : "Verified Earner"}
                        >
                          verified
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 text-sm">{testimonial.role}</p>
                  </div>
                  <div className="ml-auto">
                    <span
                      className={`inline-flex items-center rounded-full ${testimonial.badgeBg} px-2.5 py-1 text-xs font-semibold ${testimonial.badgeText}`}
                    >
                      {testimonial.type}
                    </span>
                  </div>
                </div>
                <div className="relative flex-1">
                  <span className="material-symbols-outlined text-magenta-pink text-4xl mb-3 absolute -top-2 -left-2 opacity-20">
                    format_quote
                  </span>
                  <p className="text-neutral-dark text-lg md:text-xl font-medium leading-relaxed italic relative z-10 pl-6">
                    "{testimonial.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 md:px-40 flex flex-1 justify-center py-12">
        <div className="flex flex-col max-w-[960px] flex-1 items-center gap-6">
          <p className="text-slate-600 text-center font-medium">
            Join users and businesses participating in speed status marketing
          </p>
          <div className="flex gap-4">
            <button className="bg-neutral-dark hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-bold transition-colors">
              Start Earning
            </button>
            <button className="bg-magenta-pink hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-bold transition-colors shadow-lg shadow-pink-500/20">
              Advertise with RUS
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

