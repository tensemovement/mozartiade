'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

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
          {/* Premium Banner */}
          <div className="relative bg-gradient-to-r from-primary-800 via-primary-700 to-secondary-700 rounded-3xl overflow-hidden shadow-2xl mb-8">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-600/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-900/30 rounded-full blur-3xl"></div>

            <div className="relative z-10 px-8 py-12 md:px-16 md:py-16">
              <div className="max-w-3xl">
                <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-sans text-sm font-semibold mb-4">
                  🎁 Special Offer
                </div>
                <h3 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
                  프리미엄 멤버십으로
                  <br />
                  더 많은 혜택을 누리세요
                </h3>
                <p className="font-sans text-lg text-white/90 mb-8">
                  무제한 악보 다운로드, HD 음원, 독점 해설 콘텐츠까지
                  <br />
                  지금 가입하고 첫 달 50% 할인 혜택을 받으세요
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-4 bg-white text-primary-900 rounded-xl font-sans text-lg font-semibold hover:bg-cream transition-all duration-300 shadow-lg hover:shadow-xl">
                    프리미엄 가입하기
                  </button>
                  <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-xl font-sans text-lg font-semibold hover:bg-white/20 transition-all duration-300">
                    더 알아보기
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Partner Banners Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Banner 1 */}
            <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 border border-secondary-200">
              <div className="text-4xl mb-4">🎻</div>
              <h4 className="font-serif text-xl font-bold text-secondary-900 mb-2">
                악기 구매 안내
              </h4>
              <p className="font-sans text-sm text-secondary-800 mb-4">
                클래식 악기 전문가가 추천하는 믿을 수 있는 악기점
              </p>
              <button className="font-sans text-sm font-semibold text-secondary-900 hover:text-secondary-700 transition-colors">
                자세히 보기 →
              </button>
            </div>

            {/* Banner 2 */}
            <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 border border-accent-200">
              <div className="text-4xl mb-4">🎓</div>
              <h4 className="font-serif text-xl font-bold text-accent-900 mb-2">
                온라인 레슨
              </h4>
              <p className="font-sans text-sm text-accent-800 mb-4">
                전문 음악가와 함께하는 1:1 맞춤 레슨 프로그램
              </p>
              <button className="font-sans text-sm font-semibold text-accent-900 hover:text-accent-700 transition-colors">
                자세히 보기 →
              </button>
            </div>

            {/* Banner 3 */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 border border-primary-200">
              <div className="text-4xl mb-4">🎫</div>
              <h4 className="font-serif text-xl font-bold text-primary-900 mb-2">
                공연 예매
              </h4>
              <p className="font-sans text-sm text-primary-800 mb-4">
                전국 클래식 공연 일정과 특별 할인 예매 정보
              </p>
              <button className="font-sans text-sm font-semibold text-primary-900 hover:text-primary-700 transition-colors">
                자세히 보기 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
