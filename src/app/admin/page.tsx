'use client';

import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useAdmin } from '@/contexts/AdminContext';
import { MdPeople, MdMusicNote, MdTimeline, MdAdminPanelSettings } from 'react-icons/md';

export default function AdminDashboard() {
  const { admin } = useAdmin();

  const stats = [
    {
      label: '전체 회원',
      value: '-',
      icon: MdPeople,
      color: 'bg-blue-500',
    },
    {
      label: '등록 작품',
      value: '-',
      icon: MdMusicNote,
      color: 'bg-green-500',
    },
    {
      label: '일대기 이벤트',
      value: '-',
      icon: MdTimeline,
      color: 'bg-purple-500',
    },
    {
      label: '관리자',
      value: '-',
      icon: MdAdminPanelSettings,
      color: 'bg-orange-500',
    },
  ];

  return (
    <AdminProtectedRoute>
      <div className="flex">
        <AdminSidebar />

        <div className="flex-1 ml-64 h-screen overflow-y-auto">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                대시보드
              </h1>
              <p className="mt-2 text-gray-600">
                환영합니다, {admin?.name}님!
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          {stat.label}
                        </p>
                        <p className="mt-2 text-3xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                      </div>
                      <div className={`${stat.color} p-3 rounded-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                빠른 작업
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <a
                  href="/admin/works"
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-slate-400 hover:bg-gray-50 transition group"
                >
                  <MdMusicNote className="w-8 h-8 text-gray-400 group-hover:text-slate-600 mb-2" />
                  <p className="font-medium text-gray-900">작품 추가</p>
                  <p className="text-sm text-gray-500 mt-1">
                    새로운 작품을 등록합니다
                  </p>
                </a>
                <a
                  href="/admin/chronicles"
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-slate-400 hover:bg-gray-50 transition group"
                >
                  <MdTimeline className="w-8 h-8 text-gray-400 group-hover:text-slate-600 mb-2" />
                  <p className="font-medium text-gray-900">일대기 추가</p>
                  <p className="text-sm text-gray-500 mt-1">
                    생애 사건을 기록합니다
                  </p>
                </a>
                <a
                  href="/admin/users"
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-slate-400 hover:bg-gray-50 transition group"
                >
                  <MdPeople className="w-8 h-8 text-gray-400 group-hover:text-slate-600 mb-2" />
                  <p className="font-medium text-gray-900">회원 관리</p>
                  <p className="text-sm text-gray-500 mt-1">
                    회원 정보를 관리합니다
                  </p>
                </a>
                {admin?.role === 'SUPER_ADMIN' && (
                  <a
                    href="/admin/admins"
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-slate-400 hover:bg-gray-50 transition group"
                  >
                    <MdAdminPanelSettings className="w-8 h-8 text-gray-400 group-hover:text-slate-600 mb-2" />
                    <p className="font-medium text-gray-900">관리자 추가</p>
                    <p className="text-sm text-gray-500 mt-1">
                      새 관리자를 추가합니다
                    </p>
                  </a>
                )}
              </div>
            </div>

            {/* System Info */}
            <div className="mt-8 bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg shadow-sm p-6 text-white">
              <h2 className="text-xl font-bold mb-4">시스템 정보</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-slate-300 text-sm">역할</p>
                  <p className="font-medium mt-1">
                    {admin?.role === 'SUPER_ADMIN' && '최고 관리자'}
                    {admin?.role === 'ADMIN' && '관리자'}
                    {admin?.role === 'EDITOR' && '편집자'}
                  </p>
                </div>
                <div>
                  <p className="text-slate-300 text-sm">이메일</p>
                  <p className="font-medium mt-1">{admin?.email}</p>
                </div>
                <div>
                  <p className="text-slate-300 text-sm">시스템 버전</p>
                  <p className="font-medium mt-1">1.0.0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminProtectedRoute>
  );
}
