'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { MdPerson, MdCalendarToday, MdEdit, MdSave, MdCancel } from 'react-icons/md';
import ProfileImageUpload from '@/components/ProfileImageUpload';
import toast from 'react-hot-toast';

export default function MyPageInfoPage() {
  const { data: session, update: updateSession } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '');
      setProfileImage(session.user.image || '');
    }
  }, [session]);

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error('이름을 입력해주세요.');
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch('/api/mypage/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          image: profileImage,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || '프로필 업데이트에 실패했습니다.');
      }

      // Update session with new data
      await updateSession({
        ...session,
        user: {
          ...session?.user,
          name: data.data.name,
          image: data.data.image,
        },
      });

      toast.success('프로필이 업데이트되었습니다.');
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error(error instanceof Error ? error.message : '프로필 업데이트 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (session?.user) {
      setName(session.user.name || '');
      setProfileImage(session.user.image || '');
    }
    setIsEditing(false);
  };

  if (!session) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">회원정보</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors"
          >
            <MdEdit className="text-lg" />
            수정
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              <MdCancel className="text-lg" />
              취소
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              <MdSave className="text-lg" />
              {isSaving ? '저장 중...' : '저장'}
            </button>
          </div>
        )}
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          {isEditing ? (
            <ProfileImageUpload
              value={profileImage}
              onChange={setProfileImage}
              userName={name}
            />
          ) : (
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200 shadow-md bg-gray-100 flex items-center justify-center">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt="프로필 이미지"
                  className="w-full h-full object-cover"
                />
              ) : (
                <MdPerson className="w-16 h-16 text-gray-400" />
              )}
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="text-center space-y-3">
          {/* Name */}
          {isEditing ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-center text-xl font-bold text-gray-900 bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="이름을 입력하세요"
              />
            </div>
          ) : (
            <h3 className="text-xl font-bold text-gray-900">
              {session.user.name || '이름 없음'}
            </h3>
          )}

          {/* Email */}
          <p className="text-sm text-gray-600">
            {session.user.email}
          </p>

          {/* Provider Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
            <MdCalendarToday className="text-sm" />
            {(session.user as any).provider === 'google' ? 'Google 계정' : '이메일 계정'}
          </div>
        </div>
      </div>
    </div>
  );
}
