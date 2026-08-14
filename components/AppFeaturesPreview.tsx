"use client";

export default function AppFeaturesPreview() {
  const playStoreUrl = "https://play.google.com/store/apps/details?id=com.renturstatus.rus";

  const features = [
    {
      icon: "📱",
      title: "Status Monetization",
      description: "Post verified brand campaigns on your WhatsApp status and get paid per view.",
      gradient: "from-purple-500 to-indigo-600",
      badge: "Earn Daily",
    },
    {
      icon: "🛍️",
      title: "In-App Marketplace",
      description: "Buy & sell physical products, tickets, and redeem merchant coupons directly.",
      gradient: "from-pink-500 to-rose-600",
      badge: "Shop & Sell",
    },
    {
      icon: "💳",
      title: "Instant Bank Payouts",
      description: "Seamlessly withdraw your earnings and rewards directly into your bank account.",
      gradient: "from-emerald-500 to-teal-600",
      badge: "Instant Pay",
    },
    {
      icon: "📢",
      title: "Speed Marketing",
      description: "Promote your brand, products, or events with authentic, real-human engagement.",
      gradient: "from-blue-500 to-indigo-600",
      badge: "High ROI",
    },
  ];

  return (
    <section id="mobile-app" className="py-16 bg-slate-50/80 border-y border-slate-200/60">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-extrabold tracking-wider uppercase text-purple-600 bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
            Available On Mobile Today
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 mb-3">
            Everything You Need Is On The Mobile App
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            While we build the desktop web experience, download the mobile app to access all core features instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((item, index) => (
            <div
              key={index}
              className="relative p-6 rounded-3xl bg-white border border-slate-200/80 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-left"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`size-12 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-2xl shadow-md text-white`}>
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Card */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-purple-700/50">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-extrabold mb-2">Ready to Start Monetizing Your Feed?</h3>
            <p className="text-sm text-purple-200">
              Download the RUS Mobile App now on Android or iOS.
            </p>
          </div>
          <a
            href={playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-sm shadow-xl transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            Download Mobile App
          </a>
        </div>
      </div>
    </section>
  );
}
