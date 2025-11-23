'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Work } from '@/types';
import { MdPerson, MdFavorite, MdSettings, MdEmail, MdCalendarToday, MdNotifications, MdDelete, MdPlayArrow } from 'react-icons/md';
import { getGenreLabel } from '@/lib/constants';
import toast from 'react-hot-toast';

type TabType = 'profile' | 'favorites' | 'settings';

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [likedWorks, setLikedWorks] = useState<Work[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 로그인 확인
  useEffect(() => {
    if (status === 'unauthenticated') {
      toast.error('로그인이 필요합니다.');
      router.push('/auth');
    }
  }, [status, router]);

  // 좋아하는 작품 목록 가져오기
  useEffect(() => {
    if (activeTab === 'favorites' && status === 'authenticated') {
      fetchLikedWorks();
    }
  }, [activeTab, status]);

  const fetchLikedWorks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/profile/liked-works');
      const result = await response.json();

      if (result.success) {
        setLikedWorks(result.data);
      } else {
        toast.error(result.error || '좋아하는 작품을 불러오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('Error fetching liked works:', error);
      toast.error('좋아하는 작품을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="lg" message="로딩 중..." />
        </div>
      </>
    );
  }

  if (!session) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <Navigation />

      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* 헤더 */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || '프로필'}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                  ) : (
                    <MdPerson className="text-4xl text-primary-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    {session.user.name || '사용자'}
                  </h1>
                  <p className="text-gray-600 truncate">{session.user.email}</p>
                </div>
              </div>
            </div>

            {/* 메인 레이아웃 - 좌측 사이드바 + 우측 컨텐츠 */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* 좌측 사이드바 */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                  <nav className="flex flex-col">
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`flex items-center gap-3 px-6 py-4 text-left font-semibold transition-all border-l-4 ${
                        activeTab === 'profile'
                          ? 'bg-primary-50 text-primary-700 border-primary-600'
                          : 'bg-white text-gray-700 border-transparent hover:bg-gray-50'
                      }`}
                    >
                      <MdPerson className="text-xl flex-shrink-0" />
                      <span>회원정보</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('favorites')}
                      className={`flex items-center gap-3 px-6 py-4 text-left font-semibold transition-all border-l-4 ${
                        activeTab === 'favorites'
                          ? 'bg-primary-50 text-primary-700 border-primary-600'
                          : 'bg-white text-gray-700 border-transparent hover:bg-gray-50'
                      }`}
                    >
                      <MdFavorite className="text-xl flex-shrink-0" />
                      <span>좋아하는 작품</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('settings')}
                      className={`flex items-center gap-3 px-6 py-4 text-left font-semibold transition-all border-l-4 ${
                        activeTab === 'settings'
                          ? 'bg-primary-50 text-primary-700 border-primary-600'
                          : 'bg-white text-gray-700 border-transparent hover:bg-gray-50'
                      }`}
                    >
                      <MdSettings className="text-xl flex-shrink-0" />
                      <span>설정</span>
                    </button>
                  </nav>
                </div>
              </div>

              {/* 우측 컨텐츠 */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl shadow-md p-8">
                  {/* 회원정보 탭 */}
                  {activeTab === 'profile' && (
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
                  )}

                  {/* 좋아하는 작품 탭 */}
                  {activeTab === 'favorites' && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        좋아하는 작품 ({likedWorks.length})
                      </h2>
                      {isLoading ? (
                        <LoadingSpinner size="md" message="로딩 중..." />
                      ) : likedWorks.length === 0 ? (
                        <div className="text-center py-12">
                          <MdFavorite className="text-6xl text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500 text-lg mb-4">좋아하는 작품이 없습니다.</p>
                          <Link
                            href="/works"
                            className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors"
                          >
                            작품 탐색하기
                          </Link>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                          {likedWorks.map((work) => (
                            <Link
                              key={work.id}
                              href={`/works/${work.id}`}
                              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105"
                            >
                              <div className="relative h-48 bg-gradient-to-br from-primary-100 to-secondary-100">
                                {work.image && (
                                  <Image
                                    src={work.image}
                                    alt={work.title}
                                    fill
                                    className="object-cover"
                                  />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-4 left-4">
                                  {work.catalogNumber && (
                                    <span className="px-3 py-1 bg-accent/90 text-white text-sm font-bold rounded-full">
                                      {work.catalogNumber}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-primary-600 transition-colors line-clamp-1">
                                  {work.title}
                                </h3>
                                {work.titleEn && (
                                  <p className="text-sm text-gray-500 italic mb-2 line-clamp-1">
                                    {work.titleEn}
                                  </p>
                                )}
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  {work.genre && (
                                    <span className="px-2 py-1 bg-gray-100 rounded">
                                      {getGenreLabel(work.genre)}
                                    </span>
                                  )}
                                  <span>{work.year}</span>
                                </div>
                                <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                                  <div className="flex items-center gap-1">
                                    <MdFavorite className="text-accent" />
                                    <span>{work.likesCount || 0}</span>
                                  </div>
                                  {work.youtubeUrl && (
                                    <div className="flex items-center gap-1">
                                      <MdPlayArrow className="text-primary-600" />
                                      <span>감상</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 설정 탭 */}
                  {activeTab === 'settings' && (
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
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
