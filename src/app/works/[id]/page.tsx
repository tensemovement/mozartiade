'use client';

import { notFound } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { worksData } from '@/data/works';
import { Aria } from '@/types';
import AriaPanel from '@/components/AriaPanel';
import { MdPlayArrow, MdClose, MdFavorite, MdShare, MdMusicNote } from 'react-icons/md';

interface PageProps {
  params: {
    id: string;
  };
}

export default function WorkDetailPage({ params }: PageProps) {
  const work = worksData.find((w) => w.id === params.id);
  const [selectedAria, setSelectedAria] = useState<Aria | null>(null);

  if (!work) {
    notFound();
  }

  const formatDate = () => {
    if (work.day && work.month) {
      return `${work.year}.${work.month}.${work.day}`;
    } else if (work.month) {
      return `${work.year}.${work.month}`;
    }
    return work.year;
  };

  const backgroundImage = work.detailImage || work.image || '/images/m/mozart007.jpg';

  return (
    <>
      <Navigation />

      {/* 히어로 섹션 with 배경 이미지 */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* 배경 이미지 */}
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt={work.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />
        </div>

        {/* 히어로 컨텐츠 */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* 카탈로그 번호 & 장르 */}
            <div className="flex items-center gap-4 mb-6">
              {work.catalogNumber && (
                <span className="px-4 py-2 bg-accent/20 backdrop-blur-md border border-accent/30 rounded-full text-accent font-bold text-sm">
                  {work.catalogNumber}
                </span>
              )}
              {work.genre && (
                <span className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm">
                  {work.genre}
                </span>
              )}
              <span className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/80 text-sm">
                {formatDate()}
              </span>
            </div>

            {/* 제목 */}
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
              {work.title}
            </h1>
            <p className="font-serif text-2xl md:text-3xl text-accent/90 italic mb-6">
              {work.titleEn}
            </p>

            {/* 설명 */}
            <p className="text-white/90 text-lg md:text-xl mb-8 leading-relaxed">
              {work.description}
            </p>

            {/* 액션 버튼 */}
            <div className="flex flex-wrap gap-4">
              {work.youtubeUrl && (
                <a
                  href={work.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-8 py-4 bg-accent hover:bg-accent/90 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-2xl flex items-center gap-2"
                >
                  <MdPlayArrow className="text-2xl group-hover:scale-110 transition-transform" />
                  전체 감상하기
                </a>
              )}
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2">
                <MdFavorite className="text-xl" />
                {work.voteCount?.toLocaleString()}
              </button>
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2">
                <MdShare className="text-xl" />
                공유하기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 메인 컨텐츠 섹션 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 왼쪽 컬럼 - 상세 정보 */}
            <div className="lg:col-span-2 space-y-8">
              {/* 작품 상세 */}
              {work.compositionDetails && (
                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-md">
                  <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <MdMusicNote className="text-accent" />
                    작품 정보
                  </h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {work.compositionDetails}
                  </p>
                </div>
              )}

              {/* 비하인드 스토리 */}
              {work.behindStory && (
                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-md">
                  <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
                    비하인드 스토리
                  </h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {work.behindStory}
                  </p>
                </div>
              )}

              {/* 활용 사례 */}
              {work.usageExamples && work.usageExamples.length > 0 && (
                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-md">
                  <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
                    공연 & 활용 사례
                  </h2>
                  <div className="space-y-3">
                    {work.usageExamples.map((example, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-100"
                      >
                        <div className="mt-1 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-accent text-xs font-bold">{index + 1}</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{example}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 오른쪽 컬럼 - 아리아 목록 */}
            {work.arias && work.arias.length > 0 && (
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md">
                    <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">
                      구성 악곡
                    </h2>
                    <div className="space-y-2 max-h-[600px] overflow-y-auto custom-scrollbar">
                      {work.arias.map((aria) => (
                        <button
                          key={aria.id}
                          onClick={() => setSelectedAria(aria)}
                          className="w-full text-left p-4 bg-gray-50 hover:bg-accent/10 rounded-xl transition-all duration-300 border border-gray-100 hover:border-accent/50 group"
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-1 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:scale-110 transition-all">
                              <span className="text-accent group-hover:text-white text-sm font-bold">
                                {aria.order}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-gray-900 font-semibold text-sm mb-1 group-hover:text-accent transition-colors">
                                {aria.title}
                              </h3>
                              {aria.character && (
                                <p className="text-gray-600 text-xs mb-1">{aria.character}</p>
                              )}
                              {aria.duration && (
                                <p className="text-gray-500 text-xs">{aria.duration}</p>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />

      {/* 아리아 상세 패널 */}
      <AriaPanel
        aria={selectedAria}
        onClose={() => setSelectedAria(null)}
      />

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(212, 165, 116, 0.4);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 165, 116, 0.6);
        }
      `}</style>
    </>
  );
}
