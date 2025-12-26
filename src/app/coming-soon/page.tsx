'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { MdPlayArrow, MdPause } from 'react-icons/md';

export default function ComingSoonPage() {
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 첫 클릭 시 음악 시작
  useEffect(() => {
    const startMusic = () => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // 브라우저가 autoplay를 차단한 경우
        });
      }
      document.removeEventListener('click', startMusic);
      document.removeEventListener('touchstart', startMusic);
    };

    document.addEventListener('click', startMusic);
    document.addEventListener('touchstart', startMusic);

    return () => {
      document.removeEventListener('click', startMusic);
      document.removeEventListener('touchstart', startMusic);
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background Image with Slow Zoom Animation */}
      <div className="absolute inset-0 animate-slow-zoom">
        <Image
          src="/images/m/mozart001.jpg"
          alt="Wolfgang Amadeus Mozart"
          fill
          priority
          className="object-cover object-center"
          quality={90}
        />
      </div>

      {/* Cinematic Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_70%,rgba(0,0,0,0.8)_100%)]" />

      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-secondary-500/30" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16">

        {/* Logo & Brand */}
        <div
          className={`mb-16 md:mb-20 transition-all duration-1000 ease-out ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <div className="flex items-center gap-5 md:gap-6">
            <div className="relative">
              <div className="absolute -inset-3 bg-secondary-500/15 rounded-full blur-2xl" />
              <Image
                src="/images/logo.svg"
                alt="Mozartiade"
                width={56}
                height={56}
                className="relative drop-shadow-2xl brightness-0 invert md:w-16 md:h-16"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-[0.2em] drop-shadow-2xl">
                MOZARTIADE
              </span>
              <span className="text-[10px] md:text-xs text-white/40 tracking-[0.25em] uppercase mt-1">
                The Complete Mozart Experience
              </span>
            </div>
          </div>
        </div>

        {/* Decorative Divider */}
        <div
          className={`mb-12 md:mb-16 flex items-center gap-6 transition-all duration-1000 delay-200 ease-out ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="w-12 md:w-20 h-px bg-white/20" />
          <span className="text-secondary-400/80 text-sm">✦</span>
          <span className="w-12 md:w-20 h-px bg-white/20" />
        </div>

        {/* Main Slogan */}
        <div
          className={`text-center transition-all duration-1000 delay-300 ease-out ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4 drop-shadow-2xl leading-tight tracking-tight">
            모차르트가 온다
          </h1>
          <p className="font-serif text-sm md:text-base text-white/50 tracking-[0.3em] uppercase">
            Mozart Returns
          </p>
        </div>

        {/* Grand Open Date */}
        <div
          className={`mt-16 md:mt-24 text-center transition-all duration-1000 delay-500 ease-out ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-secondary-400/80 text-[10px] md:text-xs tracking-[0.4em] uppercase mb-3">
            Grand Open
          </p>
          <p className="font-serif text-xl md:text-2xl lg:text-3xl font-light text-white tracking-widest">
            2026. 1. 27
          </p>
        </div>

        {/* Mozart Anniversary Badge */}
        <div
          className={`mt-20 md:mt-28 transition-all duration-1000 delay-700 ease-out ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex items-center gap-4 px-6 py-3 border border-white/10 rounded-full">
            <span className="text-white/25 text-xs">♪</span>
            <div className="text-center">
              <p className="text-[10px] text-white/40 tracking-[0.2em] uppercase">
                Wolfgang Amadeus Mozart
              </p>
              <p className="font-serif text-sm md:text-base text-secondary-400/90 tracking-[0.1em] mt-0.5">
                270th Anniversary
              </p>
            </div>
            <span className="text-white/25 text-xs">♪</span>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-secondary-500/20" />

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="https://mozartiade.s3.ap-northeast-2.amazonaws.com/music/andantino.mp3"
        loop
        preload="auto"
      />

      {/* Music Player - Fixed Bottom */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-1000 delay-1000 ease-out ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="flex items-center gap-3 px-4 py-2.5 bg-black/50 backdrop-blur-md border border-white/10 rounded-full">
          {/* Equalizer Bars */}
          <div className="flex items-end gap-[3px] h-4 w-5">
            <span className={`equalizer-bar ${isPlaying ? 'animate-equalizer-1' : ''}`} />
            <span className={`equalizer-bar ${isPlaying ? 'animate-equalizer-2' : ''}`} />
            <span className={`equalizer-bar ${isPlaying ? 'animate-equalizer-3' : ''}`} />
            <span className={`equalizer-bar ${isPlaying ? 'animate-equalizer-4' : ''}`} />
          </div>

          {/* Track Info */}
          <div className="flex flex-col">
            <span className="text-[10px] text-white/40 tracking-wide">Now Playing</span>
            <span className="text-xs text-white/70 font-medium max-w-[200px] md:max-w-none truncate">
              Mozart - Concerto for Flute and Harp, K. 299: II. Andantino
            </span>
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="ml-2 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
            aria-label={isPlaying ? '일시정지' : '재생'}
          >
            {isPlaying ? (
              <MdPause className="w-4 h-4 text-white/80" />
            ) : (
              <MdPlayArrow className="w-4 h-4 text-white/80" />
            )}
          </button>
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style jsx global>{`
        @keyframes slow-zoom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.1);
          }
        }
        .animate-slow-zoom {
          animation: slow-zoom 30s ease-out forwards;
        }

        /* Equalizer Bar Styles */
        .equalizer-bar {
          width: 3px;
          height: 4px;
          background-color: rgba(255, 255, 255, 0.6);
          border-radius: 1px;
          transition: height 0.1s ease;
        }

        @keyframes equalizer-1 {
          0%, 100% { height: 4px; }
          50% { height: 14px; }
        }
        @keyframes equalizer-2 {
          0%, 100% { height: 6px; }
          50% { height: 10px; }
        }
        @keyframes equalizer-3 {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        @keyframes equalizer-4 {
          0%, 100% { height: 8px; }
          50% { height: 12px; }
        }

        .animate-equalizer-1 {
          animation: equalizer-1 0.8s ease-in-out infinite;
        }
        .animate-equalizer-2 {
          animation: equalizer-2 0.6s ease-in-out infinite;
          animation-delay: 0.1s;
        }
        .animate-equalizer-3 {
          animation: equalizer-3 0.7s ease-in-out infinite;
          animation-delay: 0.2s;
        }
        .animate-equalizer-4 {
          animation: equalizer-4 0.5s ease-in-out infinite;
          animation-delay: 0.15s;
        }
      `}</style>
    </div>
  );
}
