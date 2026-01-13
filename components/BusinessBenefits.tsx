export default function BusinessBenefits() {
  const benefits = [
    {
      icon: "visibility",
      title: "Authentic Reach",
      description:
        "Get authentic reach, not empty impressions. We verify every user so your budget connects with genuine potential customers, eliminating bot traffic completely.",
      iconBg: "bg-magenta-pink/10",
      iconBorder: "border-magenta-pink/20",
      iconColor: "text-magenta-pink",
      linkColor: "text-magenta-pink",
      linkText: "Learn about verification",
    },
    {
      icon: "share",
      title: "Organic Trust",
      description:
        "Your campaigns spread organically. They are trusted because they come from people sharing on their personal profiles, creating a ripple of social proof.",
      iconBg: "bg-magenta-pink/10",
      iconBorder: "border-magenta-pink/20",
      iconColor: "text-magenta-pink",
      linkColor: "text-magenta-pink",
      linkText: "View engagement model",
    },
    {
      icon: "savings",
      title: "Smart Economics",
      description:
        "Launch affordable campaigns with granular control. Our marketplace dynamics ensure you pay the true market rate for attention, maximizing ROI.",
      iconBg: "bg-magenta-pink/10",
      iconBorder: "border-magenta-pink/20",
      iconColor: "text-magenta-pink",
      linkColor: "text-magenta-pink",
      linkText: "Calculate your savings",
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-slate-200" id="benefits">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-magenta-pink/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-magenta-pink/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-slate-50 border border-slate-200 text-magenta-pink text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
            Benefits for Businesses
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-neutral-dark mb-6 leading-tight">
            Launch affordable, <span className="bg-clip-text text-transparent bg-gradient-to-r from-magenta-pink to-primary">high-impact campaigns</span>{" "}
            <br className="hidden md:block" />
            powered by real people.
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover the RUS advantage. We've built a platform that prioritizes human attention over algorithmic guesswork.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="group h-full p-8 rounded-2xl bg-white border border-slate-200 hover:border-magenta-pink transition-all duration-300 hover:shadow-lg flex flex-col"
            >
              <div
                className={`w-14 h-14 rounded-xl ${benefit.iconBg} border ${benefit.iconBorder} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <span className={`material-symbols-outlined ${benefit.iconColor} text-3xl`}>
                  {benefit.icon}
                </span>
              </div>
              <h3 className="text-xl font-bold text-neutral-dark mb-4">{benefit.title}</h3>
              <p className="text-slate-600 leading-relaxed flex-grow">
                {benefit.title === "Authentic Reach" && (
                  <>
                    Get <strong className="text-neutral-dark">authentic reach, not empty impressions</strong>. We verify every user so your budget connects with genuine potential customers, eliminating bot traffic completely.
                  </>
                )}
                {benefit.title === "Organic Trust" && (
                  <>
                    Your <strong className="text-neutral-dark">campaigns spread organically</strong>. They are trusted because they come from people sharing on their personal profiles, creating a ripple of social proof.
                  </>
                )}
                {benefit.title === "Smart Economics" && (
                  <>
                    Launch <strong className="text-neutral-dark">affordable</strong> campaigns with granular control. Our marketplace dynamics ensure you pay the true market rate for attention, maximizing ROI.
                  </>
                )}
              </p>
              <div className={`mt-6 pt-6 border-t border-slate-200 flex items-center text-sm ${benefit.linkColor} font-medium cursor-pointer`}>
                <span>{benefit.linkText}</span>
                <span className="material-symbols-outlined text-base ml-1 transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

