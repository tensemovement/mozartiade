'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useRecoilState } from 'recoil';
import { selectedWorkState } from '@/store/atoms';
import Image from 'next/image';
import Link from 'next/link';
import LoadingSpinner from '@/components/LoadingSpinner';
import { formatVoteCount } from '@/utils/format';
import { MdFavorite, MdChevronRight, MdMusicNote, MdArticle, MdVisibility } from 'react-icons/md';
import { Work } from '@/types';
import { useState, useEffect } from 'react';
import { getGenreLabel } from '@/lib/constants';

export default function UnifiedWorksSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [, setSelectedWork] = useRecoilState(selectedWorkState);
  const [featuredWorks, setFeaturedWorks] = useState<Work[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch featured works from API
  useEffect(() => {
    async function fetchFeaturedWorks() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/works?highlight=true&limit=6&sort=likesCount&order=desc');
        const result = await response.json();

        if (result.success) {
          setFeaturedWorks(result.data.works);
        }
      } catch (err) {
        console.error('Error fetching featured works:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFeaturedWorks();
  }, []);

  const categories = [
    {
      id: 'K1-K99',
      title: '교향곡 & 관현악',
      count: 98,
    },
    {
      id: 'K100-K299',
      title: '협주곡',
      count: 156,
    },
    {
      id: 'K300-K499',
      title: '실내악',
      count: 142,
    },
    {
      id: 'K500-K626',
      title: '성악 & 오페라',
      count: 230,
    },
  ];

  return (
    <section className="py-24 bg-white">
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
            <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-sans text-sm font-semibold mb-4">
              Complete Works
            </span>
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              작품 카탈로그
            </h2>
            <p className="font-sans text-xl text-gray-600 max-w-3xl mx-auto">
              Ludwig von Köchel이 집대성한 626개 작품의 완전한 목록.
              <br />
              모차르트의 가장 유명한 대표 작품들과 전체 카탈로그를 탐색하세요.
            </p>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="group relative bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 hover:border-primary-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="text-sm font-sans font-semibold text-primary-600 mb-3">
                  {category.id}
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">
                  {category.title}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="font-sans text-4xl font-bold text-gray-900">
                    {category.count}
                  </span>
                  <span className="font-sans text-sm text-gray-500">
                    작품
                  </span>
                </div>
                {/* Subtle accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>
              </div>
            ))}
          </div>

          {/* Featured Works Divider */}
          <div className="text-center mb-12">
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              대표 작품
            </h3>
            <p className="font-sans text-lg text-gray-600">
              모차르트의 가장 유명하고 사랑받는 명곡들
            </p>
          </div>

          {/* Featured Works Grid */}
          {isLoading ? (
            <LoadingSpinner size="md" message="대표 작품을 불러오는 중..." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {featuredWorks.map((work, index) => (
              <Link
                key={work.id}
                href={`/works/${work.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 border border-gray-100"
              >
                {/* Header with K number */}
                <div className="relative h-32 bg-gray-100 flex items-center justify-center overflow-hidden">
                  {work.image && (
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      className="object-cover opacity-30"
                    />
                  )}
                  <div className="relative text-center z-10">
                    <div className="font-serif text-4xl font-bold text-gray-900 mb-1 drop-shadow-sm">
                      {work.catalogNumber}
                    </div>
                    <div className="text-sm font-sans text-gray-800 font-semibold drop-shadow-sm">
                      {work.year}
                      {work.month && `.${String(work.month).padStart(2, '0')}`}
                    </div>
                  </div>
                  {/* Genre badge - Top Left */}
                  {work.genre && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full font-sans text-xs font-semibold z-10">
                      {getGenreLabel(work.genre)}
                    </div>
                  )}
                  {/* Panel open button - Top Right */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedWork({ ...work, type: 'work' as const });
                    }}
                    className="absolute top-4 right-4 p-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all hover:scale-110 shadow-md z-10"
                    title="작품 패널 열기"
                  >
                    <MdVisibility className="h-4 w-4" />
                  </button>
                  {/* Likes count badge */}
                  {work.likesCount !== undefined && work.likesCount > 0 && (
                    <div className="absolute bottom-4 left-4 px-3 py-1 bg-rose-100/90 backdrop-blur-sm text-rose-800 rounded-full font-sans text-xs font-semibold z-10 shadow-sm flex items-center gap-1">
                      <MdFavorite className="h-3 w-3" />
                      {formatVoteCount(work.likesCount)}
                    </div>
                  )}
                  {/* Right bottom badges: Music & Sheet Music */}
                  {(work.youtubeUrl || work.sheetMusicUrl) && (
                    <div className="absolute bottom-4 right-4 flex gap-1.5 z-10">
                      {work.youtubeUrl && (
                        <div className="px-3 py-1 bg-purple-100/90 backdrop-blur-sm text-purple-800 rounded-full font-sans text-xs font-semibold shadow-sm flex items-center gap-1" title="음악 감상 가능">
                          <MdMusicNote className="h-3 w-3" />
                        </div>
                      )}
                      {work.sheetMusicUrl && (
                        <div className="px-3 py-1 bg-accent-100/90 backdrop-blur-sm text-accent-800 rounded-full font-sans text-xs font-semibold shadow-sm flex items-center gap-1" title="악보 보기 가능">
                          <MdArticle className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 relative">
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
                    {work.title}
                  </h3>
                  {work.titleEn && (
                    <p className="font-sans text-sm text-gray-500 mb-3 italic">
                      {work.titleEn}
                    </p>
                  )}
                  <p className="font-sans text-sm text-gray-600 line-clamp-3">
                    {work.description}
                  </p>
                </div>

                {/* Bottom accent */}
                <div className="h-1 bg-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </Link>
            ))}
            </div>
          )}

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/works"
              className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-xl font-sans text-lg font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              전체 작품 카탈로그 보기
              <MdChevronRight className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
