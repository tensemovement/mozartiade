'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Image from 'next/image';
import { MdLibraryMusic, MdMenuBook, MdConfirmationNumber, MdChevronRight } from 'react-icons/md';

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

          {/* Services Grid - Clean & Modern */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Service 1 - Instruments */}
            <div className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 border border-gray-200 hover:border-gray-300">
              <div className="mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <MdLibraryMusic className="h-6 w-6 text-gray-700" />
                </div>
              </div>
              <h4 className="font-serif text-xl font-bold text-gray-900 mb-3">
                악기 구매 안내
              </h4>
              <p className="font-sans text-sm text-gray-600 mb-4 leading-relaxed">
                클래식 악기 전문가가 추천하는 믿을 수 있는 악기점
              </p>
              <div className="flex items-center text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                자세히 보기
                <MdChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Service 2 - Lessons */}
            <div className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 border border-gray-200 hover:border-gray-300">
              <div className="mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <MdMenuBook className="h-6 w-6 text-gray-700" />
                </div>
              </div>
              <h4 className="font-serif text-xl font-bold text-gray-900 mb-3">
                온라인 레슨
              </h4>
              <p className="font-sans text-sm text-gray-600 mb-4 leading-relaxed">
                전문 음악가와 함께하는 1:1 맞춤 레슨 프로그램
              </p>
              <div className="flex items-center text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                자세히 보기
                <MdChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Service 3 - Concerts */}
            <div className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 border border-gray-200 hover:border-gray-300">
              <div className="mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <MdConfirmationNumber className="h-6 w-6 text-gray-700" />
                </div>
              </div>
              <h4 className="font-serif text-xl font-bold text-gray-900 mb-3">
                공연 예매
              </h4>
              <p className="font-sans text-sm text-gray-600 mb-4 leading-relaxed">
                전국 클래식 공연 일정과 특별 할인 예매 정보
              </p>
              <div className="flex items-center text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                자세히 보기
                <MdChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
