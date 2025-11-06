'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function CatalogSection() {
  const { ref, isVisible } = useScrollAnimation();

  const categories = [
    {
      id: 'K1-K99',
      title: '교향곡 & 관현악',
      count: 98,
    },
    {
      id: 'K100-K299',
      title: '협주곡',
      count: 156,
    },
    {
      id: 'K300-K499',
      title: '실내악',
      count: 142,
    },
    {
      id: 'K500-K626',
      title: '성악 & 오페라',
      count: 230,
    },
  ];

  return (
    <section className="py-24 bg-white">
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
            <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-sans text-sm font-semibold mb-4">
              Köchel Catalog
            </span>
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              완전한 작품 카탈로그
            </h2>
            <p className="font-sans text-xl text-gray-600 max-w-3xl mx-auto">
              Ludwig von Köchel이 집대성한 626개 작품의 완전한 목록.
              <br />
              각 작품의 상세 정보, 연주 가이드, 역사적 배경까지 모두 확인하세요.
            </p>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="group relative bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 hover:border-primary-300 hover:-translate-y-2 overflow-hidden"
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                }}
              >
                <div className="text-sm font-sans font-semibold text-primary-600 mb-3">
                  {category.id}
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">
                  {category.title}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="font-sans text-4xl font-bold text-gray-900">
                    {category.count}
                  </span>
                  <span className="font-sans text-sm text-gray-500">
                    작품
                  </span>
                </div>
                {/* Subtle accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <button className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-xl font-sans text-lg font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl group">
              전체 카탈로그 보기
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
