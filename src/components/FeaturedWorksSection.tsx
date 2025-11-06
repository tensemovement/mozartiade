'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function FeaturedWorksSection() {
  const { ref, isVisible } = useScrollAnimation();

  const featuredWorks = [
    {
      id: 'K626',
      title: 'Requiem in D minor',
      titleKr: '레퀴엠 D단조',
      year: '1791',
      genre: '성악',
      image: '🎼',
      description: '미완성의 마지막 걸작',
      popular: true,
    },
    {
      id: 'K525',
      title: 'Eine kleine Nachtmusik',
      titleKr: '아이네 클라이네 나흐트무지크',
      year: '1787',
      genre: '세레나데',
      image: '🌙',
      description: '가장 사랑받는 세레나데',
      popular: true,
    },
    {
      id: 'K492',
      title: 'Le nozze di Figaro',
      titleKr: '피가로의 결혼',
      year: '1786',
      genre: '오페라',
      image: '🎭',
      description: '오페라 부파의 정점',
      popular: true,
    },
    {
      id: 'K551',
      title: 'Symphony No. 41 "Jupiter"',
      titleKr: '교향곡 41번 "주피터"',
      year: '1788',
      genre: '교향곡',
      image: '⚡',
      description: '교향곡의 완성',
      popular: false,
    },
    {
      id: 'K466',
      title: 'Piano Concerto No. 20',
      titleKr: '피아노 협주곡 20번',
      year: '1785',
      genre: '협주곡',
      image: '🎹',
      description: '극적인 단조 협주곡',
      popular: false,
    },
    {
      id: 'K620',
      title: 'Die Zauberflöte',
      titleKr: '마술피리',
      year: '1791',
      genre: '오페라',
      image: '🪈',
      description: '환상적인 징슈필',
      popular: true,
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
            <span className="inline-block px-4 py-2 bg-accent-100 text-accent-900 rounded-full font-sans text-sm font-semibold mb-4">
              Masterpieces
            </span>
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-primary-900 mb-6">
              대표 작품
            </h2>
            <p className="font-sans text-xl text-primary-700 max-w-3xl mx-auto">
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
                className="group bg-gradient-to-br from-cream to-ivory rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-2 border border-primary-100"
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                }}
              >
                {/* Image/Icon Area */}
                <div className="relative h-48 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center overflow-hidden">
                  <div className="text-8xl transform group-hover:scale-110 transition-transform duration-500">
                    {work.image}
                  </div>
                  {work.popular && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-primary-800 text-white rounded-full font-sans text-xs font-bold">
                      인기
                    </div>
                  )}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-primary-900 rounded-full font-sans text-xs font-bold">
                    {work.id}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-sans font-semibold text-secondary-700">
                      {work.genre}
                    </span>
                    <span className="text-sm font-sans text-primary-600">
                      {work.year}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-primary-900 mb-2 group-hover:text-primary-700 transition-colors">
                    {work.titleKr}
                  </h3>
                  <p className="font-sans text-sm text-primary-700 mb-4 italic">
                    {work.title}
                  </p>
                  <p className="font-sans text-sm text-primary-600 mb-6">
                    {work.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-primary-100 hover:bg-primary-200 text-primary-900 rounded-lg font-sans text-sm font-semibold transition-colors">
                      악보
                    </button>
                    <button className="flex-1 px-4 py-2 bg-secondary-100 hover:bg-secondary-200 text-secondary-900 rounded-lg font-sans text-sm font-semibold transition-colors">
                      음원
                    </button>
                    <button className="flex-1 px-4 py-2 bg-accent-100 hover:bg-accent-200 text-accent-900 rounded-lg font-sans text-sm font-semibold transition-colors">
                      해설
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <button className="inline-flex items-center px-8 py-4 bg-accent-800 text-white rounded-xl font-sans text-lg font-semibold hover:bg-accent-900 transition-all duration-300 shadow-lg hover:shadow-xl group">
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
