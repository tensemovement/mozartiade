'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ConfirmModal from '@/components/admin/ConfirmModal';
import EmptyState from '@/components/admin/EmptyState';
import { useAdminApi } from '@/hooks/useAdminApi';
import { Work } from '@/types';
import { MdAdd, MdEdit, MdDelete, MdSearch, MdMusicNote, MdFilterList, MdClose } from 'react-icons/md';

export default function WorksManagementPage() {
  const [works, setWorks] = useState<Work[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; work: Work | null }>({
    isOpen: false,
    work: null,
  });

  const [filters, setFilters] = useState({
    search: '',
    genre: '',
    yearFrom: '',
    yearTo: '',
    highlight: '',
    sort: 'year',
    order: 'desc',
  });

  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const { get, del } = useAdminApi();

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchWorks();
  }, [pagination.page, filters]);

  const fetchGenres = async () => {
    try {
      const response = await fetch('/api/works/genres');
      const data = await response.json();
      if (data.success && data.data) {
        setGenres(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch genres:', error);
    }
  };

  const fetchWorks = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        ...(filters.search && { search: filters.search }),
        ...(filters.genre && { genre: filters.genre }),
        ...(filters.highlight && { highlight: filters.highlight }),
        sort: filters.sort,
        order: filters.order,
      });

      const data = await get<any>(`/api/admin/works?${params.toString()}`);

      // 클라이언트 사이드에서 년도 필터링
      let filteredWorks = data.works;
      if (filters.yearFrom) {
        filteredWorks = filteredWorks.filter((w: Work) => w.year >= parseInt(filters.yearFrom));
      }
      if (filters.yearTo) {
        filteredWorks = filteredWorks.filter((w: Work) => w.year <= parseInt(filters.yearTo));
      }

      setWorks(filteredWorks);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Failed to fetch works:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (work: Work) => {
    setDeleteConfirm({ isOpen: true, work });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.work) return;

    try {
      await del(`/api/admin/works/${deleteConfirm.work.id}`);
      await fetchWorks();
    } catch (error) {
      alert(error instanceof Error ? error.message : '삭제 중 오류가 발생했습니다.');
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
    setPagination({ ...pagination, page: 1 });
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      genre: '',
      yearFrom: '',
      yearTo: '',
      highlight: '',
      sort: 'year',
      order: 'desc',
    });
    setPagination({ ...pagination, page: 1 });
  };

  const hasActiveFilters = filters.search || filters.genre || filters.yearFrom || filters.yearTo || filters.highlight !== '';

  return (
    <AdminProtectedRoute>
      <div className="flex">
        <AdminSidebar />

        <div className="flex-1 ml-64 h-screen overflow-y-auto">
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">작품 관리</h1>
                <p className="mt-2 text-gray-600">
                  모차르트의 작품을 관리합니다 (총 {pagination.total}개)
                </p>
              </div>
              <Link
                href="/admin/works/new"
                className="flex items-center space-x-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
              >
                <MdAdd className="w-5 h-5" />
                <span>작품 추가</span>
              </Link>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
              <div className="flex gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="작품명 또는 카탈로그 번호로 검색..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition ${
                    showFilters || hasActiveFilters
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <MdFilterList className="w-5 h-5" />
                  <span>필터</span>
                  {hasActiveFilters && !showFilters && (
                    <span className="inline-flex items-center justify-center w-5 h-5 text-xs bg-white text-slate-900 rounded-full">
                      •
                    </span>
                  )}
                </button>
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">상세 필터</h3>
                    {hasActiveFilters && (
                      <button
                        onClick={resetFilters}
                        className="text-sm text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                      >
                        <MdClose className="w-4 h-4" />
                        <span>필터 초기화</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Genre Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        장르
                      </label>
                      <select
                        value={filters.genre}
                        onChange={(e) => handleFilterChange('genre', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                      >
                        <option value="">전체</option>
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
                        작곡년도 (시작)
                      </label>
                      <input
                        type="number"
                        placeholder="예: 1756"
                        value={filters.yearFrom}
                        onChange={(e) => handleFilterChange('yearFrom', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                      />
                    </div>

                    {/* Year To */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        작곡년도 (종료)
                      </label>
                      <input
                        type="number"
                        placeholder="예: 1791"
                        value={filters.yearTo}
                        onChange={(e) => handleFilterChange('yearTo', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                      />
                    </div>

                    {/* Highlight Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        하이라이트
                      </label>
                      <select
                        value={filters.highlight}
                        onChange={(e) => handleFilterChange('highlight', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                      >
                        <option value="">전체</option>
                        <option value="true">하이라이트만</option>
                        <option value="false">일반 작품만</option>
                      </select>
                    </div>

                    {/* Sort By */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        정렬 기준
                      </label>
                      <select
                        value={filters.sort}
                        onChange={(e) => handleFilterChange('sort', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                      >
                        <option value="year">작곡년도</option>
                        <option value="catalogNumber">카탈로그 번호</option>
                        <option value="title">제목</option>
                        <option value="voteCount">인기도</option>
                      </select>
                    </div>

                    {/* Sort Order */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        정렬 순서
                      </label>
                      <select
                        value={filters.order}
                        onChange={(e) => handleFilterChange('order', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                      >
                        <option value="asc">오름차순</option>
                        <option value="desc">내림차순</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Active Filters Display */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2">
                  {filters.search && (
                    <span className="inline-flex items-center space-x-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                      <span>검색: {filters.search}</span>
                      <button onClick={() => handleFilterChange('search', '')}>
                        <MdClose className="w-4 h-4" />
                      </button>
                    </span>
                  )}
                  {filters.genre && (
                    <span className="inline-flex items-center space-x-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                      <span>장르: {filters.genre}</span>
                      <button onClick={() => handleFilterChange('genre', '')}>
                        <MdClose className="w-4 h-4" />
                      </button>
                    </span>
                  )}
                  {filters.yearFrom && (
                    <span className="inline-flex items-center space-x-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                      <span>시작년도: {filters.yearFrom}</span>
                      <button onClick={() => handleFilterChange('yearFrom', '')}>
                        <MdClose className="w-4 h-4" />
                      </button>
                    </span>
                  )}
                  {filters.yearTo && (
                    <span className="inline-flex items-center space-x-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                      <span>종료년도: {filters.yearTo}</span>
                      <button onClick={() => handleFilterChange('yearTo', '')}>
                        <MdClose className="w-4 h-4" />
                      </button>
                    </span>
                  )}
                  {filters.highlight && (
                    <span className="inline-flex items-center space-x-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                      <span>{filters.highlight === 'true' ? '하이라이트만' : '일반 작품만'}</span>
                      <button onClick={() => handleFilterChange('highlight', '')}>
                        <MdClose className="w-4 h-4" />
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-900 border-t-transparent"></div>
                </div>
              ) : works.length === 0 ? (
                <EmptyState
                  icon={<MdMusicNote className="w-8 h-8 text-gray-400" />}
                  title="작품이 없습니다"
                  description={hasActiveFilters ? "검색 결과가 없습니다. 다른 필터를 시도해보세요." : "첫 작품을 추가해보세요."}
                  action={!hasActiveFilters ? {
                    label: "작품 추가",
                    onClick: () => window.location.href = '/admin/works/new'
                  } : undefined}
                />
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            카탈로그
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            제목
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            장르
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            작곡년도
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            악장
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                            작업
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {works.map((work) => (
                          <tr key={work.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <div className="text-sm font-medium text-gray-900">
                                  {work.catalogNumber || '-'}
                                </div>
                                {work.highlight && (
                                  <span className="px-2 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded">
                                    ⭐
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-gray-900">
                                {work.title}
                              </div>
                              {work.titleEn && (
                                <div className="text-sm text-gray-500">
                                  {work.titleEn}
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                {work.genre || '미분류'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {work.year}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {work.movements?.length || 0}개
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link
                                href={`/admin/works/${work.id}`}
                                className="text-blue-600 hover:text-blue-900 mr-4"
                                title="수정"
                              >
                                <MdEdit className="w-5 h-5 inline" />
                              </Link>
                              <button
                                onClick={() => handleDelete(work)}
                                className="text-red-600 hover:text-red-900"
                                title="삭제"
                              >
                                <MdDelete className="w-5 h-5 inline" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {pagination.totalPages > 1 && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <div className="flex justify-center space-x-2">
                        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => setPagination({ ...pagination, page })}
                            className={`px-4 py-2 rounded-lg transition ${
                              pagination.page === page
                                ? 'bg-slate-900 text-white'
                                : 'bg-white border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirm Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, work: null })}
        onConfirm={confirmDelete}
        title="작품 삭제"
        message={`정말 "${deleteConfirm.work?.title}" 작품을 삭제하시겠습니까? 관련된 악장도 모두 삭제되며, 이 작업은 되돌릴 수 없습니다.`}
        confirmText="삭제"
        type="danger"
      />
    </AdminProtectedRoute>
  );
}
