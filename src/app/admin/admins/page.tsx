'use client';

import { useState, useEffect } from 'react';
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute';
import AdminSidebar from '@/components/admin/AdminSidebar';
import Modal from '@/components/admin/Modal';
import ConfirmModal from '@/components/admin/ConfirmModal';
import EmptyState from '@/components/admin/EmptyState';
import { useAdminApi } from '@/hooks/useAdminApi';
import { Admin, AdminRole } from '@/types';
import { MdAdd, MdEdit, MdDelete, MdAdminPanelSettings } from 'react-icons/md';

export default function AdminsManagementPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; admin: Admin | null }>({
    isOpen: false,
    admin: null,
  });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'ADMIN' as AdminRole,
  });
  const { get, post, put, del } = useAdminApi();

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setIsLoading(true);
    try {
      const data = await get<Admin[]>('/api/admin/admins');
      setAdmins(data);
    } catch (error) {
      console.error('Failed to fetch admins:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (admin?: Admin) => {
    if (admin) {
      setEditingAdmin(admin);
      setFormData({
        email: admin.email,
        password: '',
        name: admin.name,
        role: admin.role,
      });
    } else {
      setEditingAdmin(null);
      setFormData({
        email: '',
        password: '',
        name: '',
        role: 'ADMIN',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAdmin(null);
    setFormData({
      email: '',
      password: '',
      name: '',
      role: 'ADMIN',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingAdmin) {
        // Update
        const updateData: any = {
          email: formData.email,
          name: formData.name,
          role: formData.role,
        };
        if (formData.password) {
          updateData.password = formData.password;
        }
        await put(`/api/admin/admins/${editingAdmin.id}`, updateData);
      } else {
        // Create
        await post('/api/admin/admins', formData);
      }

      await fetchAdmins();
      handleCloseModal();
    } catch (error) {
      alert(error instanceof Error ? error.message : '처리 중 오류가 발생했습니다.');
    }
  };

  const handleDelete = (admin: Admin) => {
    setDeleteConfirm({ isOpen: true, admin });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.admin) return;

    try {
      await del(`/api/admin/admins/${deleteConfirm.admin.id}`);
      await fetchAdmins();
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
                <h1 className="text-3xl font-bold text-gray-900">
                  관리자 관리
                </h1>
                <p className="mt-2 text-gray-600">
                  시스템 관리자를 추가하고 관리합니다 (총 {admins.length}명)
                </p>
              </div>
              <button
                onClick={() => handleOpenModal()}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
              >
                <MdAdd className="w-5 h-5" />
                <span>관리자 추가</span>
              </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-900 border-t-transparent"></div>
                </div>
              ) : admins.length === 0 ? (
                <EmptyState
                  icon={<MdAdminPanelSettings className="w-8 h-8 text-gray-400" />}
                  title="관리자가 없습니다"
                  description="첫 관리자를 추가해보세요."
                  action={{
                    label: "관리자 추가",
                    onClick: () => handleOpenModal()
                  }}
                />
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        이름
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        이메일
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        역할
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        생성일
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        작업
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {admins.map((admin) => (
                      <tr key={admin.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {admin.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {admin.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              admin.role === 'SUPER_ADMIN'
                                ? 'bg-red-100 text-red-800'
                                : admin.role === 'ADMIN'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {admin.role === 'SUPER_ADMIN' && '최고 관리자'}
                            {admin.role === 'ADMIN' && '관리자'}
                            {admin.role === 'EDITOR' && '편집자'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(admin.createdAt).toLocaleDateString('ko-KR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleOpenModal(admin)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                            title="수정"
                          >
                            <MdEdit className="w-5 h-5 inline" />
                          </button>
                          <button
                            onClick={() => handleDelete(admin)}
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
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingAdmin ? '관리자 수정' : '관리자 추가'}
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
              required
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              비밀번호 {editingAdmin && '(변경시에만 입력)'}
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required={!editingAdmin}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              역할
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value as AdminRole })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
            >
              <option value="EDITOR">편집자</option>
              <option value="ADMIN">관리자</option>
              <option value="SUPER_ADMIN">최고 관리자</option>
            </select>
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
              {editingAdmin ? '수정' : '추가'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, admin: null })}
        onConfirm={confirmDelete}
        title="관리자 삭제"
        message={`정말 ${deleteConfirm.admin?.name} (${deleteConfirm.admin?.email}) 관리자를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
        confirmText="삭제"
        type="danger"
      />
    </AdminProtectedRoute>
  );
}
