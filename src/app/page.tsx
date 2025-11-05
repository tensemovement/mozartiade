export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-violet-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to EnjoyMozart Lab
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A modern web application built with Next.js, TypeScript, and Tailwind CSS
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-card hover:shadow-elevated transition-shadow duration-200 p-6 border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Modern Design
              </h2>
              <p className="text-gray-600">
                Beautiful, minimalist UI with glass morphism effects and smooth animations
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-card hover:shadow-elevated transition-shadow duration-200 p-6 border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Type Safe
              </h2>
              <p className="text-gray-600">
                Built with TypeScript and Zod for runtime validation and type safety
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-card hover:shadow-elevated transition-shadow duration-200 p-6 border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Fast Performance
              </h2>
              <p className="text-gray-600">
                Optimized with Next.js 14 App Router and Server Components
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-card hover:shadow-elevated transition-shadow duration-200 p-6 border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Full Stack
              </h2>
              <p className="text-gray-600">
                Database integration with Prisma and Supabase PostgreSQL
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
