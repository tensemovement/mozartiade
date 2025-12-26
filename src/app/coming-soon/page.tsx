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
    { value: timeLeft.days, label: '일', labelEn: 'DAYS' },
    { value: timeLeft.hours, label: '시간', labelEn: 'HOURS' },
    { value: timeLeft.minutes, label: '분', labelEn: 'MINUTES' },
    { value: timeLeft.seconds, label: '초', labelEn: 'SECONDS' },
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_70%,rgba(0,0,0,0.8)_100%)]" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
        {/* Logo */}
        <div
          className={`mb-8 transition-all duration-1000 ease-out ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <Image
            src="/images/logo.svg"
            alt="Mozartiade"
            width={200}
            height={60}
            className="drop-shadow-2xl brightness-0 invert"
            priority
          />
        </div>

        {/* Main Slogan */}
        <div
          className={`text-center transition-all duration-1000 delay-300 ease-out ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-cream mb-4 drop-shadow-2xl leading-tight">
            270년의 잠에서 깨어나다
          </h1>
          <p className="font-serif text-lg md:text-xl lg:text-2xl text-white/80 tracking-[0.3em] uppercase drop-shadow-lg">
            Awakening After 270 Years
          </p>
        </div>

        {/* Countdown Timer */}
        <div
          className={`mt-12 md:mt-16 transition-all duration-1000 delay-500 ease-out ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid grid-cols-4 gap-3 md:gap-6">
            {countdownItems.map((item, index) => (
              <div
                key={item.labelEn}
                className="flex flex-col items-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative bg-black/40 backdrop-blur-md border border-white/20 rounded-xl w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 flex items-center justify-center shadow-2xl">
                  <span className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white tabular-nums text-center">
                    {String(item.value).padStart(2, '0')}
                  </span>
                </div>
                <span className="mt-2 md:mt-3 text-xs md:text-sm text-white/60 tracking-wider uppercase">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Grand Open Date */}
        <div
          className={`mt-12 md:mt-16 text-center transition-all duration-1000 delay-700 ease-out ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-4 mb-4">
            <span className="w-12 md:w-20 h-px bg-gradient-to-r from-transparent to-secondary-500" />
            <span className="font-serif text-secondary-400 text-sm md:text-base tracking-[0.2em] uppercase">
              Grand Open
            </span>
            <span className="w-12 md:w-20 h-px bg-gradient-to-l from-transparent to-secondary-500" />
          </div>
          <p className="font-serif text-2xl md:text-4xl lg:text-5xl font-semibold text-white drop-shadow-lg">
            2026. 1. 27
          </p>
        </div>

        {/* Mozart 270th Anniversary Badge */}
        <div
          className={`mt-12 md:mt-16 transition-all duration-1000 delay-1000 ease-out ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex flex-col items-center gap-2 text-white/50">
            <p className="text-xs md:text-sm tracking-[0.15em] uppercase">
              Wolfgang Amadeus Mozart
            </p>
            <p className="font-serif text-lg md:text-xl text-secondary-400 tracking-wider">
              270th Anniversary
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />

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