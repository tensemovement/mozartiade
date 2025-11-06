'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Image from 'next/image';

export default function HeroSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Portrait with Duotone Effect */}
      <div className="absolute inset-0">
        <Image
          src="/images/m/mozart007.jpg"
          alt="Wolfgang Amadeus Mozart"
          fill
          priority
          className="object-cover object-center"
          quality={90}
        />
        {/* Duotone Overlay - Rose gradient matching our theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/85 via-primary-700/75 to-secondary-700/70 mix-blend-multiply"></div>
        {/* Additional gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"></div>
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-30"></div>
      </div>

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
            <span className="text-primary-800 font-sans text-sm font-medium">
              🎼 Wolfgang Amadeus Mozart Complete Archive
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
            모차르트의 모든 것,
            <br />
            <span className="text-cream">한 곳에서</span>
          </h1>

          {/* Subheading */}
          <p className="font-sans text-xl md:text-2xl text-white/95 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            626개 작품의 완전한 Köchel 카탈로그와 연대기,
            <br />
            악보·음원·영상·해설까지 모두 탐색하세요
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-primary-900 rounded-xl font-sans text-lg font-semibold hover:bg-cream transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
              카탈로그 탐색하기
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-xl font-sans text-lg font-semibold hover:bg-white/20 transition-all duration-300 shadow-lg border-2 border-white/30 hover:border-white/50">
              연대기 보기
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { number: '626', label: '등재 작품' },
              { number: '35+', label: '장르 분류' },
              { number: '1756', label: '탄생년도' },
              { number: '10,000+', label: '자료 페이지' },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-md rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="font-serif text-4xl font-bold text-primary-800 mb-2">
                  {stat.number}
                </div>
                <div className="font-sans text-sm text-primary-700">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white drop-shadow-lg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
