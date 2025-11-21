'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isLogin) {
        // 로그인
        const result = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.error) {
          setError(result.error);
        } else {
          router.push('/');
          router.refresh();
        }
      } else {
        // 회원가입
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || '회원가입에 실패했습니다.');
        } else {
          // 회원가입 성공 후 자동 로그인
          const result = await signIn('credentials', {
            email: formData.email,
            password: formData.password,
            redirect: false,
          });

          if (result?.error) {
            setError(result.error);
          } else {
            router.push('/');
            router.refresh();
          }
        }
      }
    } catch (error) {
      setError('오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-12">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/m/mozart004.jpg)' }}
      />

      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gray-700/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* 메인 컨테이너 */}
      <div className="relative w-full max-w-md">
        {/* 로고/타이틀 */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="font-serif text-4xl font-bold text-white mb-2">
              Mozartiade
            </h1>
          </Link>
          <p className="text-gray-300 font-sans">
            모차르트의 세계로 떠나는 여정
          </p>
        </div>

        {/* 인증 카드 */}
        <div className="glass-card rounded-2xl shadow-elevated p-8 backdrop-blur-xl bg-gray-900/95 border border-gray-800">
          {/* 탭 전환 */}
          <div className="flex mb-8 bg-gray-800 rounded-xl p-1">
            <button
              onClick={() => {
                setIsLogin(true);
                setError('');
              }}
              className={`flex-1 py-3 rounded-lg font-sans font-semibold transition-all duration-300 ${
                isLogin
                  ? 'bg-gray-950 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              로그인
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setError('');
              }}
              className={`flex-1 py-3 rounded-lg font-sans font-semibold transition-all duration-300 ${
                !isLogin
                  ? 'bg-gray-950 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              회원가입
            </button>
          </div>

          {/* 에러 메시지 */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm font-sans">{error}</p>
            </div>
          )}

          {/* 폼 */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 이름 (회원가입만) */}
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-sans font-semibold text-gray-300 mb-2">
                  이름
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MdPerson className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all font-sans placeholder-gray-500"
                    placeholder="홍길동"
                  />
                </div>
              </div>
            )}

            {/* 이메일 */}
            <div>
              <label htmlFor="email" className="block text-sm font-sans font-semibold text-gray-300 mb-2">
                이메일
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MdEmail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all font-sans placeholder-gray-500"
                  placeholder="example@email.com"
                />
              </div>
            </div>

            {/* 비밀번호 */}
            <div>
              <label htmlFor="password" className="block text-sm font-sans font-semibold text-gray-300 mb-2">
                비밀번호
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MdLock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all font-sans placeholder-gray-500"
                  placeholder="••••••••"
                />
              </div>
              {!isLogin && (
                <p className="mt-2 text-xs text-gray-400 font-sans">
                  최소 6자 이상 입력해주세요
                </p>
              )}
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gray-950 text-white rounded-lg font-sans font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed border border-gray-700"
            >
              {isLoading ? '처리 중...' : isLogin ? '로그인' : '회원가입'}
            </button>
          </form>
        </div>

        {/* 하단 링크 */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-gray-300 hover:text-white font-sans text-sm transition-colors"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
