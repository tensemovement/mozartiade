'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function HeroSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-cream via-ivory to-primary-50">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-200/30 rounded-full blur-3xl"></div>
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
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md mb-8">
            <span className="text-primary-800 font-sans text-sm font-medium">
              🎼 Wolfgang Amadeus Mozart Complete Archive
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold text-primary-900 mb-6 leading-tight">
            모차르트의 모든 것,
            <br />
            <span className="text-primary-700">한 곳에서</span>
          </h1>

          {/* Subheading */}
          <p className="font-sans text-xl md:text-2xl text-primary-800 mb-12 max-w-3xl mx-auto leading-relaxed">
            626개 작품의 완전한 Köchel 카탈로그와 연대기,
            <br />
            악보·음원·영상·해설까지 모두 탐색하세요
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="w-full sm:w-auto px-8 py-4 bg-primary-800 text-white rounded-xl font-sans text-lg font-semibold hover:bg-primary-900 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
              카탈로그 탐색하기
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-primary-900 rounded-xl font-sans text-lg font-semibold hover:bg-primary-50 transition-all duration-300 shadow-md hover:shadow-lg border-2 border-primary-200">
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
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
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
          className="h-6 w-6 text-primary-700"
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
