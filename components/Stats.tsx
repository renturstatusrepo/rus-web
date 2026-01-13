export default function Stats() {
  const stats = [
    { value: "15k+", label: "Active Users", color: "text-neutral-dark" },
    { value: "₦3B+", label: "Paid Out to Users", color: "text-magenta-pink" },
    { value: "500+", label: "Partner Brands", color: "text-neutral-dark" },
    { value: "100%", label: "User Control", color: "bg-clip-text text-transparent bg-gradient-to-r from-magenta-pink to-primary" },
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
  