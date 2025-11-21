'use client';

import { useState, useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedWorkState, selectedMovementState } from '@/store/atoms';
import Image from 'next/image';
import Link from 'next/link';
import { MdFullscreen, MdClose, MdLocationOn, MdDescription, MdArticle, MdOpenInNew, MdOndemandVideo, MdFavorite, MdMusicNote } from 'react-icons/md';

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
      return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
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
        <div className={`sticky top-0 z-20 p-8 border-b bg-primary-800 border-primary-900 transition-all duration-300 ${
          isScrolled ? 'rounded-tl-3xl' : ''
        }`}>
          {/* Action buttons */}
          <div className="absolute top-6 right-6 flex gap-2">
            {/* Detail page button */}
            <Link
              href={`/works/${selectedWork.id}`}
              className="p-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full transition-all hover:scale-110 shadow-lg"
              title="상세보기"
            >
              <MdFullscreen className="h-5 w-5" />
            </Link>
            {/* Close button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="p-2 bg-white hover:bg-gray-100 rounded-full transition-all hover:scale-110 shadow-lg border border-gray-200"
            >
              <MdClose className="h-5 w-5 text-gray-700" />
            </button>
          </div>
          <div className="flex items-start gap-2 mb-3 flex-wrap pr-24">
            <div className="px-3 py-1 rounded-lg font-mono text-xs font-bold bg-white/20 text-white border border-white/30">
              {getDateString(selectedWork)}
            </div>
            {selectedWork.catalogNumber && (
              <div className="px-3 py-1 bg-white/20 rounded-lg font-mono text-xs font-bold text-white border border-white/30">
                {selectedWork.catalogNumber}
              </div>
            )}
          </div>

          <h2 className="font-serif text-2xl font-bold text-white mb-3 pr-24">
            {selectedWork.title}
          </h2>

          <div className="flex flex-wrap gap-2 pr-24">
            <div className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
              selectedWork.type === 'work'
                ? 'bg-secondary-600 text-white'
                : 'bg-accent-500 text-white'
            }`}>
              {selectedWork.type === 'work' ? '작품' : '생애'}
            </div>
            {selectedWork.genre && (
              <div className="px-2.5 py-0.5 bg-white/20 rounded-full text-xs font-bold text-white">
                {selectedWork.genre}
              </div>
            )}
            {selectedWork.location && (
              <div className="px-2.5 py-0.5 bg-white/20 rounded-full text-xs font-bold text-white flex items-center gap-1">
                <MdLocationOn className="h-3 w-3" />
                {selectedWork.location}
              </div>
            )}
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-8">
          <p className="font-sans text-sm text-gray-700 leading-relaxed mb-6">
            {selectedWork.description}
          </p>

          {/* 작품 기본 정보 */}
          {selectedWork.type === 'work' && (
            <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="font-serif text-base font-bold text-gray-900 mb-3">
                기본 정보
              </h3>
              <div className="space-y-2">
                {selectedWork.compositionLocation && (
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase min-w-[60px]">작곡 장소</span>
                    <span className="text-sm text-gray-900">{selectedWork.compositionLocation}</span>
                  </div>
                )}
                {selectedWork.voteCount !== undefined && (
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase min-w-[60px]">좋아요</span>
                    <span className="text-sm text-gray-900 flex items-center gap-1">
                      <MdFavorite className="text-accent h-4 w-4" />
                      {selectedWork.voteCount.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {/* 카탈로그 번호 */}
              {(selectedWork.catalogNumberFirstEd || selectedWork.catalogNumberNinthEd) && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">추가 카탈로그 번호</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedWork.catalogNumberFirstEd && (
                      <div className="bg-white p-2 rounded-lg border border-gray-200">
                        <p className="text-xs text-gray-500 mb-0.5">1판 (1862)</p>
                        <p className="text-sm font-bold text-gray-900">{selectedWork.catalogNumberFirstEd}</p>
                      </div>
                    )}
                    {selectedWork.catalogNumberNinthEd && (
                      <div className="bg-white p-2 rounded-lg border border-gray-200">
                        <p className="text-xs text-gray-500 mb-0.5">9판 (2024)</p>
                        <p className="text-sm font-bold text-gray-900">{selectedWork.catalogNumberNinthEd}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {selectedWork.compositionDetails && (
            <div className="mb-6 p-4 bg-secondary-50 rounded-xl border border-secondary-200">
              <h3 className="font-serif text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
                <MdDescription className="h-4 w-4 text-secondary-600" />
                작곡 배경
              </h3>
              <p className="font-sans text-xs text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedWork.compositionDetails}
              </p>
            </div>
          )}

          {/* 비하인드 스토리 */}
          {selectedWork.behindStory && (
            <div className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
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
            <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="font-serif text-base font-bold text-gray-900 mb-3">
                공연 & 활용 사례
              </h3>
              <div className="space-y-2">
                {selectedWork.usageExamples.map((example: string, index: number) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                    <p className="font-sans text-xs text-gray-700 leading-relaxed">{example}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* YouTube and Sheet Music */}
          {selectedWork.type === 'work' && (
            <div className="space-y-3 mb-6">
              {selectedWork.youtubeUrl && (() => {
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

              {selectedWork.sheetMusicUrl && (
                <a
                  href={selectedWork.sheetMusicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-accent-50 rounded-lg border border-accent-200 hover:border-accent-400 transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-accent-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                      <MdArticle className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm font-bold text-gray-900 mb-0.5">
                        악보 다운로드
                      </h4>
                      <p className="font-sans text-xs text-gray-600">
                        IMSLP에서 무료 악보 열람하기
                      </p>
                    </div>
                    <MdOpenInNew className="h-4 w-4 text-accent-600 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </div>
                </a>
              )}
            </div>
          )}

          {/* 악장 목록 */}
          {selectedWork.movements && selectedWork.movements.length > 0 && (
            <div className="mb-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <h3 className="font-serif text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                <MdMusicNote className="h-4 w-4 text-amber-600" />
                음악감상
              </h3>
              <div className="space-y-2">
                {selectedWork.movements.map((movement: any) => (
                  <div
                    key={movement.id}
                    className="p-3 bg-white rounded-lg border border-amber-200 hover:border-amber-400 transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 w-6 h-6 rounded-full bg-amber-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">{movement.order}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-sm font-bold text-gray-900 mb-0.5">
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
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Image if available */}
          {selectedWork.image && (
            <div className="mt-6 rounded-lg overflow-hidden border border-gray-300 relative aspect-video">
              <Image
                src={selectedWork.image}
                alt={selectedWork.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
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
        <div className={`sticky top-0 z-20 p-6 border-b bg-primary-800 border-primary-900 transition-all duration-300 ${
          isScrolled ? 'rounded-t-3xl' : ''
        }`}>
          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            {/* Detail page button */}
            <Link
              href={`/works/${selectedWork.id}`}
              className="p-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full transition-all hover:scale-110 shadow-lg"
              title="상세보기"
            >
              <MdFullscreen className="h-5 w-5" />
            </Link>
            {/* Close button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="p-2 bg-white hover:bg-gray-100 rounded-full transition-all hover:scale-110 shadow-lg border border-gray-200"
            >
              <MdClose className="h-5 w-5 text-gray-700" />
            </button>
          </div>

          <div className="flex items-start gap-2 mb-3 flex-wrap pr-24">
            <div className="px-3 py-1 rounded-lg font-mono text-xs font-bold bg-white/20 text-white border border-white/30">
              {getDateString(selectedWork)}
            </div>
            {selectedWork.catalogNumber && (
              <div className="px-3 py-1 bg-white/20 rounded-lg font-mono text-xs font-bold text-white border border-white/30">
                {selectedWork.catalogNumber}
              </div>
            )}
          </div>

          <h2 className="font-serif text-2xl font-bold text-white mb-3 pr-24">
            {selectedWork.title}
          </h2>

          <div className="flex flex-wrap gap-2 pr-24">
            <div className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
              selectedWork.type === 'work'
                ? 'bg-secondary-600 text-white'
                : 'bg-accent-500 text-white'
            }`}>
              {selectedWork.type === 'work' ? '작품' : '생애'}
            </div>
            {selectedWork.genre && (
              <div className="px-2.5 py-0.5 bg-white/20 rounded-full text-xs font-bold text-white">
                {selectedWork.genre}
              </div>
            )}
            {selectedWork.location && (
              <div className="px-2.5 py-0.5 bg-white/20 rounded-full text-xs font-bold text-white flex items-center gap-1">
                <MdLocationOn className="h-3 w-3" />
                {selectedWork.location}
              </div>
            )}
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-8">
          <p className="font-sans text-sm text-gray-700 leading-relaxed mb-6">
            {selectedWork.description}
          </p>

          {/* 작품 기본 정보 */}
          {selectedWork.type === 'work' && (
            <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="font-serif text-base font-bold text-gray-900 mb-3">
                기본 정보
              </h3>
              <div className="space-y-2">
                {selectedWork.compositionLocation && (
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase min-w-[60px]">작곡 장소</span>
                    <span className="text-sm text-gray-900">{selectedWork.compositionLocation}</span>
                  </div>
                )}
                {selectedWork.voteCount !== undefined && (
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase min-w-[60px]">좋아요</span>
                    <span className="text-sm text-gray-900 flex items-center gap-1">
                      <MdFavorite className="text-accent h-4 w-4" />
                      {selectedWork.voteCount.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {/* 카탈로그 번호 */}
              {(selectedWork.catalogNumberFirstEd || selectedWork.catalogNumberNinthEd) && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">추가 카탈로그 번호</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedWork.catalogNumberFirstEd && (
                      <div className="bg-white p-2 rounded-lg border border-gray-200">
                        <p className="text-xs text-gray-500 mb-0.5">1판 (1862)</p>
                        <p className="text-sm font-bold text-gray-900">{selectedWork.catalogNumberFirstEd}</p>
                      </div>
                    )}
                    {selectedWork.catalogNumberNinthEd && (
                      <div className="bg-white p-2 rounded-lg border border-gray-200">
                        <p className="text-xs text-gray-500 mb-0.5">9판 (2024)</p>
                        <p className="text-sm font-bold text-gray-900">{selectedWork.catalogNumberNinthEd}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {selectedWork.compositionDetails && (
            <div className="mb-6 p-4 bg-secondary-50 rounded-xl border border-secondary-200">
              <h3 className="font-serif text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
                <MdDescription className="h-4 w-4 text-secondary-600" />
                작곡 배경
              </h3>
              <p className="font-sans text-xs text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedWork.compositionDetails}
              </p>
            </div>
          )}

          {/* 비하인드 스토리 */}
          {selectedWork.behindStory && (
            <div className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
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
            <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="font-serif text-base font-bold text-gray-900 mb-3">
                공연 & 활용 사례
              </h3>
              <div className="space-y-2">
                {selectedWork.usageExamples.map((example: string, index: number) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                    <p className="font-sans text-xs text-gray-700 leading-relaxed">{example}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* YouTube and Sheet Music */}
          {selectedWork.type === 'work' && (
            <div className="space-y-3 mb-6">
              {selectedWork.youtubeUrl && (() => {
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

              {selectedWork.sheetMusicUrl && (
                <a
                  href={selectedWork.sheetMusicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-accent-50 rounded-lg border border-accent-200 hover:border-accent-400 transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-accent-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                      <MdArticle className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm font-bold text-gray-900 mb-0.5">
                        악보 다운로드
                      </h4>
                      <p className="font-sans text-xs text-gray-600">
                        IMSLP에서 무료 악보 열람하기
                      </p>
                    </div>
                    <MdOpenInNew className="h-4 w-4 text-accent-600 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </div>
                </a>
              )}
            </div>
          )}

          {/* 악장 목록 */}
          {selectedWork.movements && selectedWork.movements.length > 0 && (
            <div className="mb-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <h3 className="font-serif text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                <MdMusicNote className="h-4 w-4 text-amber-600" />
                음악감상
              </h3>
              <div className="space-y-2">
                {selectedWork.movements.map((movement: any) => (
                  <div
                    key={movement.id}
                    className="p-3 bg-white rounded-lg border border-amber-200 hover:border-amber-400 transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 w-6 h-6 rounded-full bg-amber-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">{movement.order}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-sm font-bold text-gray-900 mb-0.5">
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
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Image if available */}
          {selectedWork.image && (
            <div className="mt-6 rounded-lg overflow-hidden border border-gray-300 relative aspect-video">
              <Image
                src={selectedWork.image}
                alt={selectedWork.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
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
