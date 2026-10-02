import { APP_STORE_URL, PLAY_STORE_URL } from "./links";

type Variant = "dark" | "light";

const playIcon =
  "M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z";
const appleIcon =
  "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.96.99-3.12-1 .04-2.22.67-2.93 1.5-.63.73-1.18 1.9-1.03 3.03 1.12.09 2.28-.57 2.97-1.41z";

// "dark" sits on dark backgrounds (white Play badge), "light" sits on light backgrounds (ink Play badge)
export default function StoreBadges({ variant = "dark", className = "" }: { variant?: Variant; className?: string }) {
  const play =
    variant === "dark"
      ? "bg-white text-slate-950 hover:bg-slate-100"
      : "bg-rus-ink text-white hover:bg-slate-900";
  const playSub = variant === "dark" ? "text-slate-500" : "text-slate-400";

  return (
    <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 ${className}`}>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`group flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl font-bold shadow-xl hover:-translate-y-0.5 ${play}`}
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d={playIcon} />
        </svg>
        <span className="text-left">
          <span className={`block text-[10px] uppercase tracking-wider font-semibold ${playSub}`}>Get it on</span>
          <span className="block text-sm font-extrabold leading-none">Google Play</span>
        </span>
      </a>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl text-white font-bold shadow-xl shadow-rus-pink/25 bg-[linear-gradient(110deg,var(--color-rus-pink),var(--color-rus-indigo)_55%,var(--color-rus-cyan))] bg-[length:160%_100%] bg-left hover:bg-right hover:-translate-y-0.5 transition-[background-position,transform] duration-500"
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d={appleIcon} />
        </svg>
        <span className="text-left">
          <span className="block text-[10px] uppercase tracking-wider font-semibold text-white/75">Download on the</span>
          <span className="block text-sm font-extrabold leading-none">App Store</span>
        </span>
      </a>
    </div>
  );
}
