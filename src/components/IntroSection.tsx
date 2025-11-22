'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { MdLibraryMusic, MdTimeline, MdSchool, MdGroup } from 'react-icons/md';

export default function IntroSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const features = [
    {
      icon: MdLibraryMusic,
      title: '완전한 작품 카탈로그',
      description: 'Köchel 목록 기반 626개 작품의 체계적인 분류와 상세 정보',
      color: 'primary',
    },
    {
      icon: MdTimeline,
      title: '시간순 연대기',
      description: '모차르트의 생애와 작품을 시간의 흐름에 따라 탐색',
      color: 'secondary',
    },
    {
      icon: MdSchool,
      title: '풍부한 학습 자료',
      description: '악보, 음원, 영상, 해설 등 다양한 형식의 학습 콘텐츠',
      color: 'accent',
    },
    {
      icon: MdGroup,
      title: '커뮤니티 참여',
      description: '작품에 대한 감상과 의견을 공유하는 클래식 음악 애호가 공간',
      color: 'rose',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
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
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-800 rounded-full font-sans text-sm font-semibold mb-4">
              About Mozartiade Portal
            </span>
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              모차르트를 탐구하는
              <br />
              <span className="text-primary-700">가장 완전한 방법</span>
            </h2>
            <p className="font-sans text-xl text-gray-600 leading-relaxed">
              모차르티아데 포털은 볼프강 아마데우스 모차르트의 모든 작품과 생애를
              <br className="hidden md:inline" />
              체계적으로 정리하고 공유하는 디지털 아카이브입니다.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="bg-white rounded-3xl shadow-xl p-12 border border-gray-100">
              <h3 className="font-serif text-3xl font-bold text-gray-900 mb-6 text-center">
                우리의 미션
              </h3>
              <p className="font-sans text-lg text-gray-700 leading-relaxed text-center mb-8">
                18세기 천재 작곡가의 유산을 21세기 디지털 기술로 보존하고,
                <br className="hidden md:inline" />
                전 세계 음악 애호가들이 쉽게 접근하고 깊이 이해할 수 있도록 돕습니다.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="font-serif text-4xl font-bold text-primary-700 mb-2">
                    보존
                  </div>
                  <p className="font-sans text-sm text-gray-600">
                    체계적인 디지털 아카이빙
                  </p>
                </div>
                <div>
                  <div className="font-serif text-4xl font-bold text-secondary-700 mb-2">
                    공유
                  </div>
                  <p className="font-sans text-sm text-gray-600">
                    누구나 접근 가능한 플랫폼
                  </p>
                </div>
                <div>
                  <div className="font-serif text-4xl font-bold text-accent-700 mb-2">
                    교육
                  </div>
                  <p className="font-sans text-sm text-gray-600">
                    깊이 있는 학습 경험 제공
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const colorClasses = {
                primary: 'bg-primary-100 text-primary-700',
                secondary: 'bg-secondary-100 text-secondary-700',
                accent: 'bg-accent-100 text-accent-700',
                rose: 'bg-rose-100 text-rose-700',
              };

              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                >
                  <div
                    className={`inline-flex p-4 rounded-xl ${colorClasses[feature.color as keyof typeof colorClasses]} mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="font-sans text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-800 rounded-3xl p-12 md:p-16 text-white shadow-2xl">
            <div className="text-center mb-12">
              <h3 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                숫자로 보는 모차르티아데
              </h3>
              <p className="font-sans text-lg text-white/90">
                방대한 데이터와 콘텐츠를 한눈에
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '626', label: '등재 작품', suffix: '개' },
                { number: '35', label: '생애 연도', suffix: '년' },
                { number: '1,000+', label: '악보 페이지', suffix: '' },
                { number: '100+', label: '연주 영상', suffix: '편' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300"
                >
                  <div className="font-serif text-4xl md:text-5xl font-bold mb-2">
                    {stat.number}
                  </div>
                  <div className="font-sans text-sm text-white/90">
                    {stat.label}
                    {stat.suffix && <span className="ml-1">{stat.suffix}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
