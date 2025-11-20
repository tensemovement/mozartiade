'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ConfirmModal from '@/components/admin/ConfirmModal';
import EmptyState from '@/components/admin/EmptyState';
import Pagination from '@/components/admin/Pagination';
import { useAdminApi } from '@/hooks/useAdminApi';
import { Chronicle } from '@/types';
import { MdAdd, MdEdit, MdDelete, MdTimeline, MdFilterList, MdClose, MdSearch, MdDragIndicator } from 'react-icons/md';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Sortable Row Component
function SortableChronicleRow({ chronicle, onEdit, onDelete, isDraggable }: {
  chronicle: Chronicle;
  onEdit: (id: string) => void;
  onDelete: (chronicle: Chronicle) => void;
  isDraggable: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: chronicle.id, disabled: !isDraggable });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <tr ref={setNodeRef} style={style} className="hover:bg-gray-50">
      {isDraggable && (
        <td className="px-4 py-4 whitespace-nowrap">
          <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
            <MdDragIndicator className="w-5 h-5 text-gray-400" />
          </div>
        </td>
      )}
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
          onClick={() => onDelete(chronicle)}
          className="text-red-600 hover:text-red-900"
          title="삭제"
        >
          <MdDelete className="w-5 h-5 inline" />
        </button>
      </td>
    </tr>
  );
}

