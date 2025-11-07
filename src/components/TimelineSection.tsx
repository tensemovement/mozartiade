'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Image from 'next/image';
import Link from 'next/link';

export default function TimelineSection() {
  const { ref, isVisible } = useScrollAnimation();

  const timelineEvents = [
    {
      year: '1756',
      month: '01',
      day: '27',
      title: '탄생',
      description: '잘츠부르크에서 레오폴트 모차르트와 안나 마리아 페르틀의 아들로 태어남',
      highlight: true,
      image: '/images/m/mozart001.jpg',
    },
    {
      year: '1762',
      month: '01',
      title: '첫 공개 연주',
      description: '6세 때 뮌헨과 빈에서 신동으로 연주하며 명성을 얻기 시작',
      highlight: false,
      image: '/images/m/mozart004.jpg',
    },
    {
      year: '1770',
      title: '미트리다테 초연',
      description: '14세 때 작곡한 첫 오페라 세리아, 밀라노에서 대성공',
      highlight: true,
      image: '/images/m/mozart002.jpg',
    },
    {
      year: '1781',
      month: '03',
      title: '빈으로 이주',
      description: '대주교와 결별하고 빈으로 이주, 자유 음악가로 독립',
      highlight: true,
      image: '/images/m/mozart005.jpg',
    },
    {
      year: '1786',
      month: '05',
      day: '01',
      title: '피가로의 결혼',
      description: '빈에서 초연된 오페라 부파의 최고봉',
      highlight: true,
      image: '/images/m/mozart007.jpg',
    },
    {
      year: '1791',
      month: '12',
      day: '05',
      title: '빈에서 별세',
      description: '35세의 나이로 레퀴엠 작곡 중 사망',
      highlight: true,
      image: '/images/m/mozart006.jpg',
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
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
              Life & Works
            </span>
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              모차르트의 생애 연대기
            </h2>
            <p className="font-sans text-xl text-gray-600 max-w-3xl mx-auto">
              1756년부터 1791년까지, 35년간의 짧지만 찬란했던 생애.
              <br />
              주요 작품과 역사적 사건을 시간순으로 탐험하세요.
            </p>
          </div>

          {/* Timeline */}
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-32 top-0 bottom-0 w-px bg-gray-300"></div>

              {/* Timeline items */}
              <div className="space-y-6">
                {timelineEvents.map((item, index) => (
                  <div
                    key={item.year + item.title}
                    className="relative flex items-start gap-4 group"
                    style={{
                      transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                    }}
                  >
                    {/* Date column */}
                    <div className="w-32 flex-shrink-0 text-right pr-6">
                      <div className="text-gray-900 font-serif text-xl font-bold mb-1">
                        {item.year}
                      </div>
                      {item.month && (
                        <div className="text-gray-600 font-mono text-xs">
                          {item.month}
                          {item.day && `.${item.day}`}
                        </div>
                      )}
                    </div>

                    {/* Dot on line */}
                    <div className="absolute left-32 top-6 -translate-x-1/2 z-10">
                      <div className={`w-3 h-3 rounded-full transition-all ${
                        item.highlight
                          ? 'bg-secondary-600 shadow-lg shadow-secondary-300 animate-pulse'
                          : 'bg-gray-400'
                      }`}></div>
                    </div>

                    {/* Card */}
                    <div className="flex-1 pl-4">
                      <div className="relative bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 hover:border-secondary-200">
                        {/* Highlight accent border */}
                        {item.highlight && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-secondary-600 to-secondary-400"></div>
                        )}

                        <div className="flex gap-3">
                          {/* Content */}
                          <div className={`flex-1 p-4 ${item.highlight ? 'pl-5' : ''}`}>
                            {/* Title */}
                            <h3 className="font-serif text-lg font-bold text-gray-900 mb-1">
                              {item.title}
                            </h3>

                            {/* Description */}
                            <p className="font-sans text-xs text-gray-600 leading-relaxed">
                              {item.description}
                            </p>
                          </div>

                          {/* Image */}
                          {item.image && (
                            <div className="w-20 h-20 flex-shrink-0 my-4 mr-4 relative rounded-lg overflow-hidden">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover"
                                sizes="80px"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Link
              href="/chronology"
              className="inline-flex items-center px-8 py-4 bg-primary-900 text-white rounded-xl font-sans text-lg font-semibold hover:bg-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              전체 연대기 탐색
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
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
