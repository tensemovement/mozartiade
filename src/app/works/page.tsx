'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { selectedWorkState } from '@/store/atoms';
import { formatVoteCount } from '@/utils/format';
import { MdFavorite, MdSearch, MdSentimentDissatisfied, MdGridView, MdViewList, MdMusicNote, MdArticle, MdVisibility } from 'react-icons/md';
import { Work } from '@/types';
import { GENRE_OPTIONS, getGenreLabel, GenreCode, INSTRUMENT_OPTIONS, InstrumentCode, getInstrumentLabel } from '@/lib/constants';

export default function WorksPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedWork, setSelectedWork] = useRecoilState(selectedWorkState);

  // Initialize state from URL parameters
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedGenre, setSelectedGenre] = useState<string>(searchParams.get('genre') || 'all');
  const [selectedInstrument, setSelectedInstrument] = useState<string>(searchParams.get('instrument') || 'all');
  const [sortOrder, setSortOrder] = useState<'year-asc' | 'year-desc' | 'title' | 'catalog-asc' | 'catalog-desc' | 'likes-desc'>(
    (searchParams.get('sort') as any) || 'year-desc'
  );
  const [viewMode, setViewMode] = useState<'grid' | 'list'>((searchParams.get('view') as any) || 'grid');
  const [allWorks, setAllWorks] = useState<Work[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Update URL when filters change
  const updateURL = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== '') {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });

    router.push(`/works?${newParams.toString()}`, { scroll: false });
  };

  // Handle filter changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    updateURL({ search: value, genre: selectedGenre, instrument: selectedInstrument, sort: sortOrder, view: viewMode });
  };

  const handleGenreChange = (value: string) => {
    setSelectedGenre(value);
    updateURL({ search: searchQuery, genre: value, instrument: selectedInstrument, sort: sortOrder, view: viewMode });
  };

  const handleInstrumentChange = (value: string) => {
    setSelectedInstrument(value);
    updateURL({ search: searchQuery, genre: selectedGenre, instrument: value, sort: sortOrder, view: viewMode });
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value as any);
    updateURL({ search: searchQuery, genre: selectedGenre, instrument: selectedInstrument, sort: value, view: viewMode });
  };

  const handleViewModeChange = (value: 'grid' | 'list') => {
    setViewMode(value);
    updateURL({ search: searchQuery, genre: selectedGenre, instrument: selectedInstrument, sort: sortOrder, view: value });
  };

  // Fetch works from API
  useEffect(() => {
    async function fetchWorks() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/works?limit=1000');
        const result = await response.json();

        if (result.success) {
          setAllWorks(result.data.works);
        } else {
          setError(result.error || 'Failed to fetch works');
        }
      } catch (err) {
        setError('Failed to fetch works');
        console.error('Error fetching works:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWorks();
  }, []);

  // Genre options from constants
  const genres = useMemo(() => {
    return ['all', ...GENRE_OPTIONS.map(option => option.code)];
  }, []);

  // Instrument options from constants
  const instruments = useMemo(() => {
    return ['all', ...INSTRUMENT_OPTIONS.map(option => option.code)];
  }, []);

  // Filter and sort works
  const filteredWorks = useMemo(() => {
    let filtered = [...allWorks];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(work =>
        work.title.toLowerCase().includes(query) ||
        work.titleEn?.toLowerCase().includes(query) ||
        work.catalogNumber?.toLowerCase().includes(query) ||
        work.description.toLowerCase().includes(query)
      );
    }

    // Genre filter
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(work => work.genre === selectedGenre);
    }

    // Instrument filter (based on work's instruments array)
    if (selectedInstrument !== 'all') {
      filtered = filtered.filter(work => {
        return work.instruments && work.instruments.includes(selectedInstrument as InstrumentCode);
      });
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortOrder) {
        case 'year-asc': {
          // Year ascending with compositionOrder for precise chronological sorting
          const yearDiff = a.year - b.year;
          if (yearDiff !== 0) return yearDiff;

          const orderA = (a as any).compositionOrder ?? 9999;
          const orderB = (b as any).compositionOrder ?? 9999;
          if (orderA !== orderB) return orderA - orderB;

          const monthDiff = (a.month || 99) - (b.month || 99);
          if (monthDiff !== 0) return monthDiff;

          return (a.day || 99) - (b.day || 99);
        }
        case 'year-desc': {
          // Year descending with compositionOrder
          const yearDiff = b.year - a.year;
          if (yearDiff !== 0) return yearDiff;

          const orderA = (a as any).compositionOrder ?? 0;
          const orderB = (b as any).compositionOrder ?? 0;
          if (orderA !== orderB) return orderB - orderA;

          const monthDiff = (b.month || 0) - (a.month || 0);
          if (monthDiff !== 0) return monthDiff;

          return (b.day || 0) - (a.day || 0);
        }
        case 'title':
          return a.title.localeCompare(b.title);
        case 'catalog-asc': {
          const numA = (a as any).catalogNumberNumeric ?? 9999;
          const numB = (b as any).catalogNumberNumeric ?? 9999;
          if (numA !== numB) return numA - numB;
          const suffixA = (a as any).catalogNumberSuffix || '';
          const suffixB = (b as any).catalogNumberSuffix || '';
          return suffixA.localeCompare(suffixB);
        }
        case 'catalog-desc': {
          const numA = (a as any).catalogNumberNumeric ?? 0;
          const numB = (b as any).catalogNumberNumeric ?? 0;
          if (numA !== numB) return numB - numA;
          const suffixA = (a as any).catalogNumberSuffix || '';
          const suffixB = (b as any).catalogNumberSuffix || '';
          return suffixB.localeCompare(suffixA);
        }
        case 'likes-desc': {
          const likesA = (a as any).likesCount ?? 0;
          const likesB = (b as any).likesCount ?? 0;
          return likesB - likesA;
        }
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
            src="/images/o/sheet001.webp"
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
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <MdSearch className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Instrument Filter */}
            <div className="w-full lg:w-40">
              <select
                value={selectedInstrument}
                onChange={(e) => handleInstrumentChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {instruments.map((instrument) => (
                  <option key={instrument} value={instrument}>
                    {instrument === 'all' ? '모든 악기' : getInstrumentLabel(instrument as InstrumentCode)}
                  </option>
                ))}
              </select>
            </div>

            {/* Genre Filter */}
            <div className="w-full lg:w-40">
              <select
                value={selectedGenre}
                onChange={(e) => handleGenreChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre === 'all' ? '모든 장르' : getGenreLabel(genre)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div className="w-full lg:w-48">
              <select
                value={sortOrder}
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="likes-desc">인기순</option>
                <option value="year-desc">최신순</option>
                <option value="year-asc">오래된순</option>
                <option value="catalog-asc">작품번호순 (오름차순)</option>
                <option value="catalog-desc">작품번호순 (내림차순)</option>
                <option value="title">제목순</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => handleViewModeChange('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title="카드 뷰"
              >
                <MdGridView className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleViewModeChange('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list'
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title="리스트 뷰"
              >
                <MdViewList className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-3 text-sm text-gray-600">
            총 <span className="font-bold text-primary-700">{filteredWorks.length}</span>개의 작품
          </div>
        </div>
      </div>

      {/* Works Grid/List Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-500 text-lg">작품 목록을 불러오는 중...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <MdSentimentDissatisfied className="h-16 w-16 mx-auto text-red-400 mb-4" />
              <p className="text-red-500 text-lg mb-2">데이터를 불러올 수 없습니다</p>
              <p className="text-gray-500 text-sm">{error}</p>
            </div>
          ) : filteredWorks.length === 0 ? (
            <div className="text-center py-20">
              <MdSentimentDissatisfied className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg">검색 결과가 없습니다</p>
            </div>
          ) : viewMode === 'grid' ? (
            /* Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorks.map((work) => (
                <Link
                  key={work.id}
                  href={`/works/${work.id}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 border border-gray-100"
                >
                  {/* Header with K number */}
                  <div className="relative h-28 bg-gray-100 flex items-center justify-center overflow-hidden">
                    {work.image && (
                      <Image
                        src={work.image}
                        alt={work.title}
                        fill
                        className="object-cover opacity-40"
                      />
                    )}
                    <div className="relative text-center z-10">
                      <div className="font-serif text-4xl font-bold text-gray-900 mb-1 drop-shadow-sm">
                        {work.catalogNumber}
                      </div>
                      <div className="text-sm font-sans text-gray-800 font-semibold drop-shadow-sm">
                        {work.year}
                        {work.month && `.${String(work.month).padStart(2, '0')}`}
                      </div>
                    </div>
                    {/* Genre badge - Top Left */}
                    {work.genre && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full font-sans text-xs font-semibold z-10 shadow-sm">
                        {getGenreLabel(work.genre)}
                      </div>
                    )}
                    {/* Panel open button - Top Right */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedWork({ ...work, type: 'work' as const });
                      }}
                      className="absolute top-3 right-3 p-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all hover:scale-110 shadow-md z-10"
                      title="작품 패널 열기"
                    >
                      <MdVisibility className="h-4 w-4" />
                    </button>
                    {/* Vote count badge */}
                    {work.voteCount && (
                      <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-rose-100/90 backdrop-blur-sm text-rose-800 rounded-full font-sans text-xs font-semibold z-10 shadow-sm flex items-center gap-1">
                        <MdFavorite className="h-3 w-3" />
                        {formatVoteCount(work.voteCount)}
                      </div>
                    )}
                    {/* Right bottom badges: Music & Sheet Music */}
                    {(work.youtubeUrl || work.sheetMusicUrl) && (
                      <div className="absolute bottom-3 right-3 flex gap-1.5 z-10">
                        {work.youtubeUrl && (
                          <div className="px-2.5 py-1 bg-purple-100/90 backdrop-blur-sm text-purple-800 rounded-full font-sans text-xs font-semibold shadow-sm flex items-center gap-1" title="음악 감상 가능">
                            <MdMusicNote className="h-3 w-3" />
                          </div>
                        )}
                        {work.sheetMusicUrl && (
                          <div className="px-2.5 py-1 bg-accent-100/90 backdrop-blur-sm text-accent-800 rounded-full font-sans text-xs font-semibold shadow-sm flex items-center gap-1" title="악보 보기 가능">
                            <MdArticle className="h-3 w-3" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 relative">
                    <h3 className="font-serif text-lg font-bold text-gray-900 mb-1 group-hover:text-primary-700 transition-colors line-clamp-2">
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
                </Link>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-3">
              {filteredWorks.map((work) => (
                <Link
                  key={work.id}
                  href={`/works/${work.id}`}
                  className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 hover:border-primary-300 block"
                >
                  <div className="flex items-center gap-4 p-4">
                    {/* Left: K Number & Year */}
                    <div className="flex-shrink-0 text-center w-24">
                      <div className="font-serif text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors">
                        {work.catalogNumber}
                      </div>
                      <div className="text-xs font-sans text-gray-500 mt-0.5">
                        {work.year}
                        {work.month && `.${String(work.month).padStart(2, '0')}`}
                      </div>
                    </div>

                    {/* Center: Title & Genre */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-serif text-base font-bold text-gray-900 group-hover:text-primary-700 transition-colors truncate">
                          {work.title}
                        </h3>
                        {work.genre && (
                          <span className="flex-shrink-0 px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-semibold">
                            {getGenreLabel(work.genre)}
                          </span>
                        )}
                      </div>
                      {work.titleEn && (
                        <p className="font-sans text-sm text-gray-500 italic truncate">
                          {work.titleEn}
                        </p>
                      )}
                    </div>

                    {/* Right: Actions & Vote Count */}
                    <div className="flex-shrink-0 flex items-center gap-3">
                      {work.voteCount && (
                        <div className="flex items-center gap-1 px-2.5 py-1 bg-rose-50 text-rose-700 rounded-full text-xs font-semibold">
                          <MdFavorite className="h-3 w-3" />
                          {formatVoteCount(work.voteCount)}
                        </div>
                      )}
                      {work.youtubeUrl && (
                        <div className="flex items-center gap-1 px-2.5 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold" title="음악 감상 가능">
                          <MdMusicNote className="h-3 w-3" />
                        </div>
                      )}
                      {work.sheetMusicUrl && (
                        <div className="flex items-center gap-1 px-2.5 py-1 bg-accent-50 text-accent-700 rounded-full text-xs font-semibold" title="악보 보기 가능">
                          <MdArticle className="h-3 w-3" />
                        </div>
                      )}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedWork({ ...work, type: 'work' as const });
                        }}
                        className="p-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all hover:scale-110 shadow-sm"
                        title="작품 패널 열기"
                      >
                        <MdVisibility className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div className="h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
                </Link>
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
