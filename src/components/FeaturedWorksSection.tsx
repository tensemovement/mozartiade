'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { worksData } from '@/data/works';
import Image from 'next/image';

export default function FeaturedWorksSection() {
  const { ref, isVisible } = useScrollAnimation();

  // Get featured works from worksData
  const featuredWorks = worksData
    .filter(work => work.highlight)
    .slice(0, 6)
    .map(work => ({
      id: work.catalogNumber || work.id,
      title: work.title,
      titleKr: work.title,
      titleEn: work.titleEn,
      year: work.year.toString(),
      genre: work.genre || '',
      description: work.description,
      popular: work.highlight,
      bgImage: work.image,
    }));

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-white text-gray-700 rounded-full font-sans text-sm font-semibold mb-4 shadow-sm">
              Masterpieces
            </span>
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              대표 작품
            </h2>
            <p className="font-sans text-xl text-gray-600 max-w-3xl mx-auto">
              모차르트의 가장 유명하고 사랑받는 작품들.
              <br />
              각 작품의 악보, 음원, 해설을 한눈에 확인하세요.
            </p>
          </div>

          {/* Works Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredWorks.map((work, index) => (
              <div
                key={work.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer hover:-translate-y-2 border border-gray-100"
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                }}
              >
                {/* Header with K number */}
                <div className="relative h-32 bg-gray-100 flex items-center justify-center overflow-hidden">
                  {work.bgImage && (
                    <Image
                      src={work.bgImage}
                      alt={work.titleKr}
                      fill
                      className="object-cover opacity-30"
                    />
                  )}
                  <div className="relative text-center z-10">
                    <div className="font-serif text-4xl font-bold text-gray-900 mb-1 drop-shadow-sm">
                      {work.id}
                    </div>
                    <div className="text-sm font-sans text-gray-800 font-semibold drop-shadow-sm">
                      {work.year}
                    </div>
                  </div>
                  {work.popular && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-primary-600 text-white rounded-full font-sans text-xs font-bold z-10">
                      인기
                    </div>
                  )}
                  {/* Genre badge */}
                  <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full font-sans text-xs font-semibold z-10">
                    {work.genre}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
                    {work.titleKr}
                  </h3>
                  {work.titleEn && (
                    <p className="font-sans text-sm text-gray-500 mb-3 italic">
                      {work.titleEn}
                    </p>
                  )}
                  <p className="font-sans text-sm text-gray-600 mb-6">
                    {work.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-sans text-sm font-semibold transition-colors">
                      악보
                    </button>
                    <button className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-sans text-sm font-semibold transition-colors">
                      음원
                    </button>
                    <button className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-sans text-sm font-semibold transition-colors">
                      해설
                    </button>
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="h-1 bg-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <button className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-xl font-sans text-lg font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl group">
              더 많은 작품 보기
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
