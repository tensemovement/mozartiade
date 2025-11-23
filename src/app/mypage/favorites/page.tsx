'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Work } from '@/types';
import { MdFavorite, MdPlayArrow } from 'react-icons/md';
import { getGenreLabel } from '@/lib/constants';
import toast from 'react-hot-toast';

export default function MyPageFavoritesPage() {
  const [likedWorks, setLikedWorks] = useState<Work[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLikedWorks();
  }, []);

  const fetchLikedWorks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/mypage/liked-works');
      const result = await response.json();

      if (result.success) {
        setLikedWorks(result.data);
      } else {
        toast.error(result.error || '좋아하는 작품을 불러오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('Error fetching liked works:', error);
      toast.error('좋아하는 작품을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        좋아하는 작품 ({likedWorks.length})
      </h2>
      {isLoading ? (
        <LoadingSpinner size="md" message="로딩 중..." />
      ) : likedWorks.length === 0 ? (
        <div className="text-center py-12">
          <MdFavorite className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-4">좋아하는 작품이 없습니다.</p>
          <Link
            href="/works"
            className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors"
          >
            작품 탐색하기
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {likedWorks.map((work) => (
            <Link
              key={work.id}
              href={`/works/${work.id}`}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="relative h-48 bg-gradient-to-br from-primary-100 to-secondary-100">
                {work.image && (
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  {work.catalogNumber && (
                    <span className="px-3 py-1 bg-accent/90 text-white text-sm font-bold rounded-full">
                      {work.catalogNumber}
                    </span>
                  )}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-primary-600 transition-colors line-clamp-1">
                  {work.title}
                </h3>
                {work.titleEn && (
                  <p className="text-sm text-gray-500 italic mb-2 line-clamp-1">
                    {work.titleEn}
                  </p>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  {work.genre && (
                    <span className="px-2 py-1 bg-gray-100 rounded">
                      {getGenreLabel(work.genre)}
                    </span>
                  )}
                  <span>{work.year}</span>
                </div>
                <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MdFavorite className="text-accent" />
                    <span>{work.likesCount || 0}</span>
                  </div>
                  {work.youtubeUrl && (
                    <div className="flex items-center gap-1">
                      <MdPlayArrow className="text-primary-600" />
                      <span>감상</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
