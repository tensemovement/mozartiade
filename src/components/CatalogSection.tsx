'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function CatalogSection() {
  const { ref, isVisible } = useScrollAnimation();

  const categories = [
    {
      id: 'K1-K99',
      title: '교향곡 & 관현악',
      count: 98,
      icon: '🎺',
      color: 'primary',
    },
    {
      id: 'K100-K299',
      title: '협주곡',
      count: 156,
      icon: '🎹',
      color: 'secondary',
    },
    {
      id: 'K300-K499',
      title: '실내악',
      count: 142,
      icon: '🎻',
      color: 'accent',
    },
    {
      id: 'K500-K626',
      title: '성악 & 오페라',
      count: 230,
      icon: '🎭',
      color: 'primary',
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
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-800 rounded-full font-sans text-sm font-semibold mb-4">
              Köchel Catalog
            </span>
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-primary-900 mb-6">
              완전한 작품 카탈로그
            </h2>
            <p className="font-sans text-xl text-primary-700 max-w-3xl mx-auto">
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
                className={`group relative bg-gradient-to-br from-${category.color}-50 to-${category.color}-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-${category.color}-200 hover:border-${category.color}-400 hover:-translate-y-2`}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                }}
              >
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <div className="text-sm font-sans font-semibold text-primary-700 mb-2">
                  {category.id}
                </div>
                <h3 className="font-serif text-2xl font-bold text-primary-900 mb-3">
                  {category.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="font-sans text-3xl font-bold text-primary-800">
                    {category.count}
                  </span>
                  <span className="font-sans text-sm text-primary-600">
                    작품
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <button className="inline-flex items-center px-8 py-4 bg-primary-800 text-white rounded-xl font-sans text-lg font-semibold hover:bg-primary-900 transition-all duration-300 shadow-lg hover:shadow-xl group">
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
