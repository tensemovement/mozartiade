'use client';

import { useState, useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedItemState, selectedMovementState } from '@/store/atoms';
import Image from 'next/image';
import { MdFullscreen, MdClose, MdLocationOn, MdDescription, MdArticle, MdOpenInNew, MdOndemandVideo } from 'react-icons/md';

export default function WorkPanel() {
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState);
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
    if (selectedItem) {
      setSelectedMovement(null);
    }
  }, [selectedItem, setSelectedMovement]);

  // 애니메이션 제어: 다른 패널에서 전환되는 경우 애니메이션 없음
  useEffect(() => {
    if (selectedItem) {
      // 이전에 악장패널이 열려있었다면 애니메이션 없음 (패널 전환)
      // 이전에 아무것도 없었다면 애니메이션 적용 (새로 열림)
      setShouldAnimate(prevMovementRef.current === null);
    }
    prevMovementRef.current = selectedMovement;
  }, [selectedItem, selectedMovement]);

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

  if (!selectedItem) return null;

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
            {/* Fullscreen button */}
            <button
              onClick={() => {
                // TODO: 상세페이지로 전환
                console.log('Navigate to detail page:', selectedItem.id);
              }}
              className="p-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full transition-all hover:scale-110 shadow-lg"
              title="전체 화면으로 보기"
            >
              <MdFullscreen className="h-5 w-5" />
            </button>
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
              {getDateString(selectedItem)}
            </div>
            {selectedItem.catalogNumber && (
              <div className="px-3 py-1 bg-white/20 rounded-lg font-mono text-xs font-bold text-white border border-white/30">
                {selectedItem.catalogNumber}
              </div>
            )}
          </div>

          <h2 className="font-serif text-2xl font-bold text-white mb-3 pr-24">
            {selectedItem.title}
          </h2>

          <div className="flex flex-wrap gap-2 pr-24">
            <div className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
              selectedItem.type === 'work'
                ? 'bg-secondary-600 text-white'
                : 'bg-accent-500 text-white'
            }`}>
              {selectedItem.type === 'work' ? '작품' : '생애'}
            </div>
            {selectedItem.genre && (
              <div className="px-2.5 py-0.5 bg-white/20 rounded-full text-xs font-bold text-white">
                {selectedItem.genre}
              </div>
            )}
            {selectedItem.location && (
              <div className="px-2.5 py-0.5 bg-white/20 rounded-full text-xs font-bold text-white flex items-center gap-1">
                <MdLocationOn className="h-3 w-3" />
                {selectedItem.location}
              </div>
            )}
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-8">
          <p className="font-sans text-sm text-gray-700 leading-relaxed mb-6">
            {selectedItem.description}
          </p>

          {selectedItem.compositionDetails && (
            <div className="mb-6 p-4 bg-secondary-50 rounded-xl border border-secondary-200">
              <h3 className="font-serif text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
                <MdDescription className="h-4 w-4 text-secondary-600" />
                작곡 배경
              </h3>
              <p className="font-sans text-xs text-gray-700 leading-relaxed">
                {selectedItem.compositionDetails}
              </p>
            </div>
          )}

          {/* YouTube and Sheet Music */}
          {selectedItem.type === 'work' && (
            <div className="space-y-3">
              {selectedItem.youtubeUrl && (() => {
                const embedUrl = getYoutubeEmbedUrl(selectedItem.youtubeUrl);
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

              {selectedItem.sheetMusicUrl && (
                <a
                  href={selectedItem.sheetMusicUrl}
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

          {/* Image if available */}
          {selectedItem.image && (
            <div className="mt-6 rounded-lg overflow-hidden border border-gray-300 relative aspect-video">
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
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
            {/* Fullscreen button */}
            <button
              onClick={() => {
                // TODO: 상세페이지로 전환
                console.log('Navigate to detail page:', selectedItem.id);
              }}
              className="p-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full transition-all hover:scale-110 shadow-lg"
              title="전체 화면으로 보기"
            >
              <MdFullscreen className="h-5 w-5" />
            </button>
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
              {getDateString(selectedItem)}
            </div>
            {selectedItem.catalogNumber && (
              <div className="px-3 py-1 bg-white/20 rounded-lg font-mono text-xs font-bold text-white border border-white/30">
                {selectedItem.catalogNumber}
              </div>
            )}
          </div>

          <h2 className="font-serif text-2xl font-bold text-white mb-3 pr-24">
            {selectedItem.title}
          </h2>

          <div className="flex flex-wrap gap-2 pr-24">
            <div className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
              selectedItem.type === 'work'
                ? 'bg-secondary-600 text-white'
                : 'bg-accent-500 text-white'
            }`}>
              {selectedItem.type === 'work' ? '작품' : '생애'}
            </div>
            {selectedItem.genre && (
              <div className="px-2.5 py-0.5 bg-white/20 rounded-full text-xs font-bold text-white">
                {selectedItem.genre}
              </div>
            )}
            {selectedItem.location && (
              <div className="px-2.5 py-0.5 bg-white/20 rounded-full text-xs font-bold text-white flex items-center gap-1">
                <MdLocationOn className="h-3 w-3" />
                {selectedItem.location}
              </div>
            )}
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-8">
          <p className="font-sans text-sm text-gray-700 leading-relaxed mb-6">
            {selectedItem.description}
          </p>

          {selectedItem.compositionDetails && (
            <div className="mb-6 p-4 bg-secondary-50 rounded-xl border border-secondary-200">
              <h3 className="font-serif text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
                <MdDescription className="h-4 w-4 text-secondary-600" />
                작곡 배경
              </h3>
              <p className="font-sans text-xs text-gray-700 leading-relaxed">
                {selectedItem.compositionDetails}
              </p>
            </div>
          )}

          {/* YouTube and Sheet Music */}
          {selectedItem.type === 'work' && (
            <div className="space-y-3">
              {selectedItem.youtubeUrl && (() => {
                const embedUrl = getYoutubeEmbedUrl(selectedItem.youtubeUrl);
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

              {selectedItem.sheetMusicUrl && (
                <a
                  href={selectedItem.sheetMusicUrl}
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

          {/* Image if available */}
          {selectedItem.image && (
            <div className="mt-6 rounded-lg overflow-hidden border border-gray-300 relative aspect-video">
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
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
