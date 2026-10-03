import Image from "next/image";
import Link from "next/link";
import FooterWordmark from "./FooterWordmark";
import { APP_STORE_URL, PLAY_STORE_URL } from "./landing/links";

const columns: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "Features", href: "/#features" },
      { label: "For brands", href: "/#brands" },
      { label: "Marketplace", href: "/marketplace" },
    ],
  },
  {
    title: "Legal & safety",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Child Safety Standards", href: "/child-safety-standards" },
      { label: "Account Deletion", href: "/account-deletion" },
    ],
  },
  {
    title: "Get the app",
    links: [
      { label: "Google Play", href: PLAY_STORE_URL, external: true },
      { label: "App Store", href: APP_STORE_URL, external: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-rus-ink text-white">
      <div className="pointer-events-none absolute -z-10 -top-40 left-[10%] size-[520px] rounded-full bg-rus-pink/15 blur-[140px]" />
      <div className="pointer-events-none absolute -z-10 top-10 right-[5%] size-[480px] rounded-full bg-rus-cyan/10 blur-[140px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-rus-pink),var(--color-rus-indigo),var(--color-rus-cyan),transparent)] opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="col-span-2 lg:col-span-1 max-w-sm">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <Image src="/logo-192.webp" alt="RUS Logo" width={44} height={44} className="transition-transform group-hover:rotate-6" />
              <span className="text-2xl font-extrabold tracking-tight">RUS</span>
            </Link>
            <p className="mt-5 text-[15px] leading-relaxed text-white/60">
              The speed marketing platform. Monetize your status, shop verified merchant stores, and put your brand in
              front of real people.
            </p>
            <a
              href="mailto:support@renturstatus.com"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:border-rus-pink/50 hover:text-white"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4z M4 7l8 6 8-6" />
              </svg>
              support@renturstatus.com
            </a>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">{col.title}</h2>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 text-[15px] text-white/75 hover:text-white"
                      >
                        {l.label}
                        <span className="text-white/35 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rus-cyan">
                          ↗
                        </span>
                      </a>
                    ) : (
                      <Link href={l.href} className="text-[15px] text-white/75 hover:text-white">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col-reverse gap-4 border-t border-white/10 pt-8 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} RUS Limited. All rights reserved.
          </p>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/70">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-rus-pink opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-rus-pink" />
            </span>
            Marketplace live on web · Full web app coming soon
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FooterWordmark />
      </div>
    </footer>
  );
}
