'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Image from 'next/image';
import { useState } from 'react';

export default function PortraitGallerySection() {
  const { ref, isVisible } = useScrollAnimation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const portraits = [
    {
      id: 1,
      src: '/images/m/mozart001.jpg',
      title: '어린 모차르트',
      year: '1763년경',
      description: '라벤더 코트를 입은 7세의 신동',
    },
    {
      id: 2,
      src: '/images/m/mozart004.jpg',
      title: '소년 모차르트 전신상',
      year: '1763년',
      description: '우아한 자세의 어린 천재 음악가',
    },
    {
      id: 3,
      src: '/images/m/mozart002.jpg',
      title: '청년 모차르트 측면상',
      year: '1780년경',
      description: '음악에 집중하는 모습',
    },
    {
      id: 4,
      src: '/images/m/mozart003.jpg',
      title: '피아노 앞의 모차르트',
      year: '1780년대',
      description: '작곡 중인 모습',
    },
    {
      id: 5,
      src: '/images/m/mozart005.jpg',
      title: '빈 시절의 모차르트',
      year: '1783년',
      description: '밝은 레드 코트의 성숙한 음악가',
    },
    {
      id: 6,
      src: '/images/m/mozart007.jpg',
      title: '모차르트 공식 초상화',
      year: '1780년대 후반',
      description: '가장 유명한 빨간 코트 초상화',
    },
    {
      id: 7,
      src: '/images/m/mozart006.jpg',
      title: '말년의 모차르트',
      year: '1789년',
      description: '녹색 코트를 입은 원숙기',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-white via-cream to-ivory relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-200 rounded-full blur-3xl"></div>
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
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-800 rounded-full font-sans text-sm font-semibold mb-4">
              Historical Portraits
            </span>
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-primary-900 mb-6">
              모차르트 초상화 갤러리
            </h2>
            <p className="font-sans text-xl text-primary-700 max-w-3xl mx-auto">
              역사적 가치를 지닌 진귀한 초상화 컬렉션.
              <br />
              시대별 모차르트의 모습과 그가 입었던 화려한 의상을 감상하세요.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {portraits.map((portrait, index) => (
              <div
                key={portrait.id}
                className="group cursor-pointer"
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                }}
                onClick={() => setSelectedImage(portrait.src)}
              >
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-primary-100 hover:border-primary-300">
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={portrait.src}
                      alt={portrait.title}
                      fill
                      className="object-cover transform transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="text-white">
                          <div className="text-sm font-sans font-semibold mb-2 opacity-90">
                            {portrait.year}
                          </div>
                          <div className="text-sm font-sans opacity-90">
                            {portrait.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-primary-900 mb-2 group-hover:text-primary-700 transition-colors">
                      {portrait.title}
                    </h3>
                    <p className="font-sans text-sm text-primary-600">
                      {portrait.year}
                    </p>
                  </div>

                  {/* Hover Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {selectedImage && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
              onClick={() => setSelectedImage(null)}
            >
              <div className="relative max-w-4xl w-full h-full flex items-center justify-center">
                <div className="relative w-full h-full max-h-[90vh]">
                  <Image
                    src={selectedImage}
                    alt="Mozart Portrait"
                    fill
                    className="object-contain"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                  />
                </div>
                <button
                  className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                  onClick={() => setSelectedImage(null)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
