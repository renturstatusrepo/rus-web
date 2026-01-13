export default function HeroStats() {
  const stats = [
    {
      icon: "campaign",
      label: "Active Campaigns",
      value: "1,240",
      color: "bg-clip-text text-transparent bg-gradient-to-r from-magenta-pink to-primary",
    },
    {
      icon: "payments",
      label: "Total Payouts",
      value: "₦7.8B",
      color: "text-green-500",
    },
    {
      icon: "group",
      label: "Active Users",
      value: "10,000+",
      color: "bg-clip-text text-transparent bg-gradient-to-r from-magenta-pink to-primary",
    },
  ];

  return (
    <section className="px-6 py-10 lg:px-40 border-y border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 rounded-xl p-6 bg-white border border-slate-200 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className={`material-symbols-outlined ${stat.color}`}>
                  {stat.icon}
                </span>
                <p className="text-base font-medium text-slate-500">{stat.label}</p>
              </div>
              <p className="text-3xl font-bold text-slate-900 tracking-tight">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

