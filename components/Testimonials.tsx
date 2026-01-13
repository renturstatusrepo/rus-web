"use client";

import { useState } from "react";

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState("featured");

  const tabs = [
    { id: "featured", label: "Featured Stories" },
    { id: "video", label: "Video Reviews" },
    { id: "case", label: "Case Studies" },
  ];

  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "CMO at TechFlow",
      type: "Advertiser",
      verified: true,
      verifiedColor: "primary",
      badgeBg: "bg-pink-50",
      badgeText: "text-magenta-pink",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA0Qt8D4Xa2Zm-utS6c33K17dHBv1h5oT6v1yZWj3uqVSIkjKqWrea4_2V7fy04NrwdJKSBL12QUgQpmkkbyiez0STryTalJmfCT_2pGl0SKDk_Ak7t-j8SX_V3DYAK_DfxfwM_N7i7hUKET781EXaAo1n-HQ0AmK7zucRyrcFp-iTvi5GFx1WeZMsFRd781qZrRdKCxT0ANkyXUodEvUwLzqtD7mrMhCXfXJE-BXoUIBUtktkYzkfN1VxJfBS4omzdkl-Mbt_8JA",
      quote:
        "Finally, ad spend that makes sense. We saw a 300% increase in genuine engagement compared to traditional display ads.",
    },
    {
      name: "Mike Ross",
      role: "Student • Earned ₦675,000 this mo.",
      type: "Earner",
      verified: true,
      verifiedColor: "green-500",
      badgeBg: "bg-slate-100",
      badgeText: "text-slate-600",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD0EAMpVbcQFpkI7zw1dfXLwOoGMwtpAAy7VHi5J1A_byJCk9Xdr34BUKVuBoQqqmgBKROYxT_i9cq1bePi1yRlmSlSOJJo6TQDHdFp7BgCT3QxIiFPflPo3VY2taYW4TWKES-JV9Xf19DJAGfZka3m8x7EAaozSdN7NNH_A1sl1gjnyirvdn3rSpbT4dk1TYoazlT8IjKhw2ohIP4nJIv3qHbUP30QeeJcpHCroLjYDHenaQ7uKRD8QEF4t62JnWMwgsb6XHQ5fg",
      quote:
        "I turn my downtime into downtime dollars. It's the easiest side hustle I've ever had while focusing on my studies.",
    },
    {
      name: "Jenny Wilson",
      role: "Freelancer • Top 10% Earner",
      type: "Earner",
      verified: true,
      verifiedColor: "green-500",
      badgeBg: "bg-slate-100",
      badgeText: "text-slate-600",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCVXBrir4lTeHHDIMVGnz6SAsTYXKb6_9RtETE-deND2PnAWRGqf6mHS9JE-CQY4tApYoood3C1VtVmOouTotVl1xRe1XLmF0y4sPgyvXNHVsUoQ6-TcCgUAltxRN-KDMJhyqr4DefmkwB0NTR7NUj9ZWeB1Eeluw8sEmisK5V-pPYcxoIiILePVdTRmH37mfY63lOvNgWuXab5JPo_SfMQDt7BFyr64pVh7QdXEOJ3JVbN7Unz1e_WgqY1R3IepJ9ehQPDlQDSQA",
      quote:
        "RUS helped me pay for my textbooks just by watching ads that actually interest me. The platform is super transparent.",
    },
    {
      name: "David Kim",
      role: "Founder at GrowthLabs",
      type: "Advertiser",
      verified: true,
      verifiedColor: "primary",
      badgeBg: "bg-pink-50",
      badgeText: "text-magenta-pink",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDOmj14PyKFBIwkIrIQL0_c874MHbUEOqH3KTBestgTPML67ueMezVJlQ4i0xulXiIKS-fEymTpzaUd_y1OrQ31OJ6KgytWJhat7VryGIrg34z60CYWTxdKDBDmOA9sa4mn8TTbRyj42omOvN0TAlvRGx2ImrhBT0iiR5Kuw3pyd6MNllpo4cFFDtOkTjxOJzZjStFbEac6lqQ6Eu0qj3kp57lu6Cre9F7eJkTR8_z_XgNuYu4xK5rVETY0OGR0ZbZhUK9LJBeadg",
      quote:
        "The verified attention metric is a game changer. We know exactly who we are reaching and the conversion rates prove it.",
    },
  ];

  const ratingBreakdown = [
    { stars: 5, percentage: 85 },
    { stars: 4, percentage: 10 },
    { stars: 3, percentage: 3 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 1 },
  ];

  return (
    <section className="relative bg-white py-12">
      <div className="px-4 md:px-40 flex flex-1 justify-center py-12">
        <div className="flex flex-col max-w-[960px] flex-1 items-center text-center">
          <h2 className="text-neutral-dark text-3xl md:text-5xl font-bold leading-tight tracking-[-0.015em] px-4 pb-4">
            Trusted by Brands, Loved by People
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl px-4 leading-relaxed">
            See how RUS is redefining advertising through Attentionomics. Whether you're buying attention or renting your status, the results speak for themselves.
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
                {[1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-2xl bg-clip-text text-transparent bg-gradient-to-r from-magenta-pink to-primary"
                  >
                    star
                  </span>
                ))}
                <span className="material-symbols-outlined text-2xl bg-clip-text text-transparent bg-gradient-to-r from-magenta-pink to-primary">
                  star_half
                </span>
              </div>
              <p className="text-neutral-dark text-base font-medium leading-normal mt-1">10k+ Active Participants</p>
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
                  <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    <div
                      className="h-full w-full bg-cover bg-center"
                      style={{ backgroundImage: `url("${testimonial.image}")` }}
                    ></div>
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
            Join 10,000+ others participating in the Attention Economy
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

