'use client';

import { AdminProvider } from '@/contexts/AdminContext';
import '@/styles/globals.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    </AdminProvider>
  );
}
