'use client';

import { MdNotifications, MdDelete } from 'react-icons/md';
import toast from 'react-hot-toast';

export default function ProfileSettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">설정</h2>

      {/* 알림 설정 */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <MdNotifications className="text-xl" />
          알림 설정
        </h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
            <span className="text-gray-700">이메일 알림 받기</span>
            <input
              type="checkbox"
              className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              defaultChecked
            />
          </label>
          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
            <span className="text-gray-700">새 작품 알림</span>
            <input
              type="checkbox"
              className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
            />
          </label>
        </div>
      </div>

      {/* 계정 관리 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <MdDelete className="text-xl" />
          계정 관리
        </h3>
        <button
          onClick={() => {
            if (confirm('정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
              toast.error('계정 삭제 기능은 준비 중입니다.');
            }
          }}
          className="px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-semibold transition-colors border border-red-200"
        >
          계정 삭제
        </button>
        <p className="mt-2 text-sm text-gray-500">
          계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다.
        </p>
      </div>
    </div>
  );
}
