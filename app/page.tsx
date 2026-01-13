import Header from "@/components/Header";
import LandingHero from "@/components/LandingHero";
import HeroStats from "@/components/HeroStats";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import EarningsEstimator from "@/components/EarningsEstimator";
import SocialProof from "@/components/SocialProof";
import FAQ from "@/components/FAQ";
import Stats from "@/components/Stats";
import BusinessHero from "@/components/BusinessHero";
import BusinessBenefits from "@/components/BusinessBenefits";
import BusinessComparison from "@/components/BusinessComparison";
import BusinessEstimator from "@/components/BusinessEstimator";
import BusinessCTA from "@/components/BusinessCTA";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">
        {/* Landing Page Hero Section */}
        <LandingHero />
        <HeroStats />
        
        {/* Benefits for Users Section */}
        <section id="for-users" className="w-full max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20 flex flex-col gap-12 py-12 scroll-mt-20">
          <Hero />
          <Features />
          <EarningsEstimator />
          <SocialProof />
          <Stats />
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="scroll-mt-20">
          <div className="w-full max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20 py-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-extrabold text-neutral-dark mb-4">
                How It Works
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Simple steps to start earning or advertising with RUS
              </p>
            </div>
          </div>
        </section>

        {/* Benefits for Business Section */}
        <section id="for-business" className="scroll-mt-20">
          <BusinessHero />
          <BusinessBenefits />
          <BusinessComparison />
          <BusinessEstimator />
          <BusinessCTA />
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="scroll-mt-20">
          <Testimonials />
        </section>

        {/* FAQ Section */}
        <section id="faq" className="scroll-mt-20">
          <div className="w-full max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20 py-12">
            <FAQ />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
