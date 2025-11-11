'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Image from 'next/image';
import { MdLibraryMusic, MdMenuBook, MdConfirmationNumber } from 'react-icons/md';

export default function AdBannerSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Premium Banner with Mozart Portrait */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8 h-[400px] md:h-[500px]">
            {/* Mozart Portrait Background */}
            <div className="absolute inset-0">
              <Image
                src="/images/m/mozart002.jpg"
                alt="Mozart Premium"
                fill
                className="object-cover object-center"
                quality={90}
              />
              {/* Elegant Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/85 to-gray-900/75"></div>
              {/* Accent Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 via-transparent to-transparent mix-blend-multiply"></div>
            </div>

            <div className="relative z-10 h-full flex items-center px-8 py-12 md:px-16 md:py-16">
              <div className="max-w-2xl">
                <div className="inline-block px-5 py-2 bg-white/10 backdrop-blur-md rounded-full text-white font-sans text-sm font-semibold mb-6 border border-white/20">
                  Premium Membership
                </div>
                <h3 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  모차르트의 모든 것을
                  <br />
                  프리미엄으로
                </h3>
                <p className="font-sans text-lg md:text-xl text-white/95 mb-8 leading-relaxed">
                  무제한 악보 다운로드, HD 음원, 독점 해설 콘텐츠까지
                  <br className="hidden sm:block" />
                  지금 가입하고 <span className="text-primary-300 font-bold">첫 달 50% 할인</span> 혜택을 받으세요
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-4 bg-white text-gray-900 rounded-xl font-sans text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                    프리미엄 가입하기
                  </button>
                  <button className="px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/40 text-white rounded-xl font-sans text-lg font-semibold hover:bg-white/20 hover:border-white/60 transition-all duration-300">
                    더 알아보기
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Services Grid - Banner Style with Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Service 1 - Instruments */}
            <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 h-64">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src="/images/m/mozart005.jpg"
                  alt="악기 구매 안내"
                  fill
                  className="object-cover"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/85 to-gray-800/85 group-hover:from-gray-900/75 group-hover:to-gray-800/75 transition-colors duration-300"></div>
              </div>

              <div className="relative z-10 h-full flex flex-col justify-between p-8">
                <div className="mb-4">
                  <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20">
                    <MdLibraryMusic className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-serif text-2xl font-bold text-white mb-3 drop-shadow-lg">
                    악기 구매 안내
                  </h4>
                  <p className="font-sans text-base text-gray-100 leading-relaxed drop-shadow">
                    클래식 악기 전문가가 추천하는 믿을 수 있는 악기점
                  </p>
                </div>
              </div>

              {/* Hover Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>

            {/* Service 2 - Lessons */}
            <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 h-64">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src="/images/m/mozart006.jpg"
                  alt="온라인 레슨"
                  fill
                  className="object-cover"
                />
                {/* Primary overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-700/85 to-primary-600/85 group-hover:from-primary-700/75 group-hover:to-primary-600/75 transition-colors duration-300"></div>
              </div>

              <div className="relative z-10 h-full flex flex-col justify-between p-8">
                <div className="mb-4">
                  <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20">
                    <MdMenuBook className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-serif text-2xl font-bold text-white mb-3 drop-shadow-lg">
                    온라인 레슨
                  </h4>
                  <p className="font-sans text-base text-primary-50 leading-relaxed drop-shadow">
                    전문 음악가와 함께하는 1:1 맞춤 레슨 프로그램
                  </p>
                </div>
              </div>

              {/* Hover Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>

            {/* Service 3 - Concerts */}
            <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 h-64">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src="/images/m/mozart001.jpg"
                  alt="공연 예매"
                  fill
                  className="object-cover"
                />
                {/* Rose overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-700/85 to-rose-600/85 group-hover:from-rose-700/75 group-hover:to-rose-600/75 transition-colors duration-300"></div>
              </div>

              <div className="relative z-10 h-full flex flex-col justify-between p-8">
                <div className="mb-4">
                  <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20">
                    <MdConfirmationNumber className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-serif text-2xl font-bold text-white mb-3 drop-shadow-lg">
                    공연 예매
                  </h4>
                  <p className="font-sans text-base text-rose-50 leading-relaxed drop-shadow">
                    전국 클래식 공연 일정과 특별 할인 예매 정보
                  </p>
                </div>
              </div>

              {/* Hover Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
