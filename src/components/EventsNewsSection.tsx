'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { MdChevronRight, MdCalendarToday, MdLocationOn } from 'react-icons/md';
import Image from 'next/image';

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
      image: '/images/m/mozart001.jpg',
    },
    {
      id: 2,
      type: 'exhibition',
      title: '모차르트 필사본 특별전',
      date: '2025.11.15 - 12.31',
      location: '국립중앙박물관',
      description: '오스트리아에서 온 귀중한 자필 악보',
      featured: false,
      image: '/images/m/mozart002.jpg',
    },
    {
      id: 3,
      type: 'lecture',
      title: '모차르트 오페라 해설 강좌',
      date: '매주 토요일',
      location: '온라인',
      description: '전문가와 함께하는 오페라 심화 과정',
      featured: false,
      image: '/images/m/mozart003.jpg',
    },
  ];

  const news = [
    {
      id: 1,
      category: '업데이트',
      title: 'K.625 작품 신규 음원 추가',
      date: '2025.11.01',
      excerpt: '베를린 필하모닉 오케스트라의 최신 녹음본 업데이트',
      image: '/images/m/mozart004.jpg',
    },
    {
      id: 2,
      category: '연구',
      title: '모차르트 미완성 작품 새로운 발견',
      date: '2025.10.28',
      excerpt: '빈 도서관에서 발견된 교향곡 스케치',
      image: '/images/m/mozart005.jpg',
    },
    {
      id: 3,
      category: '공지',
      title: '모바일 앱 베타 출시',
      date: '2025.10.20',
      excerpt: 'iOS/Android에서 모차르트 카탈로그 이용 가능',
      image: '/images/m/mozart006.jpg',
    },
  ];

  return (
    <section className="py-24 bg-primary-50">
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
            <span className="inline-block px-4 py-2 bg-white text-primary-700 rounded-full font-sans text-sm font-semibold mb-4 shadow-sm">
              What&apos;s New
            </span>
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              이벤트 & 소식
            </h2>
            <p className="font-sans text-xl text-gray-600 max-w-3xl mx-auto">
              모차르트 관련 최신 공연, 전시, 강좌 정보와
              <br />
              포털 업데이트 소식을 확인하세요.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Events */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-serif text-3xl font-bold text-gray-900">
                  이벤트
                </h3>
                <button className="font-sans text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors inline-flex items-center gap-1">
                  전체보기
                  <MdChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-6">
                {events.map((event, index) => (
                  <div
                    key={event.id}
                    className={`group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 flex flex-col h-[340px] ${
                      event.featured
                        ? 'border-2 border-primary-300'
                        : 'border border-gray-200'
                    }`}
                  >
                    {/* Image Header */}
                    <div className="relative h-44 overflow-hidden flex-shrink-0">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent"></div>

                      {/* Featured Badge */}
                      {event.featured && (
                        <div className="absolute top-4 left-4 px-3 py-1 bg-primary-500 text-white rounded-full font-sans text-xs font-bold shadow-lg">
                          추천 이벤트
                        </div>
                      )}

                      {/* Title on Image */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h4 className="font-serif text-xl md:text-2xl font-bold text-white drop-shadow-lg line-clamp-2">
                          {event.title}
                        </h4>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <p className="font-sans text-sm text-gray-600 mb-4 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center text-gray-600">
                          <MdCalendarToday className="h-4 w-4 mr-1 flex-shrink-0" />
                          <span className="truncate">{event.date}</span>
                        </span>
                        <span className="flex items-center text-gray-600">
                          <MdLocationOn className="h-4 w-4 mr-1 flex-shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* News */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-serif text-3xl font-bold text-gray-900">
                  최신 소식
                </h3>
                <button className="font-sans text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors inline-flex items-center gap-1">
                  전체보기
                  <MdChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-6">
                {news.map((item, index) => (
                  <div
                    key={item.id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 border border-gray-200 flex flex-col h-[340px]"
                  >
                    {/* Image Header */}
                    <div className="relative h-44 overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-transparent"></div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 px-3 py-1 bg-primary-100/90 backdrop-blur-sm text-primary-700 rounded-full font-sans text-xs font-bold shadow-sm">
                        {item.category}
                      </div>

                      {/* Date */}
                      <div className="absolute bottom-4 left-4 text-sm text-white/90 font-sans font-semibold drop-shadow">
                        {item.date}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h4 className="font-serif text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="font-sans text-sm text-gray-600 line-clamp-3">
                        {item.excerpt}
                      </p>
                    </div>
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
