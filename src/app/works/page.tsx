'use client';

import { useState, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { worksData } from '@/data/works';
import { selectedItemState } from '@/store/atoms';

export default function WorksPage() {
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedInstrument, setSelectedInstrument] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'year-asc' | 'year-desc' | 'title'>('year-desc');

  // Use works data
  const allWorks = useMemo(() => worksData, []);

  // Extract unique genres and instruments
  const genres = useMemo(() => {
    const uniqueGenres = Array.from(new Set(allWorks.map(work => work.genre).filter(Boolean)));
    return ['all', ...uniqueGenres];
  }, [allWorks]);

  // Map instruments from genres (simplified categorization)
  const instruments = useMemo(() => {
    return ['all', '피아노', '오케스트라', '성악', '실내악'];
  }, []);

  // Filter and sort works
  const filteredWorks = useMemo(() => {
    let filtered = [...allWorks];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(work =>
        work.title.toLowerCase().includes(query) ||
        work.catalogNumber?.toLowerCase().includes(query) ||
        work.description.toLowerCase().includes(query)
      );
    }

    // Genre filter
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(work => work.genre === selectedGenre);
    }

    // Instrument filter (based on genre mapping)
    if (selectedInstrument !== 'all') {
      filtered = filtered.filter(work => {
        const genre = work.genre || '';
        switch (selectedInstrument) {
          case '피아노':
            return genre.includes('피아노') || genre.includes('협주곡');
          case '오케스트라':
            return genre.includes('교향곡') || genre.includes('협주곡');
          case '성악':
            return genre.includes('오페라') || genre.includes('종교음악') || genre.includes('성악');
          case '실내악':
            return genre.includes('실내악') || genre.includes('세레나데');
          default:
            return true;
        }
      });
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortOrder) {
        case 'year-asc':
          return a.year - b.year;
        case 'year-desc':
          return b.year - a.year;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [allWorks, searchQuery, selectedGenre, selectedInstrument, sortOrder]);

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/m/mozart002.jpg"
            alt="Mozart Works"
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/75 to-secondary-900/80"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-5 py-1.5 bg-accent-500/20 backdrop-blur-sm text-accent-300 rounded-full font-mono text-xs font-bold mb-4 border border-accent-500/30">
              626 작품
            </span>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">
              모차르트 작품 목록
            </h1>
            <p className="font-sans text-base text-gray-300 leading-relaxed">
              천재 작곡가가 남긴 불멸의 걸작들을 탐험하세요
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <div className="sticky top-20 z-40 bg-white border-b border-gray-200 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="작품명, K번호로 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Instrument Filter */}
            <div className="w-full lg:w-40">
              <select
                value={selectedInstrument}
                onChange={(e) => setSelectedInstrument(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {instruments.map((instrument) => (
                  <option key={instrument} value={instrument}>
                    {instrument === 'all' ? '모든 악기' : instrument}
                  </option>
                ))}
              </select>
            </div>

            {/* Genre Filter */}
            <div className="w-full lg:w-40">
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre === 'all' ? '모든 장르' : genre}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div className="w-full lg:w-40">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="year-desc">최신순</option>
                <option value="year-asc">오래된순</option>
                <option value="title">제목순</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-3 text-sm text-gray-600">
            총 <span className="font-bold text-primary-700">{filteredWorks.length}</span>개의 작품
          </div>
        </div>
      </div>

      {/* Works Grid Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {filteredWorks.length === 0 ? (
            <div className="text-center py-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-gray-500 text-lg">검색 결과가 없습니다</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorks.map((work) => (
                <div
                  key={work.id}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 border border-gray-100"
                  onClick={() => setSelectedItem({ ...work, type: 'work' as const })}
                >
                  {/* Header with K number */}
                  <div className="relative h-28 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center overflow-hidden">
                    {work.image && (
                      <Image
                        src={work.image}
                        alt={work.title}
                        fill
                        className="object-cover opacity-40"
                      />
                    )}
                    <div className="relative text-center z-10">
                      <div className="font-mono text-3xl font-bold text-primary-900 mb-1 drop-shadow-sm">
                        {work.catalogNumber}
                      </div>
                      <div className="text-xs font-sans text-primary-800 font-semibold drop-shadow-sm">
                        {work.year}
                        {work.month && `.${String(work.month).padStart(2, '0')}`}
                      </div>
                    </div>
                    {/* Genre badge */}
                    {work.genre && (
                      <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full font-sans text-xs font-semibold z-10 shadow-sm">
                        {work.genre}
                      </div>
                    )}
                    {work.highlight && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-accent-500 text-white rounded-full font-sans text-xs font-bold z-10 shadow-sm">
                        인기
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 relative">
                    {/* Fullscreen Icon */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: 상세페이지로 전환
                        console.log('Navigate to detail page:', work.id);
                      }}
                      className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-primary-100 rounded-lg transition-all hover:scale-110 shadow-sm border border-gray-200 z-10"
                      title="전체화면으로 보기"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </button>

                    <h3 className="font-serif text-lg font-bold text-gray-900 mb-1 group-hover:text-primary-700 transition-colors line-clamp-2 pr-10">
                      {work.title}
                    </h3>
                    {work.titleEn && (
                      <p className="font-sans text-sm text-gray-500 italic mb-3">
                        {work.titleEn}
                      </p>
                    )}
                    <p className="font-sans text-sm text-gray-600 line-clamp-3">
                      {work.description}
                    </p>
                  </div>

                  {/* Bottom accent */}
                  <div className="h-1 bg-gradient-to-r from-primary-600 to-secondary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />

      <style jsx global>{`
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
