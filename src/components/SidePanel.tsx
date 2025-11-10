'use client';

import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { selectedItemState } from '@/store/atoms';
import Image from 'next/image';

export default function SidePanel() {
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      {/* Desktop: Side Panel - Fixed on right */}
      <div
        className={`hidden md:flex md:flex-col fixed top-0 right-0 bg-white z-50 w-1/3 animate-slideInRight shadow-[0_0_50px_rgba(0,0,0,0.15)] transition-all duration-300 ${
          isScrolled ? 'rounded-l-3xl' : ''
        }`}
        style={{ height: '100vh' }}
      >
        {/* Header - Sticky */}
        <div className={`sticky top-0 z-20 p-8 border-b bg-primary-800 border-primary-900 transition-all duration-300 ${
          isScrolled ? 'rounded-tl-3xl' : ''
        }`}>
          {/* Close button */}
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-6 right-6 p-2 bg-white hover:bg-gray-100 rounded-full transition-all hover:scale-110 shadow-lg border border-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex items-start gap-2 mb-3 flex-wrap pr-12">
            <div className="px-3 py-1 rounded-lg font-mono text-xs font-bold bg-white/20 text-white border border-white/30">
              {getDateString(selectedItem)}
            </div>
            {selectedItem.catalogNumber && (
              <div className="px-3 py-1 bg-white/20 rounded-lg font-mono text-xs font-bold text-white border border-white/30">
                {selectedItem.catalogNumber}
              </div>
            )}
          </div>

          <h2 className="font-serif text-2xl font-bold text-white mb-3 pr-12">
            {selectedItem.title}
          </h2>

          <div className="flex flex-wrap gap-2 pr-12">
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-secondary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
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
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                        </svg>
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
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm font-bold text-gray-900 mb-0.5">
                        악보 다운로드
                      </h4>
                      <p className="font-sans text-xs text-gray-600">
                        IMSLP에서 무료 악보 열람하기
                      </p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent-600 group-hover:translate-x-1 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
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

      {/* Mobile: Bottom Sheet Panel */}
      <div
        className={`md:hidden flex flex-col fixed z-50 bg-white bottom-0 left-0 right-0 h-1/2 shadow-[0_-10px_50px_rgba(0,0,0,0.15)] animate-slideInUp transition-all duration-300 ${
          isScrolled ? 'rounded-t-3xl' : ''
        }`}
      >
        {/* Header - Sticky */}
        <div className={`sticky top-0 z-20 p-6 border-b bg-primary-800 border-primary-900 transition-all duration-300 ${
          isScrolled ? 'rounded-t-3xl' : ''
        }`}>
          {/* Close button */}
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-4 right-4 p-2 bg-white hover:bg-gray-100 rounded-full transition-all hover:scale-110 shadow-lg border border-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex items-start gap-2 mb-3 flex-wrap pr-12">
            <div className="px-3 py-1 rounded-lg font-mono text-xs font-bold bg-white/20 text-white border border-white/30">
              {getDateString(selectedItem)}
            </div>
            {selectedItem.catalogNumber && (
              <div className="px-3 py-1 bg-white/20 rounded-lg font-mono text-xs font-bold text-white border border-white/30">
                {selectedItem.catalogNumber}
              </div>
            )}
          </div>

          <h2 className="font-serif text-2xl font-bold text-white mb-3 pr-12">
            {selectedItem.title}
          </h2>

          <div className="flex flex-wrap gap-2 pr-12">
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-secondary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
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
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                        </svg>
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
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm font-bold text-gray-900 mb-0.5">
                        악보 다운로드
                      </h4>
                      <p className="font-sans text-xs text-gray-600">
                        IMSLP에서 무료 악보 열람하기
                      </p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent-600 group-hover:translate-x-1 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
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
