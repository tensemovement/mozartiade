'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Image from 'next/image';

export default function TimelineSection() {
  const { ref, isVisible } = useScrollAnimation();

  const timelineEvents = [
    {
      year: '1756',
      title: '탄생',
      description: '1월 27일, 잘츠부르크에서 태어남',
      highlight: true,
      image: '/images/m/mozart001.jpg',
    },
    {
      year: '1762',
      title: '첫 공개 연주',
      description: '6세, 뮌헨과 빈에서 연주',
      highlight: false,
      image: '/images/m/mozart004.jpg',
    },
    {
      year: '1769-1773',
      title: '이탈리아 여행',
      description: '오페라 작곡 시작, 유럽 명성 확립',
      highlight: false,
      image: '/images/m/mozart002.jpg',
    },
    {
      year: '1781',
      title: '빈 정착',
      description: '자유 음악가로 독립, 황금기 시작',
      highlight: true,
      image: '/images/m/mozart005.jpg',
    },
    {
      year: '1786',
      title: '피가로의 결혼',
      description: '오페라 부파의 걸작 초연',
      highlight: false,
      image: '/images/m/mozart007.jpg',
    },
    {
      year: '1791',
      title: '마지막 해',
      description: '레퀴엠 작곡 중 12월 5일 사망',
      highlight: true,
      image: '/images/m/mozart006.jpg',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-primary-50 to-secondary-50 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary-300 rounded-full blur-3xl"></div>
      </div>

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
            <span className="inline-block px-4 py-2 bg-secondary-100 text-secondary-900 rounded-full font-sans text-sm font-semibold mb-4">
              Life & Works
            </span>
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-primary-900 mb-6">
              모차르트의 생애 연대기
            </h2>
            <p className="font-sans text-xl text-primary-700 max-w-3xl mx-auto">
              1756년부터 1791년까지, 35년간의 짧지만 찬란했던 생애.
              <br />
              각 시기의 주요 작품과 역사적 사건을 시간순으로 탐험하세요.
            </p>
          </div>

          {/* Timeline */}
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-200 via-primary-300 to-primary-200 hidden md:block"></div>

              {/* Timeline Events */}
              <div className="space-y-16">
                {timelineEvents.map((event, index) => (
                  <div
                    key={event.year}
                    className={`relative flex flex-col md:flex-row items-center gap-8 ${
                      index % 2 === 0
                        ? 'md:flex-row'
                        : 'md:flex-row-reverse'
                    }`}
                    style={{
                      transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
                    }}
                  >
                    {/* Portrait Image */}
                    <div
                      className={`w-full md:w-5/12 ${
                        index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                      }`}
                    >
                      <div className="inline-block group">
                        <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white transform transition-all duration-500 hover:scale-110 hover:rotate-3">
                          <Image
                            src={event.image}
                            alt={`Mozart ${event.year}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 192px, 224px"
                          />
                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </div>
                    </div>

                    {/* Center Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center justify-center">
                      <div
                        className={`w-6 h-6 rounded-full ${
                          event.highlight
                            ? 'bg-primary-600 ring-8 ring-primary-200 shadow-lg'
                            : 'bg-primary-400 ring-8 ring-primary-100'
                        } transition-all duration-300 hover:scale-125`}
                      ></div>
                    </div>

                    {/* Content Card */}
                    <div
                      className={`w-full md:w-5/12 ${
                        index % 2 === 0 ? 'md:text-left' : 'md:text-right'
                      }`}
                    >
                      <div
                        className={`bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                          event.highlight
                            ? 'border-2 border-primary-400 ring-4 ring-primary-100'
                            : 'border border-primary-100'
                        } hover:-translate-y-2`}
                      >
                        <div
                          className={`inline-block px-4 py-2 ${
                            event.highlight
                              ? 'bg-primary-600 text-white'
                              : 'bg-primary-100 text-primary-800'
                          } rounded-full font-sans text-sm font-bold mb-4 shadow-md`}
                        >
                          {event.year}
                        </div>
                        <h3 className="font-serif text-3xl font-bold text-primary-900 mb-3">
                          {event.title}
                        </h3>
                        <p className="font-sans text-lg text-primary-700 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-20">
            <button className="inline-flex items-center px-8 py-4 bg-secondary-700 text-white rounded-xl font-sans text-lg font-semibold hover:bg-secondary-800 transition-all duration-300 shadow-lg hover:shadow-xl group">
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
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
