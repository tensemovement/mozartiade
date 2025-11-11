'use client';

import { useEffect } from 'react';
import { Aria } from '@/types';
import { MdClose, MdPlayArrow, MdPerson, MdTimer, MdStars } from 'react-icons/md';

interface AriaPanelProps {
  aria: Aria | null;
  onClose: () => void;
}

export default function AriaPanel({ aria, onClose }: AriaPanelProps) {
  // ESC 키로 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (aria) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [aria, onClose]);

  if (!aria) {
    return null;
  }

  // YouTube ID 추출
  const getYouTubeId = (url?: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const youtubeId = getYouTubeId(aria.youtubeUrl);

  return (
    <>
      {/* 오버레이 */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 animate-fadeIn"
        onClick={onClose}
      />

      {/* 패널 */}
      <div className="fixed right-0 top-0 bottom-0 w-full md:w-[600px] lg:w-[700px] bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 z-50 overflow-y-auto animate-slideInRight shadow-2xl">
        <div className="relative">
          {/* 헤더 */}
          <div className="sticky top-0 z-10 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-md border-b border-white/10 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg font-bold">{aria.order}</span>
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-white leading-tight">
                    {aria.title}
                  </h2>
                </div>
                {aria.titleEn && (
                  <p className="font-serif text-accent/90 italic text-lg ml-13">
                    {aria.titleEn}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:rotate-90 duration-300 flex-shrink-0"
                aria-label="닫기"
              >
                <MdClose className="text-white text-2xl" />
              </button>
            </div>
          </div>

          {/* 컨텐츠 */}
          <div className="p-6 space-y-6">
            {/* 메타 정보 */}
            <div className="flex flex-wrap gap-3">
              {aria.character && (
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <MdPerson className="text-accent text-lg" />
                  <span className="text-white text-sm font-medium">{aria.character}</span>
                </div>
              )}
              {aria.duration && (
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <MdTimer className="text-accent text-lg" />
                  <span className="text-white text-sm font-medium">{aria.duration}</span>
                </div>
              )}
            </div>

            {/* YouTube 플레이어 */}
            {youtubeId && (
              <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&rel=0`}
                    title={aria.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}

            {/* 설명 */}
            {aria.description && (
              <div className="glass-card rounded-2xl p-6 border border-white/20">
                <h3 className="font-serif text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <MdPlayArrow className="text-accent" />
                  곡 설명
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {aria.description}
                </p>
              </div>
            )}

            {/* 하이라이트 */}
            {aria.highlights && (
              <div className="glass-card rounded-2xl p-6 border border-white/20">
                <h3 className="font-serif text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <MdStars className="text-accent" />
                  감상 포인트
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {aria.highlights}
                </p>
              </div>
            )}

            {/* 듣기 버튼 (YouTube URL이 있는 경우) */}
            {aria.youtubeUrl && (
              <a
                href={aria.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full px-8 py-4 bg-accent hover:bg-accent/90 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-2xl flex items-center justify-center gap-2"
              >
                <MdPlayArrow className="text-2xl group-hover:scale-110 transition-transform" />
                YouTube에서 전체 감상하기
              </a>
            )}
          </div>

          {/* 장식적 요소 */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10" />
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
