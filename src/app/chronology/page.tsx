'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { chronologyData } from '@/data/chronology';
import { ChronologyItem } from '@/types';

export default function ChronologyPage() {
  const [selectedItem, setSelectedItem] = useState<ChronologyItem | null>(null);
  const [activeYear, setActiveYear] = useState<number | null>(null);
  const yearRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const yearFilterRef = useRef<HTMLDivElement>(null);
  const yearButtonRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Extract unique years and sort them
  const uniqueYears = Array.from(new Set(chronologyData.map(item => item.year))).sort((a, b) => a - b);

  // Drag scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!yearFilterRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - yearFilterRef.current.offsetLeft);
    setScrollLeft(yearFilterRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !yearFilterRef.current) return;
    e.preventDefault();
    const x = e.pageX - yearFilterRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    yearFilterRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Scroll year filter to center active year button
  const scrollYearFilterToCenter = (year: number) => {
    const filterElement = yearFilterRef.current;
    const buttonElement = yearButtonRefs.current[year];

    if (filterElement && buttonElement) {
      const filterWidth = filterElement.offsetWidth;
      const buttonLeft = buttonElement.offsetLeft;
      const buttonWidth = buttonElement.offsetWidth;
      const scrollLeft = buttonLeft - (filterWidth / 2) + (buttonWidth / 2);

      filterElement.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  };

  // Scroll to year function
  const scrollToYear = (year: number) => {
    const element = yearRefs.current[year];
    if (element) {
      const offset = 150;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveYear(year);
      scrollYearFilterToCenter(year);
    }
  };

  // Track active year based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset + 200;

      for (let i = uniqueYears.length - 1; i >= 0; i--) {
        const year = uniqueYears[i];
        const element = yearRefs.current[year];
        if (element && element.offsetTop <= scrollPosition) {
          if (activeYear !== year) {
            setActiveYear(year);
            scrollYearFilterToCenter(year);
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [uniqueYears, activeYear]);

  const getDateString = (item: ChronologyItem) => {
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

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/m/mozart001.jpg"
            alt="Mozart"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/85 to-secondary-900/90"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-5 py-1.5 bg-accent-500/20 backdrop-blur-sm text-accent-300 rounded-full font-mono text-xs font-bold mb-4 border border-accent-500/30">
              1756 — 1791
            </span>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">
              모차르트 연대기
            </h1>
            <p className="font-sans text-base text-gray-300 leading-relaxed">
              35년의 짧은 생애 동안 626개의 불멸의 작품을 남긴 천재의 발자취
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Year Filter */}
      <div className="sticky top-20 z-40 bg-primary-900 border-b border-accent-500/20 shadow-xl">
        <div
          ref={yearFilterRef}
          className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center gap-2 px-4 py-2 min-w-max">
            {uniqueYears.map((year) => {
              const isActive = activeYear === year;

              return (
                <button
                  key={year}
                  ref={(el) => { yearButtonRefs.current[year] = el; }}
                  onClick={() => scrollToYear(year)}
                  className={`px-4 py-1.5 rounded-lg font-mono text-xs font-bold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-accent-500 text-primary-900 shadow-lg scale-105'
                      : 'bg-primary-800/50 text-accent-300 hover:bg-primary-700 hover:text-accent-200'
                  }`}
                >
                  {year}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-32 top-0 bottom-0 w-px bg-gray-300"></div>

              {/* Timeline items grouped by year */}
              <div className="space-y-12">
                {uniqueYears.map((year) => {
                  const yearItems = chronologyData.filter(item => item.year === year);

                  return (
                    <div key={year} className="relative">
                      {/* Year marker - Sticky */}
                      <div
                        ref={(el) => { yearRefs.current[year] = el; }}
                        className="sticky top-32 z-30 mb-8 pb-2"
                      >
                        <div className="text-gray-900 font-serif text-3xl font-bold">
                          {year}
                        </div>
                      </div>

                      {/* Items for this year */}
                      <div className="space-y-6">
                        {yearItems.map((item) => (
                          <div
                            key={item.id}
                            className="relative flex items-start gap-4 group cursor-pointer"
                            onClick={() => setSelectedItem(item)}
                          >
                        {/* Date column */}
                        <div className="w-32 flex-shrink-0 text-right pr-6">
                          <div className="text-gray-600 font-mono text-xs">
                            {item.month && `${String(item.month).padStart(2, '0')}`}
                            {item.day && `.${String(item.day).padStart(2, '0')}`}
                          </div>
                        </div>

                            {/* Dot on line */}
                            <div className="absolute left-32 top-2 -translate-x-1/2 z-10">
                              <div className="relative">
                                <div className={`w-2 h-2 rounded-full transition-all ${
                                  item.highlight
                                    ? 'bg-secondary-600 shadow-lg shadow-secondary-300'
                                    : 'bg-gray-400 group-hover:bg-secondary-500'
                                }`}></div>
                                {item.highlight && (
                                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-secondary-600 animate-ping opacity-75"></div>
                                )}
                              </div>
                            </div>

                        {/* Card */}
                        <div className="flex-1 pl-4">
                          <div className={`relative bg-white border rounded-lg overflow-hidden transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 ${
                            item.type === 'work'
                              ? 'border-secondary-200 hover:border-secondary-400'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}>
                            {/* Work accent border */}
                            {item.type === 'work' && (
                              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-secondary-600 to-secondary-400"></div>
                            )}

                            <div className="flex gap-3">
                              {/* Content */}
                              <div className={`flex-1 p-4 ${item.type === 'work' ? 'pl-5' : ''}`}>
                                {/* Header */}
                                <div className="flex items-center gap-2 mb-2">
                                  {item.catalogNumber && (
                                    <span className="px-2 py-0.5 bg-accent-100 text-accent-800 border border-accent-200 rounded text-xs font-mono">
                                      {item.catalogNumber}
                                    </span>
                                  )}
                                  {item.genre && (
                                    <span className="px-2 py-0.5 text-gray-500 text-xs">
                                      {item.genre}
                                    </span>
                                  )}
                                </div>

                                {/* Title */}
                                <h3 className="font-serif text-lg font-bold text-gray-900 mb-1">
                                  {item.title}
                                </h3>

                                {/* Description */}
                                <p className="font-sans text-xs text-gray-600 leading-relaxed line-clamp-2">
                                  {item.description}
                                </p>

                                {/* Location */}
                                {item.location && (
                                  <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    </svg>
                                    {item.location}
                                  </div>
                                )}
                              </div>

                              {/* Image */}
                              {item.image && (
                                <div className="w-24 h-24 flex-shrink-0 my-4 mr-4 relative rounded-lg overflow-hidden">
                                  <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                    sizes="96px"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Panel */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-primary-800 border border-accent-500/30 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-slideUp relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button - Sticky */}
            <button
              onClick={() => setSelectedItem(null)}
              className="sticky top-4 right-4 ml-auto mr-4 mt-4 z-50 p-2 bg-white/90 hover:bg-white rounded-full transition-colors shadow-lg float-right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className={`p-6 border-b ${
              selectedItem.type === 'work'
                ? 'bg-secondary-900/50 border-secondary-700/50'
                : 'bg-accent-900/20 border-accent-500/30'
            }`}>

              <div className="flex items-start gap-3 mb-3">
                <div className="px-3 py-1 rounded-lg font-mono text-xs font-bold bg-accent-500/20 text-accent-300 border border-accent-500/30">
                  {getDateString(selectedItem)}
                </div>
                {selectedItem.catalogNumber && (
                  <div className="px-3 py-1 bg-primary-700 rounded-lg font-mono text-xs font-bold text-accent-300 border border-accent-500/30">
                    {selectedItem.catalogNumber}
                  </div>
                )}
              </div>

              <h2 className="font-serif text-3xl font-bold text-white mb-2">
                {selectedItem.title}
              </h2>

              <div className="flex flex-wrap gap-2">
                <div className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  selectedItem.type === 'work'
                    ? 'bg-secondary-700 text-secondary-100'
                    : 'bg-accent-700 text-accent-100'
                }`}>
                  {selectedItem.type === 'work' ? '작품' : '생애'}
                </div>
                {selectedItem.genre && (
                  <div className="px-2.5 py-0.5 bg-primary-700 rounded-full text-xs font-bold text-gray-300">
                    {selectedItem.genre}
                  </div>
                )}
                {selectedItem.location && (
                  <div className="px-2.5 py-0.5 bg-primary-700 rounded-full text-xs font-bold text-gray-300 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {selectedItem.location}
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 bg-white">
              <p className="font-sans text-base text-gray-700 leading-relaxed mb-6">
                {selectedItem.description}
              </p>

              {selectedItem.compositionDetails && (
                <div className="mb-6 p-5 bg-secondary-50 rounded-xl border border-secondary-200">
                  <h3 className="font-serif text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-secondary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    작곡 배경
                  </h3>
                  <p className="font-sans text-sm text-gray-700 leading-relaxed">
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
                      <div className="rounded-xl overflow-hidden border border-gray-300">
                        <iframe
                          width="100%"
                          height="400"
                          src={embedUrl}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full aspect-video"
                        ></iframe>
                      </div>
                    ) : (
                      <div className="rounded-xl overflow-hidden bg-gray-100 border border-gray-300">
                        <div className="aspect-video bg-gray-200 flex items-center justify-center">
                          <div className="text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
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
                      className="block p-4 bg-accent-50 rounded-xl border border-accent-200 hover:border-accent-400 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-accent-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-serif text-base font-bold text-gray-900 mb-0.5">
                            악보 다운로드
                          </h4>
                          <p className="font-sans text-xs text-gray-600">
                            IMSLP에서 무료 악보 열람하기
                          </p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-600 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </a>
                  )}
                </div>
              )}

              {/* Image if available */}
              {selectedItem.image && (
                <div className="mt-6 rounded-xl overflow-hidden border border-gray-300 relative aspect-video">
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        html {
          scroll-behavior: smooth;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
