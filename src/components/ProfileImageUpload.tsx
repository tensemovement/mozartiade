'use client';

import { useState } from 'react';
import { MdCloudUpload, MdClose, MdPerson } from 'react-icons/md';

interface ProfileImageUploadProps {
  value?: string | null;
  onChange: (url: string) => void;
  userName?: string;
}

export default function ProfileImageUpload({ value, onChange, userName }: ProfileImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const uploadFile = async (file: File) => {
    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/mypage/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || '업로드 실패');
      }

      onChange(data.data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : '업로드 중 오류가 발생했습니다.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadFile(file);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('JPG, PNG, WEBP 파일만 업로드 가능합니다.');
      return;
    }

    await uploadFile(file);
  };

  const handleRemove = () => {
    onChange('');
    setError('');
  };

  return (
    <div className="flex flex-col items-center">
      {value ? (
        <div className="relative group">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
            <img
              src={value}
              alt="프로필 이미지"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-0 right-0 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow-lg opacity-0 group-hover:opacity-100"
            title="이미지 제거"
          >
            <MdClose className="w-4 h-4" />
          </button>
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition">
            <label
              htmlFor="profile-image-upload"
              className="cursor-pointer flex flex-col items-center text-white"
            >
              <MdCloudUpload className="w-8 h-8" />
              <span className="text-xs mt-1">변경</span>
            </label>
          </div>
        </div>
      ) : (
        <div
          className="relative"
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <label
            htmlFor="profile-image-upload"
            className={`flex flex-col items-center justify-center w-32 h-32 rounded-full border-4 border-dashed cursor-pointer transition ${
              uploading
                ? 'opacity-50 cursor-not-allowed border-gray-300 bg-gray-100'
                : isDragging
                  ? 'border-primary-500 bg-primary-50 scale-105'
                  : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
            }`}
          >
            {uploading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
                <p className="mt-2 text-xs text-gray-500">업로드 중...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                {value === '' ? (
                  <MdPerson className={`w-16 h-16 transition ${isDragging ? 'text-primary-600 scale-110' : 'text-gray-400'}`} />
                ) : (
                  <MdCloudUpload className={`w-12 h-12 transition ${isDragging ? 'text-primary-600 scale-110' : 'text-gray-400'}`} />
                )}
                <p className={`mt-2 text-xs text-center px-2 transition ${isDragging ? 'text-primary-700 font-medium' : 'text-gray-500'}`}>
                  {isDragging ? '여기에 놓으세요' : '클릭 또는 드래그'}
                </p>
              </div>
            )}
          </label>
        </div>
      )}

      <input
        type="file"
        accept="image/jpeg,image/png,image/jpg,image/webp"
        onChange={handleFileChange}
        disabled={uploading}
        className="hidden"
        id="profile-image-upload"
      />

      <p className="mt-3 text-xs text-gray-500 text-center">
        JPG, PNG, WEBP (최대 5MB)
      </p>

      {error && (
        <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
      )}
    </div>
  );
}
