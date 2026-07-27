export default function Stats() {
  const stats = [
    { value: "100%", label: "Real Human Views", color: "text-neutral-dark" },
    { value: "Instant", label: "Direct Wallet Payouts", color: "text-magenta-pink" },
    { value: "Opt-In", label: "Full Content Control", color: "text-neutral-dark" },
    { value: "Real-Time", label: "Transparent Tracking", color: "bg-clip-text text-transparent bg-gradient-to-r from-magenta-pink to-primary" },
  ];

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-slate-200">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col gap-1 items-center md:items-start text-center md:text-left"
        >
          <span className={`text-3xl font-extrabold ${stat.color}`}>
            {stat.value}
          </span>
          <span className="text-sm text-slate-500 font-medium">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
  