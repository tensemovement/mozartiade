'use client';

import { useState, useEffect } from 'react';
import { useAdminApi } from '@/hooks/useAdminApi';
import { MdClose, MdSearch, MdCheck } from 'react-icons/md';

interface Work {
  id: string;
  catalogNumber: string;
  title: string;
  genre: string;
  year: number;
  month: number | null;
  day: number | null;
  highlight: boolean;
}

interface WorkSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (workId: string, work: Work) => void;
  selectedWorkId?: string;
}

export default function WorkSelectModal({
  isOpen,
  onClose,
  onSelect,
  selectedWorkId,
}: WorkSelectModalProps) {
  const { get } = useAdminApi();
  const [works, setWorks] = useState<Work[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalWorks, setTotalWorks] = useState(0);

  const [filters, setFilters] = useState({
    search: '',
    genre: '',
    yearFrom: '',
    yearTo: '',
  });

  useEffect(() => {
    if (isOpen) {
      fetchGenres();
      fetchWorks();
    }
  }, [isOpen, currentPage, filters]);

  const fetchGenres = async () => {
    try {
      const data = await get<string[]>('/api/works/genres');
      setGenres(data);
    } catch (error) {
      console.error('Failed to fetch genres:', error);
    }
  };

  const fetchWorks = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', currentPage.toString());
      params.append('limit', '10');
      params.append('sort', 'catalogNumber');
      params.append('order', 'asc');

      if (filters.search) params.append('search', filters.search);
      if (filters.genre) params.append('genre', filters.genre);

      const data = await get<any>(`/api/admin/works?${params.toString()}`);

      let filteredWorks = data.works || [];

      // Client-side year filtering
      if (filters.yearFrom) {
        filteredWorks = filteredWorks.filter(
          (work: Work) => work.year >= parseInt(filters.yearFrom)
        );
      }
      if (filters.yearTo) {
        filteredWorks = filteredWorks.filter(
          (work: Work) => work.year <= parseInt(filters.yearTo)
        );
      }

      setWorks(filteredWorks);
      setTotalPages(data.totalPages || 1);
      setTotalWorks(data.total || 0);
    } catch (error) {
      console.error('Failed to fetch works:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
    setCurrentPage(1);
  };

  const handleSelect = (work: Work) => {
    onSelect(work.id, work);
    onClose();
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      genre: '',
      yearFrom: '',
      yearTo: '',
    });
    setCurrentPage(1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">작품 선택</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <MdClose className="w-6 h-6" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                검색 (제목, 카탈로그 번호)
              </label>
              <div className="relative">
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  placeholder="검색어를 입력하세요"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Genre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                장르
              </label>
              <select
                value={filters.genre}
                onChange={(e) => handleFilterChange('genre', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
              >
                <option value="">전체 장르</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            {/* Year From */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                연도
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={filters.yearFrom}
                  onChange={(e) => handleFilterChange('yearFrom', e.target.value)}
                  placeholder="시작"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                />
                <span className="text-gray-500">~</span>
                <input
                  type="number"
                  value={filters.yearTo}
                  onChange={(e) => handleFilterChange('yearTo', e.target.value)}
                  placeholder="종료"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>

          {/* Reset Button */}
          {(filters.search || filters.genre || filters.yearFrom || filters.yearTo) && (
            <div className="mt-4">
              <button
                onClick={resetFilters}
                className="text-sm text-slate-600 hover:text-slate-800 underline"
              >
                필터 초기화
              </button>
            </div>
          )}
        </div>

        {/* Works List */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-900 border-t-transparent"></div>
            </div>
          ) : works.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">검색 결과가 없습니다.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {works.map((work) => (
                <div
                  key={work.id}
                  className={`flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition cursor-pointer ${
                    selectedWorkId === work.id
                      ? 'border-slate-500 bg-slate-50'
                      : 'border-gray-200'
                  }`}
                  onClick={() => handleSelect(work)}
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm text-gray-600">
                        {work.catalogNumber}
                      </span>
                      {work.highlight && (
                        <span className="text-yellow-500">⭐</span>
                      )}
                    </div>
                    <h3 className="font-medium text-gray-900 mt-1">
                      {work.title}
                    </h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>{work.genre}</span>
                      <span>•</span>
                      <span>{work.year}년</span>
                    </div>
                  </div>
                  {selectedWorkId === work.id && (
                    <MdCheck className="w-6 h-6 text-slate-600 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Pagination */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            총 {totalWorks}개 작품
          </div>

          {totalPages > 1 && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                이전
              </button>
              <span className="text-sm text-gray-600">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                다음
              </button>
            </div>
          )}

          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
