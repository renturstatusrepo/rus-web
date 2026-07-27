export default function SocialProof() {
  const profileImages = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=128&q=80",
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-center py-8">
      <div className="flex flex-col gap-8 order-2 lg:order-1">
        <div>
          <h3 className="text-3xl font-bold text-neutral-dark mb-4">
            Trusted by creators & growing businesses
          </h3>
          <p className="text-slate-600 text-lg">
            We handle campaign matching and verification so you can focus on audience engagement. No contracts, direct wallet payouts.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-full bg-pink-50 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined bg-clip-text text-transparent bg-gradient-to-r from-magenta-pink to-primary">check_circle</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold text-lg text-neutral-dark">Guaranteed Payouts</span>
              <span className="text-slate-600">
                Direct transfers to your bank account or wallet once campaign requirements are verified.
              </span>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-full bg-pink-50 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined bg-clip-text text-transparent bg-gradient-to-r from-magenta-pink to-primary">security</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold text-lg text-neutral-dark">Brand Safety Shield</span>
              <span className="text-slate-600">
                We review every campaign. You choose which brands and offers match your personal status.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl order-1 lg:order-2 group ring-1 ring-slate-900/5">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark/90 via-neutral-dark/20 to-transparent"></div>
        <div className="absolute bottom-8 left-8 text-white max-w-xs">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-magenta-pink px-2 py-0.5 rounded text-xs font-bold uppercase shadow-sm">
              Status Marketing
            </span>
            <span className="text-sm font-medium opacity-90">Live Campaigns</span>
          </div>
          <p className="font-bold text-xl md:text-2xl mb-4">
            "RUS lets me earn extra income just by sharing campaign statuses."
          </p>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {profileImages.map((img, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 bg-cover bg-center"
                  style={{ backgroundImage: `url("${img}")` }}
                />
              ))}
            </div>
            <div className="text-sm font-medium">
              <span className="block font-bold">Join Creators & Merchants</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  