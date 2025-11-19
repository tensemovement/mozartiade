'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ImageUpload from '@/components/admin/ImageUpload';
import { useAdminApi } from '@/hooks/useAdminApi';
import { MdArrowBack, MdAdd, MdDelete } from 'react-icons/md';
import Link from 'next/link';

interface MovementForm {
  id?: string;
  order: number;
  title: string;
  titleEn: string;
  character: string;
  description: string;
  youtubeUrl: string;
  duration: string;
  highlights: string;
}

interface RelatedLinkForm {
  id?: string;
  title: string;
  url: string;
  description: string;
  order: number;
}

export default function EditWorkPage() {
  const router = useRouter();
  const params = useParams();
  const workId = params.id as string;
  const { get, put, post, del } = useAdminApi();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    catalogNumber: '',
    catalogNumberNumeric: '',
    catalogNumberSuffix: '',
    catalogNumberFirstEd: '',
    catalogNumberNinthEd: '',
    year: new Date().getFullYear(),
    month: '',
    day: '',
    compositionOrder: '',
    compositionLocation: '',
    title: '',
    titleEn: '',
    description: '',
    genre: '',
    youtubeUrl: '',
    sheetMusicUrl: '',
    compositionDetails: '',
    highlight: false,
    image: '',
    detailImage: '',
    behindStory: '',
    usageExamples: [''],
  });

  const [movements, setMovements] = useState<MovementForm[]>([]);
  const [deletedMovementIds, setDeletedMovementIds] = useState<string[]>([]);

  const [relatedLinks, setRelatedLinks] = useState<RelatedLinkForm[]>([]);
  const [deletedRelatedLinkIds, setDeletedRelatedLinkIds] = useState<string[]>([]);

  useEffect(() => {
    fetchWork();
  }, [workId]);

  const fetchWork = async () => {
    setIsLoading(true);
    try {
      const work = await get<any>(`/api/admin/works/${workId}`);

      setFormData({
        catalogNumber: work.catalogNumber || '',
        catalogNumberNumeric: work.catalogNumberNumeric?.toString() || '',
        catalogNumberSuffix: work.catalogNumberSuffix || '',
        catalogNumberFirstEd: work.catalogNumberFirstEd || '',
        catalogNumberNinthEd: work.catalogNumberNinthEd || '',
        year: work.year,
        month: work.month?.toString() || '',
        day: work.day?.toString() || '',
        compositionOrder: work.compositionOrder?.toString() || '',
        compositionLocation: work.compositionLocation || '',
        title: work.title,
        titleEn: work.titleEn || '',
        description: work.description,
        genre: work.genre || '',
        youtubeUrl: work.youtubeUrl || '',
        sheetMusicUrl: work.sheetMusicUrl || '',
        compositionDetails: work.compositionDetails || '',
        highlight: work.highlight || false,
        image: work.image || '',
        detailImage: work.detailImage || '',
        behindStory: work.behindStory || '',
        usageExamples: work.usageExamples?.length > 0 ? work.usageExamples : [''],
      });

      if (work.movements && work.movements.length > 0) {
        setMovements(work.movements.map((m: any) => ({
          id: m.id,
          order: m.order,
          title: m.title,
          titleEn: m.titleEn || '',
          character: m.character || '',
          description: m.description,
          youtubeUrl: m.youtubeUrl || '',
          duration: m.duration || '',
          highlights: m.highlights || '',
        })));
      }

      if (work.relatedLinks && work.relatedLinks.length > 0) {
        setRelatedLinks(work.relatedLinks.map((link: any) => ({
          id: link.id,
          title: link.title,
          url: link.url,
          description: link.description || '',
          order: link.order,
        })));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '작품 정보를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Update work
      const workData = {
        ...formData,
        catalogNumberNumeric: formData.catalogNumberNumeric ? parseInt(formData.catalogNumberNumeric) : null,
        month: formData.month ? parseInt(formData.month) : null,
        day: formData.day ? parseInt(formData.day) : null,
        compositionOrder: formData.compositionOrder ? parseInt(formData.compositionOrder) : null,
        usageExamples: formData.usageExamples.filter(ex => ex.trim() !== ''),
      };

      await put(`/api/admin/works/${workId}`, workData);

      // Delete removed movements
      for (const movementId of deletedMovementIds) {
        await del(`/api/admin/movements/${movementId}`);
      }

      // Update or create movements
      for (const movement of movements) {
        if (movement.id) {
          // Update existing movement
          await put(`/api/admin/movements/${movement.id}`, movement);
        } else {
          // Create new movement
          await post(`/api/admin/works/${workId}/movements`, movement);
        }
      }

      // Delete removed related links
      for (const linkId of deletedRelatedLinkIds) {
        await del(`/api/admin/related-links/${linkId}`);
      }

      // Update or create related links
      for (const link of relatedLinks) {
        if (link.id) {
          // Update existing link
          await put(`/api/admin/related-links/${link.id}`, link);
        } else {
          // Create new link
          await post(`/api/admin/works/${workId}/related-links`, link);
        }
      }

      alert('작품이 성공적으로 수정되었습니다.');
      router.push('/admin/works');
    } catch (err) {
      setError(err instanceof Error ? err.message : '작품 수정에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addMovement = () => {
    setMovements([
      ...movements,
      {
        order: movements.length + 1,
        title: '',
        titleEn: '',
        character: '',
        description: '',
        youtubeUrl: '',
        duration: '',
        highlights: '',
      },
    ]);
  };

  const removeMovement = (index: number) => {
    const movement = movements[index];
    if (movement.id) {
      setDeletedMovementIds([...deletedMovementIds, movement.id]);
    }
    setMovements(movements.filter((_, i) => i !== index));
  };

  const updateMovement = (index: number, field: keyof MovementForm, value: any) => {
    const updated = [...movements];
    updated[index] = { ...updated[index], [field]: value };
    setMovements(updated);
  };

  const addUsageExample = () => {
    setFormData({ ...formData, usageExamples: [...formData.usageExamples, ''] });
  };

  const removeUsageExample = (index: number) => {
    setFormData({
      ...formData,
      usageExamples: formData.usageExamples.filter((_, i) => i !== index),
    });
  };

  const updateUsageExample = (index: number, value: string) => {
    const updated = [...formData.usageExamples];
    updated[index] = value;
    setFormData({ ...formData, usageExamples: updated });
  };

  const addRelatedLink = () => {
    setRelatedLinks([
      ...relatedLinks,
      {
        title: '',
        url: '',
        description: '',
        order: relatedLinks.length + 1,
      },
    ]);
  };

  const removeRelatedLink = (index: number) => {
    const link = relatedLinks[index];
    if (link.id) {
      setDeletedRelatedLinkIds([...deletedRelatedLinkIds, link.id]);
    }
    setRelatedLinks(relatedLinks.filter((_, i) => i !== index));
  };

  const updateRelatedLink = (index: number, field: keyof RelatedLinkForm, value: any) => {
    const updated = [...relatedLinks];
    updated[index] = { ...updated[index], [field]: value };
    setRelatedLinks(updated);
  };

  if (isLoading) {
    return (
      <AdminProtectedRoute>
        <div className="flex">
          <AdminSidebar />
          <div className="flex-1 ml-64 p-8">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-900 border-t-transparent"></div>
            </div>
          </div>
        </div>
      </AdminProtectedRoute>
    );
  }

  return (
    <AdminProtectedRoute>
      <div className="flex">
        <AdminSidebar />

        <div className="flex-1 ml-64 h-screen overflow-y-auto">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <Link
                href="/admin/works"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
              >
                <MdArrowBack className="w-5 h-5 mr-2" />
                작품 목록으로
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">작품 수정</h1>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Basic Information */}
              <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-slate-900 to-slate-700 px-6 py-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    📝 기본 정보
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      카탈로그 번호 (6th Edition) *
                    </label>
                    <input
                      type="text"
                      value={formData.catalogNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, catalogNumber: e.target.value })
                      }
                      placeholder="K.525"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                    />
                    <p className="mt-1 text-xs text-gray-500">사용자 화면에 표시되는 기본 버전</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        번호 (숫자)
                      </label>
                      <input
                        type="number"
                        value={formData.catalogNumberNumeric}
                        onChange={(e) =>
                          setFormData({ ...formData, catalogNumberNumeric: e.target.value })
                        }
                        placeholder="525"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        접미사
                      </label>
                      <input
                        type="text"
                        value={formData.catalogNumberSuffix}
                        onChange={(e) =>
                          setFormData({ ...formData, catalogNumberSuffix: e.target.value })
                        }
                        placeholder="a, b, c..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      카탈로그 번호 (First Edition 1862)
                    </label>
                    <input
                      type="text"
                      value={formData.catalogNumberFirstEd}
                      onChange={(e) =>
                        setFormData({ ...formData, catalogNumberFirstEd: e.target.value })
                      }
                      placeholder="K.525"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                    />
                    <p className="mt-1 text-xs text-gray-500">원본 초판 (1862년)</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      카탈로그 번호 (9th Edition 2024)
                    </label>
                    <input
                      type="text"
                      value={formData.catalogNumberNinthEd}
                      onChange={(e) =>
                        setFormData({ ...formData, catalogNumberNinthEd: e.target.value })
                      }
                      placeholder="K.525"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                    />
                    <p className="mt-1 text-xs text-gray-500">최신 9판 (2024년)</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      제목 (한글) *
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
                      제목 (영문)
                    </label>
                    <input
                      type="text"
                      value={formData.titleEn}
                      onChange={(e) =>
                        setFormData({ ...formData, titleEn: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      장르
                    </label>
                    <input
                      type="text"
                      value={formData.genre}
                      onChange={(e) =>
                        setFormData({ ...formData, genre: e.target.value })
                      }
                      placeholder="교향곡, 협주곡, 소나타..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        작곡년도 *
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      작곡 장소
                    </label>
                    <input
                      type="text"
                      value={formData.compositionLocation}
                      onChange={(e) =>
                        setFormData({ ...formData, compositionLocation: e.target.value })
                      }
                      placeholder="Vienna, Salzburg, Prague..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                    />
                    <p className="mt-1 text-xs text-gray-500">작품이 작곡된 도시/장소</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      작곡 순서
                    </label>
                    <input
                      type="number"
                      value={formData.compositionOrder}
                      onChange={(e) =>
                        setFormData({ ...formData, compositionOrder: e.target.value })
                      }
                      placeholder="같은 년도 내 순서"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      설명 *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      YouTube URL
                    </label>
                    <input
                      type="url"
                      value={formData.youtubeUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, youtubeUrl: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      악보 URL
                    </label>
                    <input
                      type="url"
                      value={formData.sheetMusicUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, sheetMusicUrl: e.target.value })
                      }
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
                        하이라이트 작품으로 표시
                      </span>
                    </label>
                  </div>
                  </div>
                </div>
              </div>

              {/* Images */}
              <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-900 to-purple-700 px-6 py-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    🖼️ 이미지
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ImageUpload
                    label="목록 이미지"
                    value={formData.image}
                    onChange={(url) => setFormData({ ...formData, image: url })}
                  />
                  <ImageUpload
                    label="상세 페이지 이미지"
                    value={formData.detailImage}
                    onChange={(url) => setFormData({ ...formData, detailImage: url })}
                  />
                  </div>
                </div>
              </div>

              {/* Detail Information */}
              <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-6 py-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    📄 상세 정보
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      작곡 세부사항
                    </label>
                    <textarea
                      value={formData.compositionDetails}
                      onChange={(e) =>
                        setFormData({ ...formData, compositionDetails: e.target.value })
                      }
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      비하인드 스토리
                    </label>
                    <textarea
                      value={formData.behindStory}
                      onChange={(e) =>
                        setFormData({ ...formData, behindStory: e.target.value })
                      }
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        활용 사례
                      </label>
                      <button
                        type="button"
                        onClick={addUsageExample}
                        className="text-sm text-slate-600 hover:text-slate-900"
                      >
                        + 추가
                      </button>
                    </div>
                    <div className="space-y-2">
                      {formData.usageExamples.map((example, index) => (
                        <div key={index} className="flex space-x-2">
                          <input
                            type="text"
                            value={example}
                            onChange={(e) => updateUsageExample(index, e.target.value)}
                            placeholder="예: 영화 아마데우스"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                          />
                          {formData.usageExamples.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeUsageExample(index)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <MdDelete className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                </div>
              </div>

              {/* Related Links */}
              <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-green-900 to-green-700 px-6 py-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    🔗 관련 링크
                  </h2>
                  <button
                    type="button"
                    onClick={addRelatedLink}
                    className="flex items-center space-x-2 px-4 py-2 bg-white text-green-900 rounded-lg hover:bg-green-50 transition font-semibold"
                  >
                    <MdAdd className="w-5 h-5" />
                    <span>링크 추가</span>
                  </button>
                </div>
                <div className="p-6">
                  {relatedLinks.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-8 bg-gray-50 rounded-lg">
                      관련 링크를 추가해주세요
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {relatedLinks.map((link, index) => (
                        <div
                          key={link.id || index}
                          className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl hover:shadow-md transition-all"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                                {link.order}
                              </div>
                              <h3 className="font-bold text-gray-900 text-lg">
                                링크 #{link.order}
                              </h3>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeRelatedLink(index)}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                            >
                              <MdDelete className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              순서
                            </label>
                            <input
                              type="number"
                              value={link.order}
                              onChange={(e) =>
                                updateRelatedLink(index, 'order', parseInt(e.target.value))
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              제목 <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={link.title}
                              onChange={(e) =>
                                updateRelatedLink(index, 'title', e.target.value)
                              }
                              placeholder="예: 모차르트 공식 웹사이트"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                              required
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              URL <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="url"
                              value={link.url}
                              onChange={(e) =>
                                updateRelatedLink(index, 'url', e.target.value)
                              }
                              placeholder="https://example.com"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                              required
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              설명
                            </label>
                            <input
                              type="text"
                              value={link.description}
                              onChange={(e) =>
                                updateRelatedLink(index, 'description', e.target.value)
                              }
                              placeholder="링크에 대한 간단한 설명"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  )}
                </div>
              </div>

              {/* Movements */}
              <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-amber-900 to-orange-700 px-6 py-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    🎵 악장
                  </h2>
                  <button
                    type="button"
                    onClick={addMovement}
                    className="flex items-center space-x-2 px-4 py-2 bg-white text-amber-900 rounded-lg hover:bg-amber-50 transition font-semibold"
                  >
                    <MdAdd className="w-5 h-5" />
                    <span>악장 추가</span>
                  </button>
                </div>
                <div className="p-6">
                  {movements.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-8 bg-gray-50 rounded-lg">
                      악장을 추가해주세요
                    </p>
                  ) : (
                    <div className="space-y-6">
                      {movements.map((movement, index) => (
                        <div
                          key={movement.id || index}
                          className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl hover:shadow-md transition-all"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                                {movement.order}
                              </div>
                              <h3 className="font-bold text-gray-900 text-lg">
                                악장 #{movement.order}
                              </h3>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeMovement(index)}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                            >
                              <MdDelete className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              순서
                            </label>
                            <input
                              type="number"
                              value={movement.order}
                              onChange={(e) =>
                                updateMovement(index, 'order', parseInt(e.target.value))
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              재생시간
                            </label>
                            <input
                              type="text"
                              value={movement.duration}
                              onChange={(e) =>
                                updateMovement(index, 'duration', e.target.value)
                              }
                              placeholder="04:30"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              제목 (한글)
                            </label>
                            <input
                              type="text"
                              value={movement.title}
                              onChange={(e) =>
                                updateMovement(index, 'title', e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              제목 (영문)
                            </label>
                            <input
                              type="text"
                              value={movement.titleEn}
                              onChange={(e) =>
                                updateMovement(index, 'titleEn', e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              등장인물/캐릭터
                            </label>
                            <input
                              type="text"
                              value={movement.character}
                              onChange={(e) =>
                                updateMovement(index, 'character', e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              YouTube URL
                            </label>
                            <input
                              type="url"
                              value={movement.youtubeUrl}
                              onChange={(e) =>
                                updateMovement(index, 'youtubeUrl', e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              설명
                            </label>
                            <textarea
                              value={movement.description}
                              onChange={(e) =>
                                updateMovement(index, 'description', e.target.value)
                              }
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              하이라이트
                            </label>
                            <textarea
                              value={movement.highlights}
                              onChange={(e) =>
                                updateMovement(index, 'highlights', e.target.value)
                              }
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                            />
                          </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4">
                <Link
                  href="/admin/works"
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  취소
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition disabled:opacity-50"
                >
                  {isSubmitting ? '수정 중...' : '작품 수정'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminProtectedRoute>
  );
}
