'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Link from 'next/link';
import { MdChevronRight, MdMusicNote } from 'react-icons/md';

export default function AboutHeroSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-800">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-30"></div>

      <div
        ref={ref}
        className={`relative z-10 container mx-auto px-4 text-center transition-all duration-1000 ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg mb-8">
            <MdMusicNote className="h-4 w-4 text-primary-800 mr-2" />
            <span className="text-primary-800 font-sans text-sm font-medium">
              About Mozartiade
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
            모차르티아데 포털
          </h1>

          {/* Subheading */}
          <p className="font-sans text-xl md:text-2xl text-white/95 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            볼프강 아마데우스 모차르트의 626개 작품과 생애를
            <br className="hidden md:inline" />
            디지털 아카이브로 체계적으로 정리하고 공유합니다
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/works"
              className="inline-flex items-center w-full sm:w-auto px-8 py-4 bg-white text-primary-900 rounded-xl font-sans text-lg font-semibold hover:bg-cream transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 group"
            >
              작품 카탈로그 탐색
              <MdChevronRight className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/chronology"
              className="inline-flex items-center w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-xl font-sans text-lg font-semibold hover:bg-white/20 transition-all duration-300 shadow-lg border-2 border-white/30 hover:border-white/50"
            >
              연대기 보기
            </Link>
          </div>

          {/* Key Numbers */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16">
            {[
              { number: '626', label: '등재 작품' },
              { number: '35+', label: '장르 분류' },
              { number: '1756', label: '탄생년도' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-serif text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                  {stat.number}
                </div>
                <div className="font-sans text-sm text-white/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
