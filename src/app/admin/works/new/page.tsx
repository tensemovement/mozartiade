'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ImageUpload from '@/components/admin/ImageUpload';
import { useAdminApi } from '@/hooks/useAdminApi';
import { MdArrowBack, MdAdd, MdDelete } from 'react-icons/md';
import Link from 'next/link';

interface MovementForm {
  order: number;
  title: string;
  titleEn: string;
  character: string;
  description: string;
  youtubeUrl: string;
  duration: string;
  highlights: string;
}

export default function NewWorkPage() {
  const router = useRouter();
  const { post } = useAdminApi();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    catalogNumber: '',
    catalogNumberNumeric: '',
    catalogNumberSuffix: '',
    year: new Date().getFullYear(),
    month: '',
    day: '',
    compositionOrder: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Create work
      const workData = {
        ...formData,
        catalogNumberNumeric: formData.catalogNumberNumeric ? parseInt(formData.catalogNumberNumeric) : null,
        month: formData.month ? parseInt(formData.month) : null,
        day: formData.day ? parseInt(formData.day) : null,
        compositionOrder: formData.compositionOrder ? parseInt(formData.compositionOrder) : null,
        usageExamples: formData.usageExamples.filter(ex => ex.trim() !== ''),
      };

      const work = await post<any>('/api/admin/works', workData);

      // Create movements
      if (movements.length > 0) {
        await Promise.all(
          movements.map((movement) =>
            post(`/api/admin/works/${work.id}/movements`, movement)
          )
        );
      }

      alert('작품이 성공적으로 등록되었습니다.');
      router.push('/admin/works');
    } catch (err) {
      setError(err instanceof Error ? err.message : '작품 등록에 실패했습니다.');
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
              <h1 className="text-3xl font-bold text-gray-900">작품 추가</h1>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Basic Information */}
              <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden">
                <div className="bg-slate-900 px-6 py-4">
                  <h2 className="text-xl font-bold text-white">기본 정보</h2>
                </div>
                <div className="p-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      카탈로그 번호 *
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
                <div className="bg-slate-900 px-6 py-4">
                  <h2 className="text-xl font-bold text-white">이미지</h2>
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
                <div className="bg-slate-900 px-6 py-4">
                  <h2 className="text-xl font-bold text-white">상세 정보</h2>
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

              {/* Movements */}
              <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden">
                <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">악장</h2>
                  <button
                    type="button"
                    onClick={addMovement}
                    className="flex items-center space-x-2 px-4 py-2 bg-white text-slate-900 rounded-lg hover:bg-slate-50 transition font-semibold"
                  >
                    <MdAdd className="w-5 h-5" />
                    <span>악장 추가</span>
                  </button>
                </div>
                <div className="p-6">

                {movements.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-8 bg-slate-50 rounded-lg">
                    악장을 추가해주세요
                  </p>
                ) : (
                  <div className="space-y-6">
                    {movements.map((movement, index) => (
                      <div
                        key={index}
                        className="p-5 bg-slate-50 border-2 border-slate-200 rounded-xl hover:shadow-md transition-all"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium text-gray-900">
                            악장 {movement.order}
                          </h3>
                          <button
                            type="button"
                            onClick={() => removeMovement(index)}
                            className="text-red-600 hover:text-red-900"
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
                  {isSubmitting ? '등록 중...' : '작품 등록'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminProtectedRoute>
  );
}
