'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Link from 'next/link';
import { MdLibraryMusic, MdTimeline, MdSchool, MdGroup, MdChevronRight } from 'react-icons/md';

export default function IntroSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const features = [
    {
      icon: MdLibraryMusic,
      title: '완전한 작품 카탈로그',
      description: 'Köchel 목록 기반 626개 작품',
    },
    {
      icon: MdTimeline,
      title: '시간순 연대기',
      description: '생애와 작품을 시간순으로',
    },
    {
      icon: MdSchool,
      title: '풍부한 학습 자료',
      description: '악보, 음원, 영상, 해설',
    },
    {
      icon: MdGroup,
      title: '커뮤니티',
      description: '감상과 의견 공유 공간',
    },
  ];

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
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              모차르트를 탐구하는
              <br />
              가장 완전한 방법
            </h2>
            <p className="font-sans text-lg text-gray-600 leading-relaxed">
              볼프강 아마데우스 모차르트의 모든 작품과 생애를 체계적으로 정리하고 공유하는 디지털 아카이브입니다.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200"
                >
                  <div className="inline-flex p-3 rounded-lg bg-primary-100 text-primary-700 mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="font-sans text-sm text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/works"
              className="inline-flex items-center px-8 py-4 bg-primary-900 text-white rounded-xl font-sans text-lg font-semibold hover:bg-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              전체 작품 카탈로그 탐색하기
              <MdChevronRight className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
