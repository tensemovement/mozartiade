'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Link from 'next/link';
import Image from 'next/image';
import { MdPlayCircle, MdTheaters, MdQuiz, MdShoppingBag } from 'react-icons/md';

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
      image: '/images/m/mozart001.jpg',
      gradient: 'from-red-600/90 to-rose-600/90',
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
      image: '/images/m/mozart002.jpg',
      gradient: 'from-purple-600/90 to-indigo-600/90',
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
      image: '/images/m/mozart003.jpg',
      gradient: 'from-blue-600/90 to-cyan-600/90',
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
      image: '/images/m/mozart004.jpg',
      gradient: 'from-green-600/90 to-emerald-600/90',
      link: '/goods',
    },
  ];

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
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
              Latest Contents
            </span>
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              최신 콘텐츠 소식
            </h2>
            <p className="font-sans text-xl text-gray-600 max-w-3xl mx-auto">
              영상, 공연, 퀴즈, 굿즈의 새로운 소식을 확인하세요.
              <br />
              매주 업데이트되는 다양한 모차르트 콘텐츠를 만나보세요.
            </p>
          </div>

          {/* Overlapping Cards Grid */}
          <div className="relative max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
              {updates.map((update, index) => {
                const IconComponent = update.icon;

                // Staggered positioning for overlap effect
                const offsetClasses = [
                  'md:translate-y-0',
                  'md:translate-y-8',
                  'md:translate-y-4',
                  'md:translate-y-12'
                ];

                return (
                  <Link
                    key={update.id}
                    href={update.link}
                    className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-1 ${offsetClasses[index]}`}
                    style={{
                      transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                    }}
                  >
                    {/* Background Image */}
                    <div className="relative h-80 overflow-hidden">
                      <Image
                        src={update.image}
                        alt={update.title}
                        fill
                        className="object-cover"
                      />

                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${update.gradient} mix-blend-multiply`}></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent"></div>

                      {/* Badge */}
                      <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/95 backdrop-blur-sm text-gray-900 rounded-full font-sans text-xs font-bold shadow-lg">
                        {update.badge}
                      </div>

                      {/* Icon */}
                      <div className="absolute top-6 left-6">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-colors">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="mb-2">
                          <h3 className="font-serif text-3xl font-bold text-white mb-2 drop-shadow-lg">
                            {update.title}
                          </h3>
                          <p className="font-sans text-sm text-white/90 leading-relaxed mb-2 drop-shadow">
                            {update.description}
                          </p>
                          <p className="font-sans text-xs text-white/70 font-semibold drop-shadow">
                            {update.date}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom accent bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
