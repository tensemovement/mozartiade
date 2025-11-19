'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { selectedItemState } from '@/store/atoms';
import { formatVoteCount } from '@/utils/format';
import { MdFavorite, MdLocationOn, MdMusicNote, MdLibraryMusic } from 'react-icons/md';
import { ChronologyItem } from '@/types';

export default function ChronologyPage() {
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState);
  const [activeYear, setActiveYear] = useState<number | null>(null);
  const [chronologyData, setChronologyData] = useState<ChronologyItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const yearRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const yearFilterRef = useRef<HTMLDivElement>(null);
  const yearButtonRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  // Fetch chronicles from API
  useEffect(() => {
    const fetchChronicles = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/chronicles');
        const result = await response.json();

        if (result.success) {
          setChronologyData(result.data);
        } else {
          console.error('Failed to fetch chronicles:', result.error);
        }
      } catch (error) {
        console.error('Error fetching chronicles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChronicles();
  }, []);

  // Extract unique years and sort them
  const uniqueYears = Array.from(new Set(chronologyData.map(item => item.year))).sort((a, b) => a - b);

  // Drag scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!yearFilterRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - yearFilterRef.current.offsetLeft);
    setScrollLeft(yearFilterRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !yearFilterRef.current) return;
    e.preventDefault();
    const x = e.pageX - yearFilterRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    yearFilterRef.current.scrollLeft = scrollLeft - walk;

    // Mark as dragged if moved more than 5 pixels
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Reset hasDragged after a short delay to allow click prevention
    setTimeout(() => setHasDragged(false), 10);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setTimeout(() => setHasDragged(false), 10);
  };

  // Scroll year filter to center active year button
  const scrollYearFilterToCenter = useCallback((year: number) => {
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
  }, []);

  // Scroll to year function
  const scrollToYear = useCallback((year: number) => {
    const element = yearRefs.current[year];
    if (element) {
      // Navigation height (80px) + Year filter height (~48px) + margin (~20px)
      const offset = 148;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveYear(year);
      scrollYearFilterToCenter(year);
    }
  }, [scrollYearFilterToCenter]);

  // Track active year based on scroll position
  const handleScroll = useCallback(() => {
    const scrollPosition = window.pageYOffset;
    const offset = 200; // offset for determining which year is active

    for (let i = uniqueYears.length - 1; i >= 0; i--) {
      const year = uniqueYears[i];
      const element = yearRefs.current[year];
      if (element) {
        const elementTop = element.getBoundingClientRect().top + scrollPosition;
        if (elementTop <= scrollPosition + offset) {
          setActiveYear(prevActiveYear => {
            if (prevActiveYear !== year) {
              scrollYearFilterToCenter(year);
              return year;
            }
            return prevActiveYear;
          });
          break;
        }
      }
    }
  }, [uniqueYears, scrollYearFilterToCenter]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

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
              className="object-cover opacity-80"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/75 to-secondary-900/80"></div>
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
                    onClick={(e) => {
                      // Prevent click if we just finished dragging
                      if (hasDragged) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                      }
                      scrollToYear(year);
                    }}
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
              {/* Loading State */}
              {isLoading && (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-accent-500 border-r-transparent"></div>
                    <p className="mt-4 text-gray-600">연대기를 불러오는 중...</p>
                  </div>
                </div>
              )}

              {/* Empty State */}
              {!isLoading && chronologyData.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-gray-600">연대기 데이터가 없습니다.</p>
                </div>
              )}

              {/* Timeline */}
              {!isLoading && chronologyData.length > 0 && (
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
                        className="sticky top-[148px] z-30 mb-8 pb-2"
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
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                  {item.catalogNumber && (
                                    <span className="px-2 py-0.5 bg-accent-100 text-accent-800 border border-accent-200 rounded text-xs font-mono">
                                      {item.catalogNumber}
                                    </span>
                                  )}
                                  {item.type === 'work' && item.genre && (
                                    <span className="px-2 py-0.5 bg-secondary-100 text-secondary-800 border border-secondary-200 rounded text-xs font-sans font-medium">
                                      {item.genre}
                                    </span>
                                  )}
                                  {item.type === 'work' && item.voteCount && (
                                    <span className="px-2 py-0.5 bg-rose-100 text-rose-800 border border-rose-200 rounded text-xs font-sans font-medium flex items-center gap-1">
                                      <MdFavorite className="h-3 w-3" />
                                      {formatVoteCount(item.voteCount)}
                                    </span>
                                  )}
                                  {item.youtubeUrl && (
                                    <span className="px-2 py-0.5 bg-purple-100 text-purple-800 border border-purple-200 rounded text-xs font-sans font-medium flex items-center gap-1" title="음악 감상 가능">
                                      <MdMusicNote className="h-3 w-3" />
                                    </span>
                                  )}
                                  {item.sheetMusicUrl && (
                                    <span className="px-2 py-0.5 bg-teal-100 text-teal-800 border border-teal-200 rounded text-xs font-sans font-medium flex items-center gap-1" title="악보 보기 가능">
                                      <MdLibraryMusic className="h-3 w-3" />
                                    </span>
                                  )}
                                </div>

                                {/* Title */}
                                <h3 className="font-serif text-lg font-bold text-gray-900 mb-1">
                                  {item.title}
                                </h3>
                                {item.titleEn && (
                                  <p className="font-sans text-xs text-gray-500 italic mb-1">
                                    {item.titleEn}
                                  </p>
                                )}

                                {/* Description */}
                                <p className="font-sans text-xs text-gray-600 leading-relaxed line-clamp-2">
                                  {item.description}
                                </p>

                                {/* Location */}
                                {item.location && (
                                  <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                                    <MdLocationOn className="h-3 w-3" />
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
              )}
            </div>
          </div>
        </section>

      <Footer />

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
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
