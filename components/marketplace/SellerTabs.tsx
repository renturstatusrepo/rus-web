"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/marketplace/sell", label: "Products", match: (p: string) => p === "/marketplace/sell" || p.startsWith("/marketplace/sell/products") },
  { href: "/marketplace/sell/orders", label: "Orders", match: (p: string) => p.startsWith("/marketplace/sell/orders") },
];

export default function SellerTabs() {
  const pathname = usePathname();
  return (
    <nav aria-label="Seller dashboard" className="mt-6 flex gap-1 border-b border-slate-200">
      {TABS.map((tab) => {
        const active = tab.match(pathname);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-bold ${
              active ? "border-purple-700 text-purple-700" : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
