const features = [
  {
    title: "Curated Control",
    description:
      "You choose what to post. No spam, only brands and stories you align with personally. Your reputation stays yours.",
    icon: "tune",
    highlight: false,
  },
  {
    title: "Real-Time Earnings",
    description:
      "Watch your balance grow as your audience engages. Earn up to ₦750,000 per post based on engagement.",
    icon: "attach_money",
    highlight: true,
  },
  {
    title: "Passive Growth",
    description:
      "Turn your daily scrolling habit into a secondary income stream with minimal extra effort. Post, scroll, earn.",
    icon: "trending_up",
    highlight: false,
  },
];

export default function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-8">
      {features.map((f, i) => (
        <div
          key={i}
          className={`flex flex-col gap-4 rounded-xl p-8 bg-white shadow-sm border border-slate-200 hover:shadow-md transition-shadow hover:border-magenta-pink/30 group ${
            f.highlight
              ? "shadow-lg border-magenta-pink/30 relative overflow-hidden hover:shadow-xl"
              : ""
          }`}
        >
          {f.highlight && (
            <div className="absolute -right-6 -top-6 p-4 opacity-[0.05] rotate-12 transition-transform group-hover:rotate-6">
              <span className="material-symbols-outlined text-[140px] text-magenta-pink">
                payments
              </span>
            </div>
          )}
          <div
            className={`size-14 rounded-xl flex items-center justify-center mb-2 ${
              f.highlight
                ? "bg-pink-50 text-magenta-pink"
                : "bg-pink-50 group-hover:bg-pink-100 transition-colors"
            }`}
          >
            <span className={`material-symbols-outlined text-3xl ${f.highlight ? "text-magenta-pink" : "bg-clip-text text-transparent bg-gradient-to-r from-magenta-pink to-primary"}`}>{f.icon}</span>
          </div>
          <div className={f.highlight ? "relative" : ""}>
            <h3 className="text-xl font-bold text-neutral-dark mb-3">{f.title}</h3>
            <p className="text-slate-600 text-base leading-relaxed">
              {f.highlight ? (
                <>
                  Watch your balance grow as your audience engages. Earn up to{" "}
                  <span className="text-magenta-pink font-bold bg-pink-50 px-1 rounded">
                    ₦750,000 per post
                  </span>{" "}
                  based on engagement.
                </>
              ) : (
                f.description
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
  