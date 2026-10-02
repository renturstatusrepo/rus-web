import type { Metadata } from "next";
import LandingNav from "@/components/landing/LandingNav";
import Hero from "@/components/landing/Hero";
import Marquee from "@/components/landing/Marquee";
import HowItWorks from "@/components/landing/HowItWorks";
import Pillars from "@/components/landing/Pillars";
import FeaturedProducts from "@/components/landing/FeaturedProducts";
import BrandsSection from "@/components/landing/BrandsSection";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/Footer";
import { getCatalog } from "@/lib/marketplace";

export const metadata: Metadata = {
  title: "RUS: Get Paid for Your Status | Speed Marketing Platform",
  description:
    "Post brand campaigns to your status, earn for every verified view and withdraw to your bank. Brands reach real people fast. Shop the RUS Marketplace on the web, or download the app on Android & iOS.",
};

export default async function Home() {
  // Newest listings that have a photo; the section hides itself if the API is unreachable
  const { items } = await getCatalog({});
  const featured = items.filter((p) => p.image).slice(0, 10);

  return (
    <div className="landing-root relative flex min-h-screen w-full flex-col bg-rus-ink overflow-x-hidden">
      <noscript>
        <style>{"[data-intro]{visibility:visible}"}</style>
      </noscript>
      <LandingNav />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <HowItWorks />
        <Pillars />
        <FeaturedProducts products={featured} />
        <BrandsSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
