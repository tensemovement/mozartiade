'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';
import { MdPerson, MdFavorite, MdSettings } from 'react-icons/md';
import toast from 'react-hot-toast';

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  // 로그인 확인
  useEffect(() => {
    if (status === 'unauthenticated') {
      toast.error('로그인이 필요합니다.');
      router.push('/auth');
    }
  }, [status, router]);

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

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <Navigation />

      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* 메인 레이아웃 - 좌측 사이드바 + 우측 컨텐츠 */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* 좌측 사이드바 */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                  <nav className="flex flex-col">
                    <Link
                      href="/mypage/info"
                      className={`flex items-center gap-3 px-6 py-4 font-semibold transition-all border-l-4 ${
                        isActive('/mypage/info')
                          ? 'bg-primary-50 text-primary-700 border-primary-600'
                          : 'bg-white text-gray-700 border-transparent hover:bg-gray-50'
                      }`}
                    >
                      <MdPerson className="text-xl flex-shrink-0" />
                      <span>회원정보</span>
                    </Link>
                    <Link
                      href="/mypage/favorites"
                      className={`flex items-center gap-3 px-6 py-4 font-semibold transition-all border-l-4 ${
                        isActive('/mypage/favorites')
                          ? 'bg-primary-50 text-primary-700 border-primary-600'
                          : 'bg-white text-gray-700 border-transparent hover:bg-gray-50'
                      }`}
                    >
                      <MdFavorite className="text-xl flex-shrink-0" />
                      <span>좋아하는 작품</span>
                    </Link>
                    <Link
                      href="/mypage/settings"
                      className={`flex items-center gap-3 px-6 py-4 font-semibold transition-all border-l-4 ${
                        isActive('/mypage/settings')
                          ? 'bg-primary-50 text-primary-700 border-primary-600'
                          : 'bg-white text-gray-700 border-transparent hover:bg-gray-50'
                      }`}
                    >
                      <MdSettings className="text-xl flex-shrink-0" />
                      <span>설정</span>
                    </Link>
                  </nav>
                </div>
              </div>

              {/* 우측 컨텐츠 */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl shadow-md p-8">
                  {children}
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
