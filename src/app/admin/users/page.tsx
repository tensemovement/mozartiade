'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute';
import AdminSidebar from '@/components/admin/AdminSidebar';
import Modal from '@/components/admin/Modal';
import ConfirmModal from '@/components/admin/ConfirmModal';
import EmptyState from '@/components/admin/EmptyState';
import Pagination from '@/components/admin/Pagination';
import { useAdminApi } from '@/hooks/useAdminApi';
import { User } from '@/types';
import { MdEdit, MdDelete, MdSearch, MdPeople } from 'react-icons/md';

function UsersManagementContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; user: User | null }>({
    isOpen: false,
    user: null,
  });
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [pagination, setPagination] = useState({
    page: parseInt(searchParams.get('page') || '1'),
    totalPages: 1,
    total: 0
  });
  const [formData, setFormData] = useState({
    email: '',
    name: '',
  });
  const { get, put, del } = useAdminApi();

  // URL 파라미터 업데이트
  const updateURL = (newSearch: string, newPage: number) => {
    const params = new URLSearchParams();
    if (newSearch) params.set('search', newSearch);
    if (newPage > 1) params.set('page', newPage.toString());

    const queryString = params.toString();
    router.push(queryString ? `?${queryString}` : '/admin/users', { scroll: false });
  };

  useEffect(() => {
    fetchUsers();
  }, [pagination.page, search]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const data = await get<any>(
        `/api/admin/users?page=${pagination.page}&search=${search}`
      );
      setUsers(data.users);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (user: User) => {
    setEditingUser(user);
    setFormData({
      email: user.email,
      name: user.name || '',
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setFormData({ email: '', name: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      await put(`/api/admin/users/${editingUser.id}`, formData);
      await fetchUsers();
      handleCloseModal();
    } catch (error) {
      alert(error instanceof Error ? error.message : '처리 중 오류가 발생했습니다.');
    }
  };

  const handleDelete = async (user: User) => {
    setDeleteConfirm({ isOpen: true, user });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.user) return;

    try {
      await del(`/api/admin/users/${deleteConfirm.user.id}`);
      await fetchUsers();
    } catch (error) {
      alert(error instanceof Error ? error.message : '삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <AdminProtectedRoute>
      <div className="flex">
        <AdminSidebar />

        <div className="flex-1 ml-64 h-screen overflow-y-auto">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">회원 관리</h1>
              <p className="mt-2 text-gray-600">
                가입한 회원들을 관리합니다 (총 {pagination.total}명)
              </p>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="이름 또는 이메일로 검색..."
                  value={search}
                  onChange={(e) => {
                    const newSearch = e.target.value;
                    setSearch(newSearch);
                    setPagination({ ...pagination, page: 1 });
                    updateURL(newSearch, 1);
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-900 border-t-transparent"></div>
                </div>
              ) : users.length === 0 ? (
                <EmptyState
                  icon={<MdPeople className="w-8 h-8 text-gray-400" />}
                  title="회원이 없습니다"
                  description="아직 가입한 회원이 없습니다."
                />
              ) : (
                <>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          이름
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          이메일
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          가입일
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                          작업
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name || '-'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(user.createdAt).toLocaleDateString('ko-KR')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleOpenModal(user)}
                              className="text-blue-600 hover:text-blue-900 mr-4"
                              title="수정"
                            >
                              <MdEdit className="w-5 h-5 inline" />
                            </button>
                            <button
                              onClick={() => handleDelete(user)}
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
                    <Pagination
                      currentPage={pagination.page}
                      totalPages={pagination.totalPages}
                      onPageChange={(page) => {
                        setPagination({ ...pagination, page });
                        updateURL(search, page);
                      }}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="회원 정보 수정"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이름
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이메일
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
            >
              수정
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, user: null })}
        onConfirm={confirmDelete}
        title="회원 삭제"
        message={`정말 ${deleteConfirm.user?.email} 회원을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
        confirmText="삭제"
        type="danger"
      />
    </AdminProtectedRoute>
  );
}

export default function UsersManagementPage() {
  return (
    <Suspense fallback={
      <AdminProtectedRoute>
        <div className="flex">
          <AdminSidebar />
          <div className="flex-1 ml-64 h-screen overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-900 border-t-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </AdminProtectedRoute>
    }>
      <UsersManagementContent />
    </Suspense>
  );
}