export default function ChroniclesManagementPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [chronicles, setChronicles] = useState<Chronicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [enableReordering, setEnableReordering] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; chronicle: Chronicle | null }>({
    isOpen: false,
    chronicle: null,
  });

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    type: (searchParams.get('type') as 'all' | 'life' | 'work') || 'all',
    year: searchParams.get('year') || '',
    highlight: searchParams.get('highlight') || '',
    sort: searchParams.get('sort') || 'date',
    order: searchParams.get('order') || 'desc',
  });

  const [pagination, setPagination] = useState({
    page: parseInt(searchParams.get('page') || '1'),
    totalPages: 1,
    total: 0
  });
  const { get, del } = useAdminApi();

  // Drag and Drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Check if reordering is allowed
  const canReorder = filters.order === 'desc' && filters.year !== '' && !filters.search && filters.type === 'all';

  // Filter chronicles to only show year-only items when reordering
  const reorderableChronicles = canReorder
    ? chronicles.filter(c => !c.month && !c.day)
    : chronicles;

  // URL 파라미터 업데이트
  const updateURL = (newFilters: typeof filters, newPage: number) => {
    const params = new URLSearchParams();

    if (newFilters.search) params.set('search', newFilters.search);
    if (newFilters.type !== 'all') params.set('type', newFilters.type);
    if (newFilters.year) params.set('year', newFilters.year);
    if (newFilters.highlight) params.set('highlight', newFilters.highlight);
    if (newFilters.sort !== 'date') params.set('sort', newFilters.sort);
    if (newFilters.order !== 'desc') params.set('order', newFilters.order);
    if (newPage > 1) params.set('page', newPage.toString());

    const queryString = params.toString();
    router.push(queryString ? `?${queryString}` : '/admin/chronicles', { scroll: false });
  };

  useEffect(() => {
    fetchChronicles();
  }, [pagination.page, filters]);

  const fetchChronicles = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        ...(filters.search && { search: filters.search }),
        ...(filters.type !== 'all' && { type: filters.type }),
        ...(filters.year && { year: filters.year }),
        ...(filters.highlight && { highlight: filters.highlight }),
      });

      const data = await get<any>(`/api/admin/chronicles?${params.toString()}`);

      setChronicles(data.chronicles);
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
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    setPagination({ ...pagination, page: 1 });
    updateURL(newFilters, 1);
  };

  const resetFilters = () => {
    const newFilters = {
      search: '',
      type: 'all' as 'all' | 'life' | 'work',
      year: '',
      highlight: '',
      sort: 'date',
      order: 'desc',
    };
    setFilters(newFilters);
    setPagination({ ...pagination, page: 1 });
    updateURL(newFilters, 1);
  };

  const hasActiveFilters = filters.search || filters.type !== 'all' || filters.year || filters.highlight !== '';

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = reorderableChronicles.findIndex((c) => c.id === active.id);
    const newIndex = reorderableChronicles.findIndex((c) => c.id === over.id);

    // Optimistically update UI
    const newChronicles = arrayMove(reorderableChronicles, oldIndex, newIndex);
    setChronicles(newChronicles);

    // Call API to persist the change
    try {
      const response = await fetch('/api/admin/chronicles/reorder', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chronicleId: active.id,
          newOrder: newIndex,
          year: parseInt(filters.year),
        }),
      });

      const data = await response.json();

      if (!data.success) {
        // Revert on error
        alert(data.error || '순서 변경에 실패했습니다.');
        await fetchChronicles();
      }
    } catch (error) {
      console.error('Failed to reorder chronicles:', error);
      alert('순서 변경 중 오류가 발생했습니다.');
      await fetchChronicles();
    }
  };

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

            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
              <div className="flex gap-4">
                {/* Search */}
                <div className="flex-1 relative max-w-md">
                  <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="제목으로 검색..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                  />
                </div>

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

                {/* Advanced Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition ${
                    showFilters || (filters.year || filters.highlight)
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <MdFilterList className="w-5 h-5" />
                  <span>고급 필터</span>
                  {(filters.year || filters.highlight) && !showFilters && (
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

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Year */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        년도
                      </label>
                      <input
                        type="number"
                        placeholder="예: 1756"
                        value={filters.year}
                        onChange={(e) => handleFilterChange('year', e.target.value)}
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
                  {filters.search && (
                    <span className="inline-flex items-center space-x-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                      <span>검색: {filters.search}</span>
                      <button onClick={() => handleFilterChange('search', '')}>
                        <MdClose className="w-4 h-4" />
                      </button>
                    </span>
                  )}
                  {filters.type !== 'all' && (
                    <span className="inline-flex items-center space-x-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                      <span>유형: {filters.type === 'life' ? '생애 사건' : '작품 작곡'}</span>
                      <button onClick={() => handleFilterChange('type', 'all')}>
                        <MdClose className="w-4 h-4" />
                      </button>
                    </span>
                  )}
                  {filters.year && (
                    <span className="inline-flex items-center space-x-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                      <span>년도: {filters.year}</span>
                      <button onClick={() => handleFilterChange('year', '')}>
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

            {/* Reorder Checkbox */}
            {canReorder && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableReordering}
                    onChange={(e) => setEnableReordering(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-blue-900">
                    순서 이동 모드 활성화 (드래그앤드랍으로 순서 변경)
                  </span>
                </label>
                <p className="mt-1 text-xs text-blue-700 ml-6">
                  현재 조건: 정렬순서 최신순, {filters.year}년도만 표시
                </p>
              </div>
            )}

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
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            {enableReordering && canReorder && (
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">

                              </th>
                            )}
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
                        <SortableContext
                          items={reorderableChronicles.map(c => c.id)}
                          strategy={verticalListSortingStrategy}
                        >
                          <tbody className="bg-white divide-y divide-gray-200">
                            {reorderableChronicles.map((chronicle) => (
                              <SortableChronicleRow
                                key={chronicle.id}
                                chronicle={chronicle}
                                onEdit={(id) => router.push(`/admin/chronicles/${id}`)}
                                onDelete={handleDelete}
                                isDraggable={enableReordering && canReorder}
                              />
                            ))}
                          </tbody>
                        </SortableContext>
                      </table>
                    </div>
                  </DndContext>

                  {/* Pagination - Hide when year filter is applied */}
                  {!filters.year && pagination.totalPages > 1 && (
                    <Pagination
                      currentPage={pagination.page}
                      totalPages={pagination.totalPages}
                      onPageChange={(page) => {
                        setPagination({ ...pagination, page });
                        updateURL(filters, page);
                      }}
                    />
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
