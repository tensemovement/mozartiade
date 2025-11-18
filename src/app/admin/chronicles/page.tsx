'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ConfirmModal from '@/components/admin/ConfirmModal';
import EmptyState from '@/components/admin/EmptyState';
import { useAdminApi } from '@/hooks/useAdminApi';
import { Chronicle } from '@/types';
import { MdAdd, MdEdit, MdDelete, MdTimeline } from 'react-icons/md';

export default function ChroniclesManagementPage() {
  const [chronicles, setChronicles] = useState<Chronicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; chronicle: Chronicle | null }>({
    isOpen: false,
    chronicle: null,
  });
  const [filter, setFilter] = useState<'all' | 'life' | 'work'>('all');
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const { get, del } = useAdminApi();

  useEffect(() => {
    fetchChronicles();
  }, [pagination.page, filter]);

  const fetchChronicles = async () => {
    setIsLoading(true);
    try {
      const typeParam = filter !== 'all' ? `&type=${filter}` : '';
      const data = await get<any>(
        `/api/admin/chronicles?page=${pagination.page}${typeParam}`
      );
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

  return (
    <AdminProtectedRoute>
      <div className="flex">
        <AdminSidebar />

        <div className="flex-1 ml-64">
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

            {/* Filter */}
            <div className="mb-6 flex space-x-2">
              <button
                onClick={() => {
                  setFilter('all');
                  setPagination({ ...pagination, page: 1 });
                }}
                className={`px-4 py-2 rounded-lg transition ${
                  filter === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => {
                  setFilter('life');
                  setPagination({ ...pagination, page: 1 });
                }}
                className={`px-4 py-2 rounded-lg transition ${
                  filter === 'life'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                생애 사건
              </button>
              <button
                onClick={() => {
                  setFilter('work');
                  setPagination({ ...pagination, page: 1 });
                }}
                className={`px-4 py-2 rounded-lg transition ${
                  filter === 'work'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                작품 작곡
              </button>
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
                  description={filter !== 'all' ? `${filter === 'life' ? '생애 사건' : '작품 작곡'} 일대기가 없습니다.` : "첫 일대기를 추가해보세요."}
                  action={filter === 'all' ? {
                    label: "일대기 추가",
                    onClick: () => window.location.href = '/admin/chronicles/new'
                  } : undefined}
                />
              ) : (
                <>
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
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                chronicle.type === 'life'
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-green-100 text-green-800'
                              }`}
                            >
                              {chronicle.type === 'life' ? '생애' : '작품'}
                            </span>
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
