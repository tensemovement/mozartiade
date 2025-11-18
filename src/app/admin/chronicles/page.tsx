'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useAdminApi } from '@/hooks/useAdminApi';
import { Chronicle } from '@/types';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';

export default function ChroniclesManagementPage() {
  const [chronicles, setChronicles] = useState<Chronicle[]>([]);
  const [filter, setFilter] = useState<'all' | 'life' | 'work'>('all');
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const { get, del } = useAdminApi();

  useEffect(() => {
    fetchChronicles();
  }, [pagination.page, filter]);

  const fetchChronicles = async () => {
    try {
      const typeParam = filter !== 'all' ? `&type=${filter}` : '';
      const data = await get<any>(
        `/api/admin/chronicles?page=${pagination.page}${typeParam}`
      );
      setChronicles(data.chronicles);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Failed to fetch chronicles:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await del(`/api/admin/chronicles/${id}`);
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
                  모차르트의 생애와 작품 일대기를 관리합니다
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
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg ${
                  filter === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setFilter('life')}
                className={`px-4 py-2 rounded-lg ${
                  filter === 'life'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                생애 사건
              </button>
              <button
                onClick={() => setFilter('work')}
                className={`px-4 py-2 rounded-lg ${
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
                        >
                          <MdEdit className="w-5 h-5 inline" />
                        </Link>
                        <button
                          onClick={() => handleDelete(chronicle.id)}
                          className="text-red-600 hover:text-red-900"
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
            <div className="mt-6 flex justify-center">
              <div className="flex space-x-2">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setPagination({ ...pagination, page })}
                    className={`px-4 py-2 rounded-lg ${
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
          </div>
        </div>
      </div>
    </AdminProtectedRoute>
  );
}
