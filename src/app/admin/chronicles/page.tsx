'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ConfirmModal from '@/components/admin/ConfirmModal';
import EmptyState from '@/components/admin/EmptyState';
import { useAdminApi } from '@/hooks/useAdminApi';
import { Chronicle } from '@/types';
import { MdAdd, MdEdit, MdDelete, MdTimeline, MdFilterList, MdClose } from 'react-icons/md';

export default function ChroniclesManagementPage() {
  const [chronicles, setChronicles] = useState<Chronicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; chronicle: Chronicle | null }>({
    isOpen: false,
    chronicle: null,
  });

  const [filters, setFilters] = useState({
    type: 'all' as 'all' | 'life' | 'work',
    yearFrom: '',
    yearTo: '',
    highlight: '',
    sort: 'date',
    order: 'desc',
  });

  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const { get, del } = useAdminApi();

  useEffect(() => {
    fetchChronicles();
  }, [pagination.page, filters]);

  const fetchChronicles = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        ...(filters.type !== 'all' && { type: filters.type }),
      });

      const data = await get<any>(`/api/admin/chronicles?${params.toString()}`);

      // 클라이언트 사이드에서 필터링 및 정렬
      let filteredChronicles = data.chronicles;

      // 년도 필터링
      if (filters.yearFrom) {
        filteredChronicles = filteredChronicles.filter((c: Chronicle) => c.year >= parseInt(filters.yearFrom));
      }
      if (filters.yearTo) {
        filteredChronicles = filteredChronicles.filter((c: Chronicle) => c.year <= parseInt(filters.yearTo));
      }

      // 하이라이트 필터링
      if (filters.highlight) {
        const highlightFilter = filters.highlight === 'true';
        filteredChronicles = filteredChronicles.filter((c: Chronicle) => c.highlight === highlightFilter);
      }

      // 정렬
      if (filters.sort === 'date') {
        filteredChronicles.sort((a: Chronicle, b: Chronicle) => {
          const dateA = a.year * 10000 + (a.month || 0) * 100 + (a.day || 0);
          const dateB = b.year * 10000 + (b.month || 0) * 100 + (b.day || 0);
          return filters.order === 'asc' ? dateA - dateB : dateB - dateA;
        });
      }

      setChronicles(filteredChronicles);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Failed to fetch chronicles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (chronicle: Chronicle) => {
    setDeleteConfirm({ isOpen: true, chronicle });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.chronicle) return;

    try {
      await del(`/api/admin/chronicles/${deleteConfirm.chronicle.id}`);
      await fetchChronicles();
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
      type: 'all',
      yearFrom: '',
      yearTo: '',
      highlight: '',
      sort: 'date',
      order: 'desc',
    });
    setPagination({ ...pagination, page: 1 });
  };

  const hasActiveFilters = filters.type !== 'all' || filters.yearFrom || filters.yearTo || filters.highlight !== '';

  return (
    <AdminProtectedRoute>
      <div className="flex">
        <AdminSidebar />

        <div className="flex-1 ml-64 h-screen overflow-y-auto">
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">일대기 관리</h1>
                <p className="mt-2 text-gray-600">
                  모차르트의 생애와 작품 일대기를 관리합니다 (총 {pagination.total}개)
                </p>
              </div>
              <Link
                href="/admin/chronicles/new"
                className="flex items-center space-x-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
              >
                <MdAdd className="w-5 h-5" />
                <span>일대기 추가</span>
              </Link>
            </div>

            {/* Filters */}
            <div className="mb-6 space-y-4">
              <div className="flex gap-4">
                {/* Type Filter Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleFilterChange('type', 'all')}
                    className={`px-4 py-2 rounded-lg transition ${
                      filters.type === 'all'
                        ? 'bg-slate-900 text-white'
                        : 'bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    전체
                  </button>
                  <button
                    onClick={() => handleFilterChange('type', 'life')}
                    className={`px-4 py-2 rounded-lg transition ${
                      filters.type === 'life'
                        ? 'bg-slate-900 text-white'
                        : 'bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    생애 사건
                  </button>
                  <button
                    onClick={() => handleFilterChange('type', 'work')}
                    className={`px-4 py-2 rounded-lg transition ${
                      filters.type === 'work'
                        ? 'bg-slate-900 text-white'
                        : 'bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    작품 작곡
                  </button>
                </div>

                <div className="flex-1"></div>

                {/* Advanced Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition ${
                    showFilters || (filters.yearFrom || filters.yearTo || filters.highlight)
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <MdFilterList className="w-5 h-5" />
                  <span>고급 필터</span>
                  {(filters.yearFrom || filters.yearTo || filters.highlight) && !showFilters && (
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
                    {/* Year From */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        년도 (시작)
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
                        년도 (종료)
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
                        <option value="false">일반 이벤트만</option>
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
                        <option value="desc">최신순</option>
                        <option value="asc">오래된순</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Active Filters Display */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2">
                  {filters.type !== 'all' && (
                    <span className="inline-flex items-center space-x-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                      <span>유형: {filters.type === 'life' ? '생애 사건' : '작품 작곡'}</span>
                      <button onClick={() => handleFilterChange('type', 'all')}>
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
                      <span>{filters.highlight === 'true' ? '하이라이트만' : '일반 이벤트만'}</span>
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
              ) : chronicles.length === 0 ? (
                <EmptyState
                  icon={<MdTimeline className="w-8 h-8 text-gray-400" />}
                  title="일대기가 없습니다"
                  description={hasActiveFilters ? "검색 결과가 없습니다. 다른 필터를 시도해보세요." : "첫 일대기를 추가해보세요."}
                  action={!hasActiveFilters ? {
                    label: "일대기 추가",
                    onClick: () => window.location.href = '/admin/chronicles/new'
                  } : undefined}
                />
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            유형
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            날짜
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            제목/작품
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            위치
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                            작업
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {chronicles.map((chronicle) => (
                          <tr key={chronicle.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    chronicle.type === 'life'
                                      ? 'bg-purple-100 text-purple-800'
                                      : 'bg-green-100 text-green-800'
                                  }`}
                                >
                                  {chronicle.type === 'life' ? '생애' : '작품'}
                                </span>
                                {chronicle.highlight && (
                                  <span className="px-2 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded">
                                    ⭐
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {chronicle.year}.
                              {chronicle.month ? `${chronicle.month}.` : ''}
                              {chronicle.day || ''}
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-gray-900">
                                {chronicle.type === 'life'
                                  ? chronicle.title
                                  : chronicle.work?.title || '-'}
                              </div>
                              {chronicle.type === 'work' && chronicle.work?.catalogNumber && (
                                <div className="text-sm text-gray-500">
                                  {chronicle.work.catalogNumber}
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {chronicle.location || '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link
                                href={`/admin/chronicles/${chronicle.id}`}
                                className="text-blue-600 hover:text-blue-900 mr-4"
                                title="수정"
                              >
                                <MdEdit className="w-5 h-5 inline" />
                              </Link>
                              <button
                                onClick={() => handleDelete(chronicle)}
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
        onClose={() => setDeleteConfirm({ isOpen: false, chronicle: null })}
        onConfirm={confirmDelete}
        title="일대기 삭제"
        message={`정말 이 일대기를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
        confirmText="삭제"
        type="danger"
      />
    </AdminProtectedRoute>
  );
}
