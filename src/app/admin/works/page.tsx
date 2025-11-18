'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useAdminApi } from '@/hooks/useAdminApi';
import { Work } from '@/types';
import { MdAdd, MdEdit, MdDelete, MdSearch } from 'react-icons/md';

export default function WorksManagementPage() {
  const [works, setWorks] = useState<Work[]>([]);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const { get, del } = useAdminApi();

  useEffect(() => {
    fetchWorks();
  }, [pagination.page, search]);

  const fetchWorks = async () => {
    try {
      const data = await get<any>(
        `/api/admin/works?page=${pagination.page}&search=${search}`
      );
      setWorks(data.works);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Failed to fetch works:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까? 관련된 악장도 모두 삭제됩니다.')) return;

    try {
      await del(`/api/admin/works/${id}`);
      await fetchWorks();
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
                <h1 className="text-3xl font-bold text-gray-900">작품 관리</h1>
                <p className="mt-2 text-gray-600">
                  모차르트의 작품을 관리합니다
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

            {/* Search */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="작품명 또는 카탈로그 번호로 검색..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
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
                        <div className="text-sm font-medium text-gray-900">
                          {work.catalogNumber || '-'}
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
                        >
                          <MdEdit className="w-5 h-5 inline" />
                        </Link>
                        <button
                          onClick={() => handleDelete(work.id)}
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
