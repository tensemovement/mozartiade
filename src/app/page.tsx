import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import CatalogSection from '@/components/CatalogSection';
import TimelineSection from '@/components/TimelineSection';
import PortraitGallerySection from '@/components/PortraitGallerySection';
import FeaturedWorksSection from '@/components/FeaturedWorksSection';
import EventsNewsSection from '@/components/EventsNewsSection';
import AdBannerSection from '@/components/AdBannerSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="overflow-x-hidden">
        <HeroSection />
        <CatalogSection />
        <TimelineSection />
        <PortraitGallerySection />
        <FeaturedWorksSection />
        <EventsNewsSection />
        <AdBannerSection />
      </main>
      <Footer />
    </>
  );
}
