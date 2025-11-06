export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-cream to-secondary-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-6xl font-bold bg-gradient-to-r from-primary-700 via-secondary-600 to-accent-700 bg-clip-text text-transparent mb-6">
              EnjoyMozart Portal
            </h1>
            <p className="font-sans text-xl text-primary-900 mb-4">
              클래식 음악의 아름다움을 경험하세요
            </p>
            <p className="font-sans text-lg text-primary-700">
              모차르트의 우아함에서 영감받은 현대적인 웹 플랫폼
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-cream rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-primary-200 hover:border-primary-300 hover:-translate-y-1">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mr-3">
                  <span className="text-white text-xl">🎵</span>
                </div>
                <h2 className="font-serif text-2xl font-semibold text-primary-900">
                  우아한 디자인
                </h2>
              </div>
              <p className="font-sans text-primary-800">
                18세기 궁정의 화려함과 현대적 미니멀리즘의 조화
              </p>
            </div>

            <div className="bg-cream rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-secondary-200 hover:border-secondary-300 hover:-translate-y-1">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center mr-3">
                  <span className="text-white text-xl">🎼</span>
                </div>
                <h2 className="font-serif text-2xl font-semibold text-secondary-900">
                  타입 안정성
                </h2>
              </div>
              <p className="font-sans text-secondary-800">
                TypeScript와 Zod로 구축된 안전한 코드베이스
              </p>
            </div>

            <div className="bg-cream rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-primary-200 hover:border-primary-300 hover:-translate-y-1">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-700 to-accent-800 flex items-center justify-center mr-3">
                  <span className="text-white text-xl">⚡</span>
                </div>
                <h2 className="font-serif text-2xl font-semibold text-accent-900">
                  뛰어난 성능
                </h2>
              </div>
              <p className="font-sans text-accent-800">
                Next.js 14 App Router와 Server Components로 최적화
              </p>
            </div>

            <div className="bg-cream rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-secondary-200 hover:border-secondary-300 hover:-translate-y-1">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center mr-3">
                  <span className="text-white text-xl">🎻</span>
                </div>
                <h2 className="font-serif text-2xl font-semibold text-primary-900">
                  풀스택 솔루션
                </h2>
              </div>
              <p className="font-sans text-primary-800">
                Prisma와 Supabase PostgreSQL로 완벽한 데이터 관리
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <button className="font-sans bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
              시작하기
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
