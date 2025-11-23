'use client';

import { useState, useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedWorkState, selectedMovementState } from '@/store/atoms';
import Image from 'next/image';
import Link from 'next/link';
import { MdFullscreen, MdClose, MdLocationOn, MdDescription, MdArticle, MdOpenInNew, MdOndemandVideo, MdFavorite, MdMusicNote } from 'react-icons/md';
import { getGenreLabel } from '@/lib/constants';

export default function WorkPanel() {
  const [selectedWork, setSelectedWork] = useRecoilState(selectedWorkState);
  const [, setSelectedMovement] = useRecoilState(selectedMovementState);
  const selectedMovement = useRecoilValue(selectedMovementState);
  const [isScrolled, setIsScrolled] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const prevMovementRef = useRef(selectedMovement);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 작품패널이 열릴 때 악장패널 닫기
  useEffect(() => {
    if (selectedWork) {
      setSelectedMovement(null);
    }
  }, [selectedWork, setSelectedMovement]);

  // 애니메이션 제어: 다른 패널에서 전환되는 경우 애니메이션 없음
  useEffect(() => {
    if (selectedWork) {
      // 이전에 악장패널이 열려있었다면 애니메이션 없음 (패널 전환)
      // 이전에 아무것도 없었다면 애니메이션 적용 (새로 열림)
      setShouldAnimate(prevMovementRef.current === null);
    }
    prevMovementRef.current = selectedMovement;
  }, [selectedWork, selectedMovement]);

  const getDateString = (item: any) => {
    if (item.day && item.month) {
      return `${item.year}.${String(item.month).padStart(2, '0')}.${String(item.day).padStart(2, '0')}`;
    } else if (item.month) {
      return `${item.year}.${String(item.month).padStart(2, '0')}`;
    }
    return `${item.year}`;
  };

  const getYoutubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    if (videoIdMatch && videoIdMatch[1]) {
      const videoId = videoIdMatch[1];

      // Extract t parameter (timestamp) from URL
      const urlObj = new URL(url.includes('://') ? url : `https://${url}`);
      const tParam = urlObj.searchParams.get('t');

      let embedUrl = `https://www.youtube.com/embed/${videoId}`;

      if (tParam) {
        // Convert t parameter to seconds
        // Support formats: 123, 1m30s, 1h2m3s
        let seconds = 0;

        if (/^\d+$/.test(tParam)) {
          // Pure number (seconds)
          seconds = parseInt(tParam, 10);
        } else {
          // Parse format like 1h2m3s or 1m30s
          const hours = tParam.match(/(\d+)h/);
          const minutes = tParam.match(/(\d+)m/);
          const secs = tParam.match(/(\d+)s/);

          if (hours) seconds += parseInt(hours[1], 10) * 3600;
          if (minutes) seconds += parseInt(minutes[1], 10) * 60;
          if (secs) seconds += parseInt(secs[1], 10);
        }

        if (seconds > 0) {
          embedUrl += `?start=${seconds}`;
        }
      }

      return embedUrl;
    }
    return null;
  };

  if (!selectedWork) return null;

  return (
    <>
      {/* Desktop: Work Panel (작품 패널) - Fixed on right */}
      <div
        className={`hidden md:flex md:flex-col fixed top-0 right-0 bg-white z-50 w-1/3 shadow-[0_0_50px_rgba(0,0,0,0.15)] transition-all duration-300 ${
          shouldAnimate ? 'animate-slideInRight' : ''
        } ${
          isScrolled ? 'rounded-tl-3xl' : ''
        }`}
        style={{ height: '100vh' }}
      >
        {/* Header - Sticky */}
        <div className={`sticky top-0 z-20 p-6 border-b bg-primary-800 border-primary-900 transition-all duration-300 ${
          isScrolled ? 'rounded-tl-3xl' : ''
        }`}>
          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            {/* Detail page button */}
            <Link
              href={`/works/${selectedWork.workId || selectedWork.id}`}
              className="p-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full transition-all hover:scale-110 shadow-lg"
              title="상세보기"
            >
              <MdFullscreen className="h-5 w-5" />
            </Link>
            {/* Close button */}
            <button
              onClick={() => setSelectedWork(null)}
              className="p-2 bg-white hover:bg-gray-100 rounded-full transition-all hover:scale-110 shadow-lg border border-gray-200"
            >
              <MdClose className="h-5 w-5 text-gray-700" />
            </button>
          </div>

          {/* Title and badges */}
          <div className="pr-24 mb-3">
            <div className="flex items-start gap-2 mb-2 flex-wrap">
              <div className="px-3 py-1 rounded-lg font-mono text-xs font-bold bg-white/20 text-white border border-white/30">
                {getDateString(selectedWork)}
              </div>
              {selectedWork.catalogNumber && (
                <div className="px-3 py-1 bg-white/20 rounded-lg font-mono text-xs font-bold text-white border border-white/30">
                  {selectedWork.catalogNumber}
                </div>
              )}
            </div>

            <h2 className="font-serif text-xl font-bold text-white mb-2">
              {selectedWork.title}
            </h2>

            <div className="flex flex-wrap gap-2 mb-3">
              <div className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                selectedWork.type === 'work'
                  ? 'bg-secondary-600 text-white'
                  : 'bg-accent-500 text-white'
              }`}>
                {selectedWork.type === 'work' ? '작품' : '생애'}
              </div>
              {selectedWork.genre && (
                <div className="px-2.5 py-0.5 bg-white/20 rounded-full text-xs font-bold text-white">
                  {getGenreLabel(selectedWork.genre)}
                </div>
              )}
              {selectedWork.location && (
                <div className="px-2.5 py-0.5 bg-white/20 rounded-full text-xs font-bold text-white flex items-center gap-1">
                  <MdLocationOn className="h-3 w-3" />
                  {selectedWork.location}
                </div>
              )}
            </div>

            {/* 요약 설명 */}
            <p className="font-sans text-xs text-white/90 leading-relaxed mb-3">
              {selectedWork.description}
            </p>

            {/* 기본 정보 - 컴팩트 */}
            {selectedWork.type === 'work' && (
              <div className="flex flex-wrap gap-3 text-xs mb-2">
                {selectedWork.compositionLocation && (
                  <div className="flex items-center gap-1.5 text-white/80">
                    <MdLocationOn className="h-3 w-3" />
                    <span>{selectedWork.compositionLocation}</span>
                  </div>
                )}
                {selectedWork.likesCount !== undefined && (
                  <div className="flex items-center gap-1.5 text-white/80">
                    <MdFavorite className="h-3 w-3 text-accent-300" />
                    <span>{selectedWork.likesCount.toLocaleString()}</span>
                  </div>
                )}
              </div>
            )}

            {/* 추가 카탈로그 번호 - 컴팩트 */}
            {selectedWork.type === 'work' && (selectedWork.catalogNumberFirstEd || selectedWork.catalogNumberNinthEd) && (
              <div className="flex flex-wrap gap-2 text-xs mb-2">
                {selectedWork.catalogNumberFirstEd && (
                  <div className="px-2 py-1 bg-white/10 rounded border border-white/20">
                    <span className="text-white/60 mr-1">1판:</span>
                    <span className="text-white font-bold">{selectedWork.catalogNumberFirstEd}</span>
                  </div>
                )}
                {selectedWork.catalogNumberNinthEd && (
                  <div className="px-2 py-1 bg-white/10 rounded border border-white/20">
                    <span className="text-white/60 mr-1">9판:</span>
                    <span className="text-white font-bold">{selectedWork.catalogNumberNinthEd}</span>
                  </div>
                )}
              </div>
            )}

            {/* 악보 다운로드 링크 */}
            {selectedWork.type === 'work' && selectedWork.sheetMusicUrl && (
              <a
                href={selectedWork.sheetMusicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-lg text-xs font-medium text-white transition-all group"
              >
                <MdArticle className="h-3.5 w-3.5" />
                <span>악보 다운로드</span>
                <MdOpenInNew className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </a>
            )}
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* YouTube - 맨 위로 이동 */}
          {selectedWork.type === 'work' && selectedWork.youtubeUrl && (
            <div className="mb-6">
              {(() => {
                const embedUrl = getYoutubeEmbedUrl(selectedWork.youtubeUrl);
                return embedUrl ? (
                  <div className="rounded-lg overflow-hidden border border-gray-300">
                    <iframe
                      width="100%"
                      height="250"
                      src={embedUrl}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full"
                    ></iframe>
                  </div>
                ) : (
                  <div className="rounded-lg overflow-hidden bg-gray-100 border border-gray-300">
                    <div className="aspect-video bg-gray-200 flex items-center justify-center">
                      <div className="text-center">
                        <MdOndemandVideo className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 text-xs font-sans">
                          유튜브 연동 준비 중
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* 악장 목록 - 두 번째로 이동 */}
          {selectedWork.movements && selectedWork.movements.length > 0 && (
            <div className="mb-6 p-4 rounded-xl border border-gray-200">
              <h3 className="font-serif text-base font-bold text-gray-900 mb-3">
                음악감상
              </h3>
              <div className="space-y-2">
                {selectedWork.movements.map((movement: any) => (
                  <button
                    key={movement.id}
                    onClick={() => setSelectedMovement(movement)}
                    className="w-full text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-400 transition-all duration-300 group cursor-pointer hover:shadow-md"
                  >
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all">
                        <span className="text-white text-xs font-bold">{movement.order}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-sm font-bold text-gray-900 mb-0.5 group-hover:text-gray-700 transition-colors">
                          {movement.title}
                        </h4>
                        {movement.titleEn && (
                          <p className="font-sans text-xs text-gray-500 italic mb-0.5">{movement.titleEn}</p>
                        )}
                        {movement.character && (
                          <p className="font-sans text-xs text-gray-600">{movement.character}</p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}


          {/* 작품 상세 정보 통합 */}
          {(selectedWork.compositionDetails || selectedWork.behindStory || (selectedWork.usageExamples && selectedWork.usageExamples.length > 0)) && (
            <div className="mb-6 p-4 rounded-xl border border-gray-200 space-y-6">
              {/* 작품 설명 */}
              {selectedWork.compositionDetails && (
                <div>
                  <h3 className="font-serif text-base font-bold text-gray-900 mb-2">
                    작품 설명
                  </h3>
                  <p className="font-sans text-xs text-gray-700 leading-relaxed whitespace-pre-line">
                    {selectedWork.compositionDetails}
                  </p>
                </div>
              )}

              {/* 비하인드 스토리 */}
              {selectedWork.behindStory && (
                <div>
                  <h3 className="font-serif text-base font-bold text-gray-900 mb-2">
                    비하인드 스토리
                  </h3>
                  <p className="font-sans text-xs text-gray-700 leading-relaxed whitespace-pre-line">
                    {selectedWork.behindStory}
                  </p>
                </div>
              )}

              {/* 활용 사례 */}
              {selectedWork.usageExamples && selectedWork.usageExamples.length > 0 && (
                <div>
                  <h3 className="font-serif text-base font-bold text-gray-900 mb-3">
                    활용 사례
                  </h3>
                  <div className="space-y-2">
                    {selectedWork.usageExamples.map((example: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        <p className="font-sans text-xs text-gray-700 leading-relaxed">{example}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Mobile: Work Panel (작품 패널) - Bottom Sheet */}
      <div
        className={`md:hidden flex flex-col fixed z-50 bg-white bottom-0 left-0 right-0 h-1/2 shadow-[0_-10px_50px_rgba(0,0,0,0.15)] transition-all duration-300 ${
          shouldAnimate ? 'animate-slideInUp' : ''
        } ${
          isScrolled ? 'rounded-t-3xl' : ''
        }`}
      >
        {/* Header - Sticky */}
        <div className={`sticky top-0 z-20 p-4 border-b bg-primary-800 border-primary-900 transition-all duration-300 ${
          isScrolled ? 'rounded-t-3xl' : ''
        }`}>
          {/* Action buttons */}
          <div className="absolute top-3 right-3 flex gap-2">
            {/* Detail page button */}
            <Link
              href={`/works/${selectedWork.id}`}
              className="p-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full transition-all hover:scale-110 shadow-lg"
              title="상세보기"
            >
              <MdFullscreen className="h-4 w-4" />
            </Link>
            {/* Close button */}
            <button
              onClick={() => setSelectedWork(null)}
              className="p-2 bg-white hover:bg-gray-100 rounded-full transition-all hover:scale-110 shadow-lg border border-gray-200"
            >
              <MdClose className="h-4 w-4 text-gray-700" />
            </button>
          </div>

          <div className="pr-20 mb-2">
            <div className="flex items-start gap-2 mb-2 flex-wrap">
              <div className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-white/20 text-white border border-white/30">
                {getDateString(selectedWork)}
              </div>
              {selectedWork.catalogNumber && (
                <div className="px-2 py-0.5 bg-white/20 rounded font-mono text-xs font-bold text-white border border-white/30">
                  {selectedWork.catalogNumber}
                </div>
              )}
            </div>

            <h2 className="font-serif text-lg font-bold text-white mb-2">
              {selectedWork.title}
            </h2>

            <div className="flex flex-wrap gap-1.5 mb-2">
              <div className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                selectedWork.type === 'work'
                  ? 'bg-secondary-600 text-white'
                  : 'bg-accent-500 text-white'
              }`}>
                {selectedWork.type === 'work' ? '작품' : '생애'}
              </div>
              {selectedWork.genre && (
                <div className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-bold text-white">
                  {getGenreLabel(selectedWork.genre)}
                </div>
              )}
              {selectedWork.location && (
                <div className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-bold text-white flex items-center gap-1">
                  <MdLocationOn className="h-3 w-3" />
                  {selectedWork.location}
                </div>
              )}
            </div>

            {/* 요약 설명 */}
            <p className="font-sans text-xs text-white/90 leading-relaxed mb-2">
              {selectedWork.description}
            </p>

            {/* 기본 정보 - 컴팩트 */}
            {selectedWork.type === 'work' && (
              <div className="flex flex-wrap gap-2 text-xs mb-1.5">
                {selectedWork.compositionLocation && (
                  <div className="flex items-center gap-1 text-white/80">
                    <MdLocationOn className="h-3 w-3" />
                    <span>{selectedWork.compositionLocation}</span>
                  </div>
                )}
                {selectedWork.likesCount !== undefined && (
                  <div className="flex items-center gap-1 text-white/80">
                    <MdFavorite className="h-3 w-3 text-accent-300" />
                    <span>{selectedWork.likesCount.toLocaleString()}</span>
                  </div>
                )}
              </div>
            )}

            {/* 추가 카탈로그 번호 - 컴팩트 */}
            {selectedWork.type === 'work' && (selectedWork.catalogNumberFirstEd || selectedWork.catalogNumberNinthEd) && (
              <div className="flex flex-wrap gap-1.5 text-xs mb-1.5">
                {selectedWork.catalogNumberFirstEd && (
                  <div className="px-1.5 py-0.5 bg-white/10 rounded border border-white/20">
                    <span className="text-white/60 mr-0.5">1판:</span>
                    <span className="text-white font-bold">{selectedWork.catalogNumberFirstEd}</span>
                  </div>
                )}
                {selectedWork.catalogNumberNinthEd && (
                  <div className="px-1.5 py-0.5 bg-white/10 rounded border border-white/20">
                    <span className="text-white/60 mr-0.5">9판:</span>
                    <span className="text-white font-bold">{selectedWork.catalogNumberNinthEd}</span>
                  </div>
                )}
              </div>
            )}

            {/* 악보 다운로드 링크 */}
            {selectedWork.type === 'work' && selectedWork.sheetMusicUrl && (
              <a
                href={selectedWork.sheetMusicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-lg text-xs font-medium text-white transition-all group"
              >
                <MdArticle className="h-3 w-3" />
                <span>악보 다운로드</span>
                <MdOpenInNew className="h-2.5 w-2.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            )}
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* YouTube - 맨 위로 이동 */}
          {selectedWork.type === 'work' && selectedWork.youtubeUrl && (
            <div className="mb-6">
              {(() => {
                const embedUrl = getYoutubeEmbedUrl(selectedWork.youtubeUrl);
                return embedUrl ? (
                  <div className="rounded-lg overflow-hidden border border-gray-300">
                    <iframe
                      width="100%"
                      height="200"
                      src={embedUrl}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full"
                    ></iframe>
                  </div>
                ) : (
                  <div className="rounded-lg overflow-hidden bg-gray-100 border border-gray-300">
                    <div className="aspect-video bg-gray-200 flex items-center justify-center">
                      <div className="text-center">
                        <MdOndemandVideo className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 text-xs font-sans">
                          유튜브 연동 준비 중
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* 악장 목록 - 두 번째로 이동 */}
          {selectedWork.movements && selectedWork.movements.length > 0 && (
            <div className="mb-6 p-3 rounded-xl border border-gray-200">
              <h3 className="font-serif text-sm font-bold text-gray-900 mb-2">
                음악감상
              </h3>
              <div className="space-y-2">
                {selectedWork.movements.map((movement: any) => (
                  <button
                    key={movement.id}
                    onClick={() => setSelectedMovement(movement)}
                    className="w-full text-left p-2.5 bg-white rounded-lg border border-gray-200 hover:border-gray-400 transition-all duration-300 group cursor-pointer hover:shadow-md"
                  >
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all">
                        <span className="text-white text-xs font-bold">{movement.order}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-xs font-bold text-gray-900 mb-0.5 group-hover:text-gray-700 transition-colors">
                          {movement.title}
                        </h4>
                        {movement.titleEn && (
                          <p className="font-sans text-xs text-gray-500 italic mb-0.5">{movement.titleEn}</p>
                        )}
                        {movement.character && (
                          <p className="font-sans text-xs text-gray-600">{movement.character}</p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}


        </div>
      </div>

      <style jsx global>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-slideInUp {
          animation: slideInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
