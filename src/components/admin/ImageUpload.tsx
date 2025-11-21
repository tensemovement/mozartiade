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
  const [isDragging, setIsDragging] = useState(false);

  const uploadFile = async (file: File) => {
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
        <div
          className="relative"
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
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
            className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition ${
              uploading
                ? 'opacity-50 cursor-not-allowed border-gray-300'
                : isDragging
                  ? 'border-slate-500 bg-slate-50 scale-[1.02]'
                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            {uploading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-900 border-t-transparent"></div>
                <p className="mt-4 text-sm text-gray-500">업로드 중...</p>
              </div>
            ) : (
              <>
                <MdCloudUpload className={`w-12 h-12 transition ${isDragging ? 'text-slate-600 scale-110' : 'text-gray-400'}`} />
                <p className={`mt-2 text-sm transition ${isDragging ? 'text-slate-700 font-medium' : 'text-gray-500'}`}>
                  {isDragging ? '파일을 여기에 놓으세요' : '클릭하거나 파일을 드래그하여 업로드'}
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
