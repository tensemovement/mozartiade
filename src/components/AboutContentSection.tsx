'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { MdCheckCircle, MdAutoStories, MdVerified, MdLibraryMusic, MdTimeline, MdLibraryBooks, MdFavorite } from 'react-icons/md';

export default function AboutContentSection() {
  const { ref: missionRef, isVisible: missionVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: dataRef, isVisible: dataVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <>
      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div
            ref={missionRef}
            className={`transition-all duration-1000 ${
              missionVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  우리의 미션
                </h2>
                <p className="font-sans text-xl text-gray-600 leading-relaxed">
                  18세기 천재 작곡가의 유산을 21세기 디지털 기술로 보존하고,
                  <br className="hidden md:inline" />
                  전 세계 음악 애호가들이 쉽게 접근하고 깊이 이해할 수 있도록 돕습니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: '보존',
                    description: '모차르트의 626개 작품을 체계적으로 디지털 아카이빙하여 후대에 전달합니다.',
                    color: 'primary',
                  },
                  {
                    title: '공유',
                    description: '누구나 무료로 접근할 수 있는 플랫폼을 통해 클래식 음악의 대중화를 실현합니다.',
                    color: 'secondary',
                  },
                  {
                    title: '교육',
                    description: '악보, 음원, 영상, 해설 등 다양한 학습 자료로 깊이 있는 음악 교육을 지원합니다.',
                    color: 'accent',
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="text-center">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${item.color}-100 text-${item.color}-700 mb-4`}>
                        <MdCheckCircle className="h-8 w-8" />
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">
                        {item.title}
                      </h3>
                      <p className="font-sans text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Detail Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div
            ref={featuresRef}
            className={`transition-all duration-1000 ${
              featuresVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  제공하는 기능
                </h2>
                <p className="font-sans text-lg text-gray-600">
                  모차르트의 작품을 다양한 방식으로 탐색하고 학습할 수 있습니다
                </p>
              </div>

              <div className="space-y-12">
                {[
                  {
                    icon: MdLibraryMusic,
                    iconColor: 'text-primary-700',
                    iconBg: 'bg-primary-100',
                    title: 'Köchel 카탈로그 기반 완전한 작품 목록',
                    description: 'Ludwig von Köchel이 1862년 발표한 권위 있는 분류 체계(KV 번호)를 기반으로 모차르트의 전 작품을 체계적으로 정리했습니다. 교향곡, 협주곡, 실내악, 오페라 등 35개 이상의 장르별로 분류되어 있습니다.',
                    features: ['626개 전체 작품 수록', '장르별, 시기별 분류', 'KV 번호로 빠른 검색'],
                  },
                  {
                    icon: MdTimeline,
                    iconColor: 'text-secondary-700',
                    iconBg: 'bg-secondary-100',
                    title: '시간순 연대기 타임라인',
                    description: '1756년 잘츠부르크에서의 탄생부터 1791년 빈에서의 서거까지, 모차르트의 35년 생애를 시간순으로 따라가며 각 시기의 주요 작품과 생애 사건을 함께 확인할 수 있습니다.',
                    features: ['생애 주요 사건 정리', '시기별 대표 작품', '역사적 맥락 제공'],
                  },
                  {
                    icon: MdLibraryBooks,
                    iconColor: 'text-accent-700',
                    iconBg: 'bg-accent-100',
                    title: '풍부한 멀티미디어 자료',
                    description: '각 작품마다 악보, 연주 음원, 영상, 상세 해설을 제공합니다. IMSLP와 연계된 무료 악보, YouTube의 명연주 영상 등 신뢰할 수 있는 출처의 자료만을 엄선했습니다.',
                    features: ['무료 악보 다운로드', '명연주 영상 감상', '작품 해설 및 분석'],
                  },
                  {
                    icon: MdFavorite,
                    iconColor: 'text-rose-700',
                    iconBg: 'bg-rose-100',
                    title: '커뮤니티 참여 기능',
                    description: '좋아하는 작품에 투표하고, 다른 음악 애호가들의 선호도를 확인할 수 있습니다. 클래식 음악을 사랑하는 이들의 공간에서 함께 감상을 나눠보세요.',
                    features: ['작품 좋아요 투표', '인기 작품 순위', '감상 공유'],
                  },
                ].map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200"
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0">
                          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${feature.iconBg} ${feature.iconColor}`}>
                            <Icon className="h-8 w-8" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">
                            {feature.title}
                          </h3>
                          <p className="font-sans text-gray-600 mb-4 leading-relaxed">
                            {feature.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {feature.features.map((item, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-3 py-1 bg-primary-50 text-primary-800 rounded-full text-sm font-medium"
                              >
                                <MdCheckCircle className="h-4 w-4 mr-1" />
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Source Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div
            ref={dataRef}
            className={`transition-all duration-1000 ${
              dataVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-100 text-accent-700 mb-6">
                  <MdVerified className="h-10 w-10" />
                </div>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  신뢰할 수 있는 데이터
                </h2>
                <p className="font-sans text-lg text-gray-600 leading-relaxed">
                  모든 정보는 검증된 출처와 학술적 기준에 따라 정리되었습니다
                </p>
              </div>

              <div className="bg-gradient-to-br from-accent-50 to-primary-50 rounded-2xl p-10 border border-accent-200">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <MdAutoStories className="h-8 w-8 text-accent-700" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">
                        Köchel 카탈로그 (KV 번호)
                      </h3>
                      <p className="font-sans text-gray-700 leading-relaxed">
                        1862년 Ludwig von Köchel이 최초로 작성하고, 이후 여러 차례 개정된
                        모차르트 작품 목록의 표준 분류 체계를 따릅니다. 현재 제8판(2024)까지 발표되었습니다.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <MdAutoStories className="h-8 w-8 text-accent-700" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">
                        IMSLP (국제 악보 도서관)
                      </h3>
                      <p className="font-sans text-gray-700 leading-relaxed">
                        퍼블릭 도메인 악보를 무료로 제공하는 세계 최대의 온라인 악보 아카이브와
                        연계하여 신뢰할 수 있는 원전 악보를 제공합니다.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <MdAutoStories className="h-8 w-8 text-accent-700" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">
                        학술 자료 및 전문 서적
                      </h3>
                      <p className="font-sans text-gray-700 leading-relaxed">
                        모차르트 연구의 권위자들이 집필한 학술 서적과 논문,
                        전기 자료 등을 참고하여 정확한 정보를 제공합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-gray-50 rounded-xl p-8 border border-gray-200">
                <p className="font-sans text-sm text-gray-600 text-center leading-relaxed">
                  <strong className="text-gray-900">지속적인 업데이트:</strong>
                  {' '}새로운 연구 결과나 자료가 발견되면 즉시 반영하여
                  항상 최신의 정확한 정보를 제공하기 위해 노력합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
