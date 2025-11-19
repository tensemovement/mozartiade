'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ImageUpload from '@/components/admin/ImageUpload';
import WorkSelectModal from '@/components/admin/WorkSelectModal';
import { useAdminApi } from '@/hooks/useAdminApi';
import { MdArrowBack, MdSearch } from 'react-icons/md';
import Link from 'next/link';

export default function NewChroniclePage() {
  const router = useRouter();
  const { post } = useAdminApi();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isWorkModalOpen, setIsWorkModalOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState<{
    id: string;
    catalogNumber: string;
    title: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    type: 'life' as 'life' | 'work',
    year: new Date().getFullYear(),
    month: '',
    day: '',
    title: '',
    description: '',
    location: '',
    workId: '',
    highlight: false,
    image: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const submitData = {
        ...formData,
        month: formData.month ? parseInt(formData.month) : null,
        day: formData.day ? parseInt(formData.day) : null,
        workId: formData.type === 'work' && formData.workId ? formData.workId : null,
        title: formData.type === 'life' ? formData.title : null,
        description: formData.description || null,
        location: formData.location || null,
      };

      await post('/api/admin/chronicles', submitData);

      alert('일대기가 성공적으로 등록되었습니다.');
      router.push('/admin/chronicles');
    } catch (err) {
      setError(err instanceof Error ? err.message : '일대기 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminProtectedRoute>
      <div className="flex">
        <AdminSidebar />

        <div className="flex-1 ml-64 h-screen overflow-y-auto">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <Link
                href="/admin/chronicles"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
              >
                <MdArrowBack className="w-5 h-5 mr-2" />
                일대기 목록으로
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">일대기 추가</h1>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Type Selection */}
              <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-900 to-indigo-700 px-6 py-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    🏷️ 유형
                  </h2>
                </div>
                <div className="p-6">

                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value="life"
                      checked={formData.type === 'life'}
                      onChange={(e) =>
                        setFormData({ ...formData, type: 'life', workId: '' })
                      }
                      className="w-4 h-4 text-slate-600 border-gray-300 focus:ring-slate-500"
                    />
                    <span className="text-sm font-medium text-gray-700">생애 사건</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value="work"
                      checked={formData.type === 'work'}
                      onChange={(e) =>
                        setFormData({ ...formData, type: 'work', title: '', location: '' })
                      }
                      className="w-4 h-4 text-slate-600 border-gray-300 focus:ring-slate-500"
                    />
                    <span className="text-sm font-medium text-gray-700">작품 작곡</span>
                  </label>
                </div>
                </div>
              </div>

              {/* Basic Information */}
              <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-slate-900 to-slate-700 px-6 py-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    📝 기본 정보
                  </h2>
                </div>
                <div className="p-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        년도 *
                      </label>
                      <input
                        type="number"
                        value={formData.year}
                        onChange={(e) =>
                          setFormData({ ...formData, year: parseInt(e.target.value) })
                        }
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        월
                      </label>
                      <input
                        type="number"
                        value={formData.month}
                        onChange={(e) =>
                          setFormData({ ...formData, month: e.target.value })
                        }
                        min="1"
                        max="12"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        일
                      </label>
                      <input
                        type="number"
                        value={formData.day}
                        onChange={(e) =>
                          setFormData({ ...formData, day: e.target.value })
                        }
                        min="1"
                        max="31"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  {formData.type === 'life' ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          제목 *
                        </label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                          }
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          위치
                        </label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({ ...formData, location: e.target.value })
                          }
                          placeholder="예: 빈, 잘츠부르크"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                        />
                      </div>
                    </>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        작품 선택 *
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsWorkModalOpen(true)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none text-left hover:bg-gray-50 transition flex items-center justify-between"
                      >
                        {selectedWork ? (
                          <span className="text-gray-900">
                            {selectedWork.catalogNumber} - {selectedWork.title}
                          </span>
                        ) : (
                          <span className="text-gray-500">작품을 선택하세요</span>
                        )}
                        <MdSearch className="w-5 h-5 text-gray-400" />
                      </button>
                      {formData.type === 'work' && !formData.workId && (
                        <input
                          type="text"
                          required
                          value={formData.workId}
                          className="hidden"
                        />
                      )}
                    </div>
                  )}

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      설명
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.highlight}
                        onChange={(e) =>
                          setFormData({ ...formData, highlight: e.target.checked })
                        }
                        className="w-4 h-4 text-slate-600 border-gray-300 rounded focus:ring-slate-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        하이라이트 이벤트로 표시
                      </span>
                    </label>
                  </div>
                </div>
                </div>
              </div>

              {/* Image */}
              <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-900 to-purple-700 px-6 py-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    🖼️ 이미지
                  </h2>
                </div>
                <div className="p-6">
                  <ImageUpload
                    label="일대기 이미지"
                    value={formData.image}
                    onChange={(url) => setFormData({ ...formData, image: url })}
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4">
                <Link
                  href="/admin/chronicles"
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  취소
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition disabled:opacity-50"
                >
                  {isSubmitting ? '등록 중...' : '일대기 등록'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Work Select Modal */}
      <WorkSelectModal
        isOpen={isWorkModalOpen}
        onClose={() => setIsWorkModalOpen(false)}
        onSelect={(workId, work) => {
          setFormData({ ...formData, workId });
          setSelectedWork({
            id: work.id,
            catalogNumber: work.catalogNumber,
            title: work.title,
          });
        }}
        selectedWorkId={formData.workId}
      />
    </AdminProtectedRoute>
  );
}
