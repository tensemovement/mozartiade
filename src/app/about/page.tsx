import Navigation from '@/components/Navigation';
import AboutHeroSection from '@/components/AboutHeroSection';
import IntroSection from '@/components/IntroSection';
import AboutContentSection from '@/components/AboutContentSection';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'About - Mozartiade Portal',
  description: '모차르티아데 포털은 볼프강 아마데우스 모차르트의 모든 작품과 생애를 체계적으로 정리하고 공유하는 디지털 아카이브입니다.',
};

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="overflow-x-hidden">
        <AboutHeroSection />
        <IntroSection />
        <AboutContentSection />
      </main>
      <Footer />
    </>
  );
}
