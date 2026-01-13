export default function BusinessHero() {
  return (
    <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-24 overflow-hidden bg-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-magenta-pink/10 blur-[120px] rounded-full pointer-events-none opacity-50"></div>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-magenta-pink animate-pulse"></span>
            <span className="text-xs font-medium text-magenta-pink uppercase tracking-wider">
              Attentionomics Engine v1.0
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-dark mb-6 leading-[1.1]">
            Launch Affordable, <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-magenta-pink to-primary">
              High-Impact Campaigns
            </span>
            <br className="hidden sm:block" />
            Powered by Real People
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop paying for empty impressions. Invest in Attentionomics where authentic reach drives real results. Connect with humans, not bots.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button className="flex items-center justify-center h-12 px-8 rounded-lg bg-magenta-pink hover:bg-pink-600 text-white font-bold text-base shadow-lg shadow-pink-500/25 transition-all">
              <span className="material-symbols-outlined mr-2 text-[20px]">rocket_launch</span>
              Start Your Campaign
            </button>
            <button className="flex items-center justify-center h-12 px-8 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-neutral-dark font-bold text-base transition-colors group">
              <span className="material-symbols-outlined mr-2 text-[20px] text-slate-400 group-hover:text-magenta-pink transition-colors">
                play_circle
              </span>
              See How It Works
            </button>
          </div>
          <div className="mt-16 w-full max-w-5xl mx-auto relative rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
            <div className="aspect-[21/9] w-full bg-slate-900 rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-[#1e2532]"></div>
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "radial-gradient(rgba(56, 189, 248, 0.1) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              ></div>
              <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 hidden md:flex flex-col gap-3 p-4 bg-white/90 backdrop-blur border border-slate-200 rounded-lg w-64 shadow-xl z-10 opacity-60 scale-90">
                <div className="flex items-center justify-between">
                  <div className="h-2 w-20 bg-slate-300 rounded"></div>
                  <div className="h-2 w-8 bg-red-500/50 rounded"></div>
                </div>
                <div className="h-16 w-full bg-slate-100 rounded border border-dashed border-slate-300 flex items-center justify-center text-xs text-slate-500">
                  Bot Traffic Detected
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-4 p-5 bg-white border border-magenta-pink/30 rounded-xl w-72 shadow-[0_0_30px_rgba(236,72,153,0.15)] z-20">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="text-sm font-bold text-neutral-dark">Campaign Active</span>
                  <span className="flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]"></span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-magenta-pink/10 p-2 rounded-lg text-magenta-pink">
                    <span className="material-symbols-outlined text-[20px]">group</span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-neutral-dark">12,405</div>
                    <div className="text-xs text-slate-500">Verified Humans</div>
                  </div>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-magenta-pink to-primary h-full w-[75%]"></div>
                </div>
              </div>
              <div className="absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-1/2 hidden md:flex flex-col gap-3 p-4 bg-white/90 backdrop-blur border border-slate-200 rounded-lg w-64 shadow-xl z-10">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-slate-200"></div>
                  <div className="flex flex-col gap-1">
                    <div className="h-2 w-24 bg-slate-300 rounded"></div>
                    <div className="h-2 w-16 bg-slate-300 rounded"></div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="material-symbols-outlined text-magenta-pink text-sm">verified</span>
                  <span className="text-xs text-slate-600">Identity Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

