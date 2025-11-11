import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import UnifiedWorksSection from '@/components/UnifiedWorksSection';
import TimelineSection from '@/components/TimelineSection';
import UpdatesSection from '@/components/UpdatesSection';
import EventsNewsSection from '@/components/EventsNewsSection';
import AdBannerSection from '@/components/AdBannerSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="overflow-x-hidden">
        <HeroSection />
        <UnifiedWorksSection />
        <TimelineSection />
        <UpdatesSection />
        <EventsNewsSection />
        <AdBannerSection />
      </main>
      <Footer />
    </>
  );
}
