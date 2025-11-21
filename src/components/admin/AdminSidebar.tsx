'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAdmin } from '@/contexts/AdminContext';
import {
  MdDashboard,
  MdPeople,
  MdMusicNote,
  MdTimeline,
  MdAdminPanelSettings,
  MdLogout,
} from 'react-icons/md';

const menuItems = [
  {
    label: '대시보드',
    href: '/admin',
    icon: MdDashboard,
  },
  {
    label: '관리자 관리',
    href: '/admin/admins',
    icon: MdAdminPanelSettings,
    requiredRole: 'SUPER_ADMIN' as const,
  },
  {
    label: '회원 관리',
    href: '/admin/users',
    icon: MdPeople,
  },
  {
    label: '작품 관리',
    href: '/admin/works',
    icon: MdMusicNote,
  },
  {
    label: '연대기 관리',
    href: '/admin/chronicles',
    icon: MdTimeline,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { admin, logout } = useAdmin();

  const canAccessMenu = (requiredRole?: 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR') => {
    if (!requiredRole) return true;
    if (!admin) return false;

    const roleHierarchy = {
      SUPER_ADMIN: 3,
      ADMIN: 2,
      EDITOR: 1,
    };

    return roleHierarchy[admin.role] >= roleHierarchy[requiredRole];
  };

  return (
    <div className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 overflow-y-auto">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <Link href="/admin" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center transform transition-all group-hover:scale-110 overflow-hidden bg-white">
            <Image
              src="/images/logo.svg"
              alt="Mozartiade Logo"
              width={32}
              height={32}
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="text-xl font-bold">Mozartiade</h1>
            <p className="text-sm text-slate-400">Admin Dashboard</p>
          </div>
        </Link>
      </div>

      {/* User Info */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
            <span className="text-sm font-medium">
              {admin?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{admin?.name}</p>
            <p className="text-xs text-slate-400 truncate">{admin?.email}</p>
          </div>
        </div>
        <div className="mt-2">
          <span className="inline-block px-2 py-1 text-xs bg-slate-700 rounded">
            {admin?.role === 'SUPER_ADMIN' && '최고 관리자'}
            {admin?.role === 'ADMIN' && '관리자'}
            {admin?.role === 'EDITOR' && '편집자'}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            if (!canAccessMenu(item.requiredRole)) return null;

            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition w-full"
        >
          <MdLogout className="w-5 h-5" />
          <span className="text-sm font-medium">로그아웃</span>
        </button>
      </div>
    </div>
  );
}
