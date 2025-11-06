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
              각 시기의 주요 작품과 역사적 사건을 시간순으로 탐험하세요.
            </p>
          </div>

          {/* Timeline */}
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Center Timeline Line - More elegant */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 hidden md:block">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-400 to-transparent"></div>
                <div className="absolute inset-0 bg-primary-300 opacity-60"></div>
              </div>

              {/* Timeline Events */}
              <div className="space-y-12">
                {timelineEvents.map((event, index) => (
                  <div
                    key={event.year}
                    className="relative"
                    style={{
                      transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                    }}
                  >
                    {/* Center Timeline Dot - More refined */}
                    <div className="absolute left-1/2 top-6 transform -translate-x-1/2 -translate-y-1/2 hidden md:block z-10">
                      <div className="relative">
                        <div
                          className={`w-4 h-4 rounded-full ${
                            event.highlight
                              ? 'bg-primary-500 shadow-lg shadow-primary-300'
                              : 'bg-gray-300 shadow-md'
                          }`}
                        ></div>
                        {event.highlight && (
                          <div className="absolute inset-0 rounded-full bg-primary-500 animate-ping opacity-75"></div>
                        )}
                      </div>
                    </div>

                    {/* Left/Right Content - Smaller cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      {index % 2 === 0 ? (
                        <>
                          {/* Left Side - Content */}
                          <div className="md:text-right md:pr-8">
                            <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-primary-200 inline-block w-full md:ml-auto">
                              <div className={`inline-block px-3 py-1 mb-2 rounded-full font-sans text-xs font-bold ${
                                event.highlight
                                  ? 'bg-primary-500 text-white'
                                  : 'bg-gray-100 text-gray-700'
                              }`}>
                                {event.year}
                              </div>
                              <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">
                                {event.title}
                              </h3>
                              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                                {event.description}
                              </p>
                            </div>
                          </div>

                          {/* Right Side - Image */}
                          <div className="md:pl-8">
                            <div className="relative w-36 h-36 mx-auto md:mx-0 rounded-xl overflow-hidden shadow-lg ring-2 ring-gray-200 group">
                              <Image
                                src={event.image}
                                alt={`Mozart ${event.year}`}
                                fill
                                className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                                sizes="144px"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Left Side - Image */}
                          <div className="md:pr-8 order-2 md:order-1">
                            <div className="relative w-36 h-36 mx-auto md:ml-auto md:mr-0 rounded-xl overflow-hidden shadow-lg ring-2 ring-gray-200 group">
                              <Image
                                src={event.image}
                                alt={`Mozart ${event.year}`}
                                fill
                                className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                                sizes="144px"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                          </div>

                          {/* Right Side - Content */}
                          <div className="md:pl-8 order-1 md:order-2">
                            <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-primary-200">
                              <div className={`inline-block px-3 py-1 mb-2 rounded-full font-sans text-xs font-bold ${
                                event.highlight
                                  ? 'bg-primary-500 text-white'
                                  : 'bg-gray-100 text-gray-700'
                              }`}>
                                {event.year}
                              </div>
                              <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">
                                {event.title}
                              </h3>
                              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                                {event.description}
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <button className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-xl font-sans text-lg font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl group">
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
