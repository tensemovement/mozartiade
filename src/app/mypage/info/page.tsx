'use client';

import { useSession } from 'next-auth/react';
import { MdPerson, MdEmail, MdCalendarToday } from 'react-icons/md';

export default function MyPageInfoPage() {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">회원정보</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <MdPerson className="text-2xl text-gray-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-500">이름</p>
            <p className="text-lg font-semibold text-gray-900 truncate">
              {session.user.name || '이름 없음'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <MdEmail className="text-2xl text-gray-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-500">이메일</p>
            <p className="text-lg font-semibold text-gray-900 truncate">
              {session.user.email}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <MdCalendarToday className="text-2xl text-gray-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-500">가입 방법</p>
            <p className="text-lg font-semibold text-gray-900">
              {(session.user as any).provider === 'google' ? 'Google' : '이메일'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
