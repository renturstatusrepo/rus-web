export default function LandingHero() {
  return (
    <section className="relative px-6 py-12 lg:px-40 lg:py-20 bg-background-light">
      <div className="mx-auto max-w-[1200px]">
        <div className="@container">
          <div className="flex flex-col-reverse gap-10 lg:flex-row lg:items-center lg:gap-16">
            <div className="flex flex-1 flex-col gap-6 text-left">
              <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-extrabold leading-tight tracking-tight lg:text-6xl text-neutral-dark">
                  Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-magenta-pink to-primary">Attentionomics.</span>
                </h1>
                <h2 className="text-lg font-normal leading-relaxed text-neutral-dark max-w-xl">
                  The platform where businesses pay for attention — and people earn from it. Join the new economy of value exchange.
                </h2>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <button className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-magenta-pink hover:bg-pink-600 text-white text-base font-bold shadow-lg shadow-pink-500/25 transition-all">
                  <span>Start a Campaign</span>
                </button>
                <button className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-white border border-slate-200 hover:border-magenta-pink text-neutral-dark hover:text-magenta-pink text-base font-bold transition-all shadow-sm">
                  <span>Start Earning</span>
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span className="material-symbols-outlined text-lg text-green-500">check_circle</span>
                <span>Verified by 10,000+ active users</span>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div
                className="w-full aspect-[4/3] bg-cover bg-center rounded-2xl shadow-2xl shadow-pink-500/10 border border-slate-200 relative overflow-hidden"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDHh_exGcRtLROYqktgEIgibal17-OBU5SMtC_yk3BgzzzrMJFKTc8LCWHz-HGyy2azLUyaefUjrVyRgoerCDmBcCbz3iP_64CA4DtGrJy46rczX9IqF04DGb8HzgccDQlA4sXVfsg7TB0GWp3cG7e9N6ypgre70jb0Bvyo2-I3A-6ESStAp-8qsldz43531vSy494YrpgeReSF_oUAHnx9aKFk0JmNNvrrmgxCRDYINGa3dIlemX4XM2tRT9NTadTa8K4atbnoHg")',
                }}
              >
                <div className="w-full h-full bg-gradient-to-tr from-background-dark/80 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

