'use client';

import { useState } from 'react';
import { MdCloudUpload, MdClose, MdImage } from 'react-icons/md';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = '이미지' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${document.cookie
            .split('; ')
            .find((row) => row.startsWith('admin_token='))
            ?.split('=')[1]}`,
        },
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

  const handleRemove = () => {
    onChange('');
    setError('');
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      {value ? (
        <div className="relative">
          <img
            src={value}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border border-gray-300"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
          >
            <MdClose className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg,image/webp"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
            id={`image-upload-${label}`}
          />
          <label
            htmlFor={`image-upload-${label}`}
            className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition ${
              uploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {uploading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-900 border-t-transparent"></div>
                <p className="mt-4 text-sm text-gray-500">업로드 중...</p>
              </div>
            ) : (
              <>
                <MdCloudUpload className="w-12 h-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  클릭하여 이미지 업로드
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  JPG, PNG, WEBP (최대 5MB)
                </p>
              </>
            )}
          </label>
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
