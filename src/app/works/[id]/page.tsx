'use client';

import { notFound, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';
import WorkPanel from '@/components/WorkPanel';
import MovementPanel from '@/components/MovementPanel';
import { Work, Movement, RelatedLink } from '@/types';
import { selectedMovementState, selectedWorkState } from '@/store/atoms';
import { MdPlayArrow, MdClose, MdFavorite, MdFavoriteBorder, MdShare, MdMusicNote, MdArticle, MdOpenInNew } from 'react-icons/md';
import { getGenreLabel, getInstrumentLabels } from '@/lib/constants';
import toast from 'react-hot-toast';

interface PageProps {
  params: {
    id: string;
  };
}

export default function WorkDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [work, setWork] = useState<Work | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovement, setSelectedMovement] = useRecoilState(selectedMovementState);
  const [, setSelectedWork] = useRecoilState(selectedWorkState);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isLiking, setIsLiking] = useState(false);

  // Fetch work from API
  useEffect(() => {
    async function fetchWork() {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/works/${params.id}`);
        const result = await response.json();

        if (result.success) {
          setWork(result.data);
          setLikesCount(result.data.likesCount || 0);
        } else {
          setError(result.error || 'Failed to fetch work');
        }
      } catch (err) {
        setError('Failed to fetch work');
        console.error('Error fetching work:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWork();
  }, [params.id]);

  // Fetch like status
  useEffect(() => {
    async function fetchLikeStatus() {
      if (status === 'authenticated') {
        try {
          const response = await fetch(`/api/works/${params.id}/like`);
          const result = await response.json();
          setLiked(result.liked);
          setLikesCount(result.likesCount);
        } catch (err) {
          console.error('Error fetching like status:', err);
        }
      }
    }

    fetchLikeStatus();
  }, [params.id, status]);

  // Toggle like
  const handleLikeToggle = async () => {
    if (status !== 'authenticated') {
      toast.error('로그인이 필요합니다.');
      router.push('/auth');
      return;
    }

    if (isLiking) return;

    try {
      setIsLiking(true);
      const response = await fetch(`/api/works/${params.id}/like`, {
        method: 'POST',
      });
      const result = await response.json();

      if (response.ok) {
        setLiked(result.liked);
        setLikesCount(result.likesCount);
        toast.success(result.liked ? '좋아요를 추가했습니다.' : '좋아요를 취소했습니다.');
      } else {
        toast.error(result.error || '좋아요 처리 중 오류가 발생했습니다.');
      }
    } catch (err) {
      console.error('Error toggling like:', err);
      toast.error('좋아요 처리 중 오류가 발생했습니다.');
    } finally {
      setIsLiking(false);
    }
  };

  // Share (copy URL)
  const handleShare = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      toast.success('URL을 복사하였습니다');
    } catch (err) {
      console.error('Error copying URL:', err);
      toast.error('URL 복사에 실패했습니다.');
    }
  };

  if (isLoading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="lg" message="작품 정보를 불러오는 중..." />
        </div>
      </>
    );
  }

  if (error || !work) {
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
                  {getGenreLabel(work.genre)}
                </span>
              )}
              <span className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/80 text-sm">
                {formatDate()}
              </span>
            </div>

            {/* 제목 */}
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {work.title}
            </h1>
            <p className="font-serif text-2xl md:text-3xl text-accent/90 italic mb-6">
              {work.titleEn}
            </p>

            {/* 설명 */}
            <p className="text-white/90 text-lg md:text-xl mb-6 leading-relaxed">
              {work.description}
            </p>

            {/* 작품 기본 정보 - 컴팩트 */}
            <div className="mb-6 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {work.compositionLocation && (
                  <div>
                    <h3 className="text-xs font-semibold text-white/60 uppercase mb-1">작곡 장소</h3>
                    <p className="text-white font-medium">{work.compositionLocation}</p>
                  </div>
                )}
                <div>
                  <h3 className="text-xs font-semibold text-white/60 uppercase mb-1">작곡 일자</h3>
                  <p className="text-white font-medium">{formatDate()}</p>
                </div>
                {work.instruments && work.instruments.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-white/60 uppercase mb-1">악기 편성</h3>
                    <p className="text-white font-medium">
                      {getInstrumentLabels(work.instruments).slice(0, 2).join(', ')}
                      {work.instruments.length > 2 && ` 외 ${work.instruments.length - 2}개`}
                    </p>
                  </div>
                )}
                {work.movements && work.movements.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-white/60 uppercase mb-1">악장 수</h3>
                    <p className="text-white font-medium">{work.movements.length}악장</p>
                  </div>
                )}
              </div>

              {/* 추가 카탈로그 번호 */}
              {(work.catalogNumberFirstEd || work.catalogNumberNinthEd) && (
                <div className="mt-4 pt-4 border-t border-white/20">
                  <h3 className="text-xs font-semibold text-white/60 uppercase mb-2">추가 카탈로그 번호</h3>
                  <div className="flex flex-wrap gap-2">
                    {work.catalogNumberFirstEd && (
                      <div className="px-3 py-1.5 bg-white/10 rounded-lg border border-white/20">
                        <span className="text-white/60 text-xs mr-1">1판:</span>
                        <span className="text-white font-bold text-sm">{work.catalogNumberFirstEd}</span>
                      </div>
                    )}
                    {work.catalogNumberNinthEd && (
                      <div className="px-3 py-1.5 bg-white/10 rounded-lg border border-white/20">
                        <span className="text-white/60 text-xs mr-1">9판:</span>
                        <span className="text-white font-bold text-sm">{work.catalogNumberNinthEd}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 액션 버튼 */}
            <div className="flex flex-wrap gap-4">
              {work.sheetMusicUrl && (
                <a
                  href={work.sheetMusicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  <MdArticle className="text-xl group-hover:scale-110 transition-transform" />
                  악보 다운로드
                </a>
              )}
              <button
                onClick={handleShare}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <MdShare className="text-xl" />
                공유하기
              </button>
              <button
                onClick={handleLikeToggle}
                disabled={isLiking}
                className={`px-8 py-4 backdrop-blur-md border rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2 ${
                  liked
                    ? 'bg-accent/20 border-accent text-accent hover:bg-accent/30'
                    : 'bg-white/10 hover:bg-white/20 border-white/30 text-white'
                } ${isLiking ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {liked ? (
                  <MdFavorite className="text-xl" />
                ) : (
                  <MdFavoriteBorder className="text-xl" />
                )}
                {likesCount.toLocaleString()}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 메인 컨텐츠 섹션 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 왼쪽 컬럼 - 상세 정보 */}
            <div className="lg:col-span-2 space-y-8">
              {/* 작품 상세 정보 통합 */}
              {(work.compositionDetails || work.behindStory || (work.usageExamples && work.usageExamples.length > 0)) && (
                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-md space-y-8">
                  {/* 작품 설명 */}
                  {work.compositionDetails && (
                    <div>
                      <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">
                        작품 설명
                      </h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {work.compositionDetails}
                      </p>
                    </div>
                  )}

                  {/* 비하인드 스토리 */}
                  {work.behindStory && (
                    <div>
                      <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">
                        비하인드 스토리
                      </h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {work.behindStory}
                      </p>
                    </div>
                  )}

                  {/* 활용 사례 */}
                  {work.usageExamples && work.usageExamples.length > 0 && (
                    <div>
                      <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">
                        활용 사례
                      </h3>
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
              )}
            </div>

            {/* 오른쪽 컬럼 - 음악감상, 관련 링크 */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* 음악 감상 */}
                {work.movements && work.movements.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                      <h2 className="font-serif text-xl font-bold text-gray-900">
                        음악 감상
                      </h2>
                      <button
                        onClick={() => setSelectedWork({ ...work, type: 'work' as const })}
                        className="px-3 py-1.5 bg-accent hover:bg-accent/90 text-white text-xs font-semibold rounded-lg transition-all hover:scale-105 flex items-center gap-1"
                      >
                        <MdPlayArrow className="h-4 w-4" />
                        전체 듣기
                      </button>
                    </div>
                    <div className="space-y-2 max-h-[600px] overflow-y-auto custom-scrollbar">
                      {work.movements.map((movement) => (
                        <button
                          key={movement.id}
                          onClick={() => setSelectedMovement(movement)}
                          className="w-full text-left p-4 bg-gray-50 hover:bg-accent/10 rounded-xl transition-all duration-300 border border-gray-100 hover:border-accent/50 group"
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-1 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:scale-110 transition-all">
                              <span className="text-accent group-hover:text-white text-sm font-bold">
                                {movement.order}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-gray-900 font-semibold text-sm mb-1 group-hover:text-accent transition-colors">
                                {movement.title}
                              </h3>
                              {movement.titleEn && (
                                <p className="text-gray-500 text-xs italic mb-1">{movement.titleEn}</p>
                              )}
                              {movement.character && (
                                <p className="text-gray-600 text-xs">{movement.character}</p>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 관련 링크 */}
                {work.relatedLinks && work.relatedLinks.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md">
                    <h2 className="font-serif text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                      관련 링크
                    </h2>
                    <div className="space-y-3">
                      {work.relatedLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-3 bg-blue-50 rounded-lg border border-blue-200 hover:border-blue-400 transition-all group"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                              <MdOpenInNew className="h-4 w-4 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-serif text-sm font-bold text-gray-900 mb-0.5">
                                {link.title}
                              </h4>
                              {link.description && (
                                <p className="font-sans text-xs text-gray-600">
                                  {link.description}
                                </p>
                              )}
                            </div>
                            <MdOpenInNew className="h-4 w-4 text-blue-600 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <WorkPanel />
      <MovementPanel />

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
