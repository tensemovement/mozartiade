'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function EventsNewsSection() {
  const { ref, isVisible } = useScrollAnimation();

  const events = [
    {
      id: 1,
      type: 'concert',
      title: '모차르트 피아노 협주곡의 밤',
      date: '2025.12.05',
      location: '세종문화회관',
      description: '모차르트 서거 234주년 기념 공연',
      featured: true,
    },
    {
      id: 2,
      type: 'exhibition',
      title: '모차르트 필사본 특별전',
      date: '2025.11.15 - 12.31',
      location: '국립중앙박물관',
      description: '오스트리아에서 온 귀중한 자필 악보',
      featured: false,
    },
    {
      id: 3,
      type: 'lecture',
      title: '모차르트 오페라 해설 강좌',
      date: '매주 토요일',
      location: '온라인',
      description: '전문가와 함께하는 오페라 심화 과정',
      featured: false,
    },
  ];

  const news = [
    {
      id: 1,
      category: '업데이트',
      title: 'K.625 작품 신규 음원 추가',
      date: '2025.11.01',
      excerpt: '베를린 필하모닉 오케스트라의 최신 녹음본 업데이트',
    },
    {
      id: 2,
      category: '연구',
      title: '모차르트 미완성 작품 새로운 발견',
      date: '2025.10.28',
      excerpt: '빈 도서관에서 발견된 교향곡 스케치',
    },
    {
      id: 3,
      category: '공지',
      title: '모바일 앱 베타 출시',
      date: '2025.10.20',
      excerpt: 'iOS/Android에서 모차르트 카탈로그 이용 가능',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-secondary-50 to-accent-50">
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
              What&apos;s New
            </span>
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-primary-900 mb-6">
              이벤트 & 소식
            </h2>
            <p className="font-sans text-xl text-primary-700 max-w-3xl mx-auto">
              모차르트 관련 최신 공연, 전시, 강좌 정보와
              <br />
              포털 업데이트 소식을 확인하세요.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Events */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-serif text-3xl font-bold text-primary-900">
                  🎪 이벤트
                </h3>
                <button className="font-sans text-sm font-semibold text-primary-700 hover:text-primary-900 transition-colors">
                  전체보기 →
                </button>
              </div>

              <div className="space-y-6">
                {events.map((event, index) => (
                  <div
                    key={event.id}
                    className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 ${
                      event.featured
                        ? 'border-2 border-secondary-400'
                        : 'border border-primary-100'
                    }`}
                    style={{
                      transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                    }}
                  >
                    {event.featured && (
                      <div className="inline-block px-3 py-1 bg-secondary-800 text-white rounded-full font-sans text-xs font-bold mb-3">
                        추천 이벤트
                      </div>
                    )}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-serif text-xl font-bold text-primary-900 mb-2">
                          {event.title}
                        </h4>
                        <p className="font-sans text-sm text-primary-700 mb-2">
                          {event.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center text-primary-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {event.date}
                      </span>
                      <span className="flex items-center text-primary-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {event.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* News */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-serif text-3xl font-bold text-primary-900">
                  📰 최신 소식
                </h3>
                <button className="font-sans text-sm font-semibold text-primary-700 hover:text-primary-900 transition-colors">
                  전체보기 →
                </button>
              </div>

              <div className="space-y-6">
                {news.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 border border-primary-100"
                    style={{
                      transitionDelay: isVisible
                        ? `${(index + 3) * 100}ms`
                        : '0ms',
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-accent-100 text-accent-900 rounded-full font-sans text-xs font-bold">
                        {item.category}
                      </span>
                      <span className="text-sm text-primary-600 font-sans">
                        {item.date}
                      </span>
                    </div>
                    <h4 className="font-serif text-xl font-bold text-primary-900 mb-2">
                      {item.title}
                    </h4>
                    <p className="font-sans text-sm text-primary-700">
                      {item.excerpt}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
