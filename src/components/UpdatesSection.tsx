'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Link from 'next/link';
import { MdPlayCircle, MdTheaters, MdQuiz, MdShoppingBag, MdChevronRight } from 'react-icons/md';

export default function UpdatesSection() {
  const { ref, isVisible } = useScrollAnimation();

  const updates = [
    {
      id: 1,
      type: 'video',
      icon: MdPlayCircle,
      title: '영상',
      description: '베를린 필의 교향곡 40번 신규 녹화 영상',
      date: '2025.11.05',
      badge: 'NEW',
      color: 'red',
      link: '/video',
    },
    {
      id: 2,
      type: 'concert',
      icon: MdTheaters,
      title: '공연',
      description: '12월 모차르트 피아노 협주곡의 밤 예매 시작',
      date: '2025.11.01',
      badge: 'HOT',
      color: 'purple',
      link: '/concert',
    },
    {
      id: 3,
      type: 'quiz',
      icon: MdQuiz,
      title: '퀴즈',
      description: '모차르트 오페라 고급 퀴즈 20문항 추가',
      date: '2025.10.28',
      badge: 'UPDATE',
      color: 'blue',
      link: '/quiz',
    },
    {
      id: 4,
      type: 'goods',
      icon: MdShoppingBag,
      title: '굿즈',
      description: '한정판 모차르트 핸드메이드 머그컵 입고',
      date: '2025.10.25',
      badge: 'SALE',
      color: 'green',
      link: '/goods',
    },
  ];

  const colorClasses = {
    red: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: 'text-red-600',
      badge: 'bg-red-500',
      hover: 'hover:border-red-300',
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      icon: 'text-purple-600',
      badge: 'bg-purple-500',
      hover: 'hover:border-purple-300',
    },
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'text-blue-600',
      badge: 'bg-blue-500',
      hover: 'hover:border-blue-300',
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: 'text-green-600',
      badge: 'bg-green-500',
      hover: 'hover:border-green-300',
    },
  };

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
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-white text-gray-700 rounded-full font-sans text-sm font-semibold mb-4 shadow-sm">
              Latest Updates
            </span>
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              최신 소식
            </h2>
            <p className="font-sans text-xl text-gray-600 max-w-3xl mx-auto">
              영상, 공연, 퀴즈, 굿즈의 새로운 소식을 확인하세요.
              <br />
              매주 업데이트되는 다양한 모차르트 콘텐츠를 만나보세요.
            </p>
          </div>

          {/* Updates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {updates.map((update, index) => {
              const colors = colorClasses[update.color as keyof typeof colorClasses];
              const IconComponent = update.icon;

              return (
                <Link
                  key={update.id}
                  href={update.link}
                  className={`group relative ${colors.bg} rounded-2xl p-8 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${colors.border} ${colors.hover} hover:-translate-y-2 overflow-hidden`}
                  style={{
                    transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                  }}
                >
                  {/* Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 ${colors.badge} text-white rounded-full font-sans text-xs font-bold shadow-sm`}>
                    {update.badge}
                  </div>

                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`w-16 h-16 ${colors.icon} flex items-center justify-center`}>
                      <IconComponent className="w-full h-full" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-6">
                    <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">
                      {update.title}
                    </h3>
                    <p className="font-sans text-sm text-gray-700 leading-relaxed mb-3">
                      {update.description}
                    </p>
                    <p className="font-sans text-xs text-gray-500">
                      {update.date}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                    자세히 보기
                    <MdChevronRight className="h-5 w-5 ml-1 transform group-hover:translate-x-2 transition-transform duration-300" />
                  </div>

                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 ${colors.badge} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
