export default function BusinessComparison() {
  return (
    <section className="py-20 relative overflow-hidden bg-white">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-50 to-transparent opacity-50 pointer-events-none"></div>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-neutral-dark mb-4">The RUS Difference</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Compare the old way of buying ads with the new era of Attentionomics.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="relative p-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 opacity-70 hover:opacity-100 transition-opacity">
            <div className="absolute top-4 right-4">
              <span className="material-symbols-outlined text-slate-400 text-3xl">block</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-500 mb-6">Traditional Ad Tech</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-red-500 shrink-0">close</span>
                <span className="text-slate-600">Up to 40% bot traffic</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-red-500 shrink-0">close</span>
                <span className="text-slate-600">Ignored banner blindness</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-red-500 shrink-0">close</span>
                <span className="text-slate-600">Intrusive user experience</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-red-500 shrink-0">close</span>
                <span className="text-slate-600">Opaque pricing models</span>
              </li>
            </ul>
          </div>
          <div className="relative p-8 rounded-2xl bg-white border border-magenta-pink shadow-lg transform md:-translate-y-4">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-magenta-pink to-primary rounded-t-2xl"></div>
            <div className="absolute top-4 right-4">
              <span className="material-symbols-outlined bg-clip-text text-transparent bg-gradient-to-r from-magenta-pink to-primary text-3xl">verified_user</span>
            </div>
            <h3 className="text-2xl font-bold text-neutral-dark mb-6">RUS Attentionomics</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-green-500 shrink-0">check_circle</span>
                <span className="text-slate-700">100% ID-verified humans</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-green-500 shrink-0">check_circle</span>
                <span className="text-slate-700">Active, paid engagement</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-green-500 shrink-0">check_circle</span>
                <span className="text-slate-700">Shared by trusted peers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-green-500 shrink-0">check_circle</span>
                <span className="text-slate-700">Transparent ROI tracking</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

