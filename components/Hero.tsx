export default function Hero() {
  return (
    <div className="w-full max-w-[1280px] px-5 md:px-10 lg:px-20 py-12 md:py-20 flex flex-col gap-12">
      <div className="flex flex-col gap-6 text-center max-w-[800px] mx-auto animate-fade-in-up">
        <div className="inline-flex mx-auto items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-600 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-magenta-pink"></span>
          Attentionomics Revolution
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-neutral-dark">
          Your Social Feed is an Asset.{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-magenta-pink to-primary">
            Monetize It.
          </span>
        </h2>
        <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-[640px] mx-auto">
          Join the Rent Ur Status platform. Pick brands you love, share their story, and get paid directly for the attention you generate.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-magenta-pink text-white text-base font-bold tracking-[0.015em] hover:bg-pink-600 transition-all shadow-lg shadow-pink-500/25 active:scale-95">
            Start Earning Now
          </button>
          <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-white text-neutral-dark border border-slate-200 text-base font-bold tracking-[0.015em] hover:bg-slate-50 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-magenta-pink hover:to-primary transition-all shadow-sm">
            How it works
          </button>
        </div>
      </div>
    </div>
  );
}
  