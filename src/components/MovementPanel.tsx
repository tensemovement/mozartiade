'use client';

import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { selectedMovementState, selectedItemState } from '@/store/atoms';
import { MdClose, MdPlayArrow, MdPerson, MdTimer, MdStars } from 'react-icons/md';

export default function MovementPanel() {
  const [movement, setMovement] = useRecoilState(selectedMovementState);
  const [, setSelectedItem] = useRecoilState(selectedItemState);
  const [isScrolled, setIsScrolled] = useState(false);

  // Window scroll 감지 (SidePanel과 동일)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ESC 키로 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMovement(null);
      }
    };

    if (movement) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [movement, setMovement]);

  // 패널이 열릴 때 다른 패널 닫기
  useEffect(() => {
    if (movement) {
      setSelectedItem(null);
    }
  }, [movement, setSelectedItem]);

  if (!movement) {
    return null;
  }

  // YouTube ID 추출
  const getYouTubeId = (url?: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const youtubeId = getYouTubeId(movement.youtubeUrl);

  return (
    <>
      {/* Desktop: Side Panel - Fixed on right */}
      <div
        className={`hidden md:flex md:flex-col fixed top-0 right-0 bg-white z-50 w-1/3 animate-slideInRight shadow-[0_0_50px_rgba(0,0,0,0.15)] transition-all duration-300 ${
          isScrolled ? 'rounded-tl-3xl' : ''
        }`}
        style={{ height: '100vh' }}
      >
        {/* Header - Sticky */}
        <div className={`sticky top-0 z-20 p-8 border-b bg-primary-800 border-primary-900 transition-all duration-300 ${
          isScrolled ? 'rounded-tl-3xl' : ''
        }`}>
          {/* Close button */}
          <div className="absolute top-6 right-6">
            <button
              onClick={() => setMovement(null)}
              className="p-2 bg-white hover:bg-gray-100 rounded-full transition-all hover:scale-110 shadow-lg border border-gray-200"
            >
              <MdClose className="h-5 w-5 text-gray-700" />
            </button>
          </div>

          {/* Order badge */}
          <div className="flex items-start gap-2 mb-3 flex-wrap pr-24">
            <div className="px-3 py-1 rounded-lg font-mono text-xs font-bold bg-white/20 text-white border border-white/30">
              악장 {movement.order}
            </div>
            {movement.duration && (
              <div className="px-3 py-1 bg-white/20 rounded-lg font-mono text-xs font-bold text-white border border-white/30 flex items-center gap-1">
                <MdTimer className="h-3 w-3" />
                {movement.duration}
              </div>
            )}
          </div>

          <h2 className="font-serif text-2xl font-bold text-white mb-2 pr-24">
            {movement.title}
          </h2>

          {movement.titleEn && (
            <p className="font-serif text-base text-white/80 italic mb-3 pr-24">
              {movement.titleEn}
            </p>
          )}

          <div className="flex flex-wrap gap-2 pr-24">
            <div className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-secondary-600 text-white">
              세부악장
            </div>
            {movement.character && (
              <div className="px-2.5 py-0.5 bg-white/20 rounded-full text-xs font-bold text-white flex items-center gap-1">
                <MdPerson className="h-3 w-3" />
                {movement.character}
              </div>
            )}
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Description */}
          {movement.description && (
            <div className="mb-6">
              <p className="font-sans text-sm text-gray-700 leading-relaxed">
                {movement.description}
              </p>
            </div>
          )}

          {/* Highlights */}
          {movement.highlights && (
            <div className="mb-6 p-4 bg-secondary-50 rounded-xl border border-secondary-200">
              <h3 className="font-serif text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
                <MdStars className="h-4 w-4 text-secondary-600" />
                감상 포인트
              </h3>
              <p className="font-sans text-xs text-gray-700 leading-relaxed">
                {movement.highlights}
              </p>
            </div>
          )}

          {/* YouTube 플레이어 */}
          {youtubeId && (
            <div className="mb-6 rounded-lg overflow-hidden border border-gray-300">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&rel=0`}
                title={movement.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full aspect-video"
              />
            </div>
          )}

          {/* YouTube 링크 버튼 */}
          {movement.youtubeUrl && (
            <a
              href={movement.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 bg-accent-50 rounded-lg border border-accent-200 hover:border-accent-400 transition-all group"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-accent-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <MdPlayArrow className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-sm font-bold text-gray-900 mb-0.5">
                    YouTube에서 감상하기
                  </h4>
                  <p className="font-sans text-xs text-gray-600">
                    새 탭에서 전체 영상 보기
                  </p>
                </div>
              </div>
            </a>
          )}
        </div>
      </div>

      {/* Mobile: Bottom Sheet Panel */}
      <div
        className={`md:hidden flex flex-col fixed z-50 bg-white bottom-0 left-0 right-0 h-2/3 shadow-[0_-10px_50px_rgba(0,0,0,0.15)] animate-slideInUp transition-all duration-300 ${
          isScrolled ? 'rounded-t-3xl' : ''
        }`}
      >
        {/* Header - Sticky */}
        <div className={`sticky top-0 z-20 p-6 border-b bg-primary-800 border-primary-900 transition-all duration-300 ${
          isScrolled ? 'rounded-t-3xl' : ''
        }`}>
          {/* Close button */}
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setMovement(null)}
              className="p-2 bg-white hover:bg-gray-100 rounded-full transition-all hover:scale-110 shadow-lg border border-gray-200"
            >
              <MdClose className="h-5 w-5 text-gray-700" />
            </button>
          </div>

          {/* Order badge */}
          <div className="flex items-start gap-2 mb-3 flex-wrap pr-16">
            <div className="px-3 py-1 rounded-lg font-mono text-xs font-bold bg-white/20 text-white border border-white/30">
              악장 {movement.order}
            </div>
            {movement.duration && (
              <div className="px-3 py-1 bg-white/20 rounded-lg font-mono text-xs font-bold text-white border border-white/30 flex items-center gap-1">
                <MdTimer className="h-3 w-3" />
                {movement.duration}
              </div>
            )}
          </div>

          <h2 className="font-serif text-xl font-bold text-white mb-2 pr-16">
            {movement.title}
          </h2>

          {movement.titleEn && (
            <p className="font-serif text-sm text-white/80 italic mb-3 pr-16">
              {movement.titleEn}
            </p>
          )}

          <div className="flex flex-wrap gap-2 pr-16">
            <div className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-secondary-600 text-white">
              세부악장
            </div>
            {movement.character && (
              <div className="px-2.5 py-0.5 bg-white/20 rounded-full text-xs font-bold text-white flex items-center gap-1">
                <MdPerson className="h-3 w-3" />
                {movement.character}
              </div>
            )}
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Description */}
          {movement.description && (
            <div className="mb-6">
              <p className="font-sans text-sm text-gray-700 leading-relaxed">
                {movement.description}
              </p>
            </div>
          )}

          {/* Highlights */}
          {movement.highlights && (
            <div className="mb-6 p-4 bg-secondary-50 rounded-xl border border-secondary-200">
              <h3 className="font-serif text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
                <MdStars className="h-4 w-4 text-secondary-600" />
                감상 포인트
              </h3>
              <p className="font-sans text-xs text-gray-700 leading-relaxed">
                {movement.highlights}
              </p>
            </div>
          )}

          {/* YouTube 플레이어 */}
          {youtubeId && (
            <div className="mb-6 rounded-lg overflow-hidden border border-gray-300">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&rel=0`}
                title={movement.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full aspect-video"
              />
            </div>
          )}

          {/* YouTube 링크 버튼 */}
          {movement.youtubeUrl && (
            <a
              href={movement.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 bg-accent-50 rounded-lg border border-accent-200 hover:border-accent-400 transition-all group"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-accent-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <MdPlayArrow className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-sm font-bold text-gray-900 mb-0.5">
                    YouTube에서 감상하기
                  </h4>
                  <p className="font-sans text-xs text-gray-600">
                    새 탭에서 전체 영상 보기
                  </p>
                </div>
              </div>
            </a>
          )}
        </div>
      </div>

      <style jsx global>{`
        .animate-slideInRight {
          animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-slideInUp {
          animation: slideInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
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
