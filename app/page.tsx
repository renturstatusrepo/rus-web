import Header from "@/components/Header";
import ComingSoonHero from "@/components/ComingSoonHero";
import MobileAppCTA from "@/components/MobileAppCTA";
import WhatsComingWeb from "@/components/WhatsComingWeb";
import BrandStory from "@/components/BrandStory";
import WaitlistSection from "@/components/WaitlistSection";
import AppDownloadExperience from "@/components/AppDownloadExperience";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <ComingSoonHero />
        <MobileAppCTA />
        <WhatsComingWeb />
        <BrandStory />
        <WaitlistSection />
        <AppDownloadExperience />
      </main>
      <Footer />
    </div>
  );
}
