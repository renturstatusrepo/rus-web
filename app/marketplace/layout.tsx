import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MarketplaceNav from "@/components/marketplace/MarketplaceNav";

export const metadata: Metadata = {
  title: {
    default: "RUS Marketplace – Shop from Nigerian sellers",
    template: "%s | RUS Marketplace",
  },
  description:
    "Browse electronics, fashion, beauty, books and made-in-Nigeria products from verified sellers on the RUS marketplace.",
};

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-slate-50">
      <Header />
      <MarketplaceNav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
