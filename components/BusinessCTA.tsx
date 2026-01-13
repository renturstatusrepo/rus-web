export default function BusinessCTA() {
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50 -z-10"></div>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-neutral-dark mb-6">Ready to rent real status?</h2>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          Join the platform that is redefining digital advertising. High impact, low fraud, total transparency.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto px-8 py-4 bg-magenta-pink hover:bg-pink-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-pink-500/25 transition-all transform hover:-translate-y-1">
            Create Business Account
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-300 text-slate-700 hover:text-neutral-dark hover:border-slate-400 rounded-xl font-bold text-lg transition-all">
            Talk to Sales
          </button>
        </div>
        <p className="mt-8 text-sm text-slate-500">
          No credit card required for demo.{" "}
          <a className="text-magenta-pink hover:underline" href="#">
            Read our whitepaper
          </a>
          .
        </p>
      </div>
    </section>
  );
}

