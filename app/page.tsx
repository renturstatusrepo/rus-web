import Header from "@/components/Header";
import ComingSoonHero from "@/components/ComingSoonHero";
import AppFeaturesPreview from "@/components/AppFeaturesPreview";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      <Header />
      <main className="flex-1">
        <ComingSoonHero />
        <AppFeaturesPreview />
      </main>
      <Footer />
    </div>
  );
}
