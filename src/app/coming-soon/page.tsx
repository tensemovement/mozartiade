'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  const targetDate = new Date('2026-01-27T00:00:00+09:00');

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const countdownItems = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
  ];

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

      {/* Cinematic Dark Overlay with Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_60%,rgba(0,0,0,0.7)_100%)]" />

      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary-500/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16">

        {/* Logo & Brand */}
        <div
          className={`mb-12 md:mb-16 transition-all duration-1000 ease-out ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <div className="flex items-center gap-5 md:gap-6">
            <div className="relative">
              <div className="absolute -inset-2 bg-secondary-500/20 rounded-full blur-xl" />
              <Image
                src="/images/logo.svg"
                alt="Mozartiade"
                width={64}
                height={64}
                className="relative drop-shadow-2xl brightness-0 invert md:w-20 md:h-20"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-[0.15em] drop-shadow-2xl">
                MOZARTIADE
              </span>
              <span className="text-xs md:text-sm text-white/50 tracking-[0.3em] uppercase mt-1">
                The Complete Mozart Experience
              </span>
            </div>
          </div>
        </div>

        {/* Decorative Divider */}
        <div
          className={`mb-10 md:mb-12 flex items-center gap-4 transition-all duration-1000 delay-200 ease-out ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-white/30" />
          <span className="text-secondary-400 text-lg">✦</span>
          <span className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-white/30" />
        </div>

        {/* Main Slogan */}
        <div
          className={`text-center transition-all duration-1000 delay-300 ease-out ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-semibold text-white mb-5 drop-shadow-2xl leading-tight tracking-tight">
            모차르트가 온다
          </h1>
          <p className="font-serif text-base md:text-lg lg:text-xl text-white/60 tracking-[0.25em] uppercase">
            Mozart Returns
          </p>
        </div>

        {/* Countdown Timer */}
        <div
          className={`mt-14 md:mt-20 transition-all duration-1000 delay-500 ease-out ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center gap-2 md:gap-4">
            {countdownItems.map((item, index) => (
              <div key={item.label} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-secondary-500/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Timer box */}
                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl w-16 h-20 md:w-24 md:h-28 lg:w-28 lg:h-32 flex flex-col items-center justify-center transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                      <span className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-white tabular-nums tracking-tight">
                        {String(item.value).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] md:text-xs text-white/40 tracking-[0.2em] uppercase mt-1 md:mt-2">
                        {item.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Separator */}
                {index < countdownItems.length - 1 && (
                  <div className="flex flex-col gap-2 mx-1 md:mx-3">
                    <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-white/30" />
                    <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-white/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Grand Open Date */}
        <div
          className={`mt-14 md:mt-20 text-center transition-all duration-1000 delay-700 ease-out ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex flex-col items-center">
            <div className="flex items-center gap-4 mb-3">
              <span className="w-8 md:w-12 h-px bg-secondary-500/50" />
              <span className="text-secondary-400 text-xs md:text-sm tracking-[0.3em] uppercase font-medium">
                Grand Open
              </span>
              <span className="w-8 md:w-12 h-px bg-secondary-500/50" />
            </div>
            <p className="font-serif text-2xl md:text-4xl font-light text-white tracking-wider">
              2026. 1. 27
            </p>
          </div>
        </div>

        {/* Mozart Anniversary Badge */}
        <div
          className={`mt-16 md:mt-24 transition-all duration-1000 delay-900 ease-out ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex flex-col items-center gap-3 px-8 py-4 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <span className="text-white/30 text-xs">♪</span>
              <p className="text-xs md:text-sm text-white/50 tracking-[0.2em] uppercase">
                Wolfgang Amadeus Mozart
              </p>
              <span className="text-white/30 text-xs">♪</span>
            </div>
            <p className="font-serif text-base md:text-lg text-secondary-400 tracking-[0.15em]">
              270th Anniversary
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <div className="h-px bg-gradient-to-r from-transparent via-secondary-500/30 to-transparent" />
        <div className="h-32 bg-gradient-to-t from-black/50 to-transparent" />
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
      `}</style>
    </div>
  );
}
