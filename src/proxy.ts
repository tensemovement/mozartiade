import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 예외 경로들 - 리다이렉트하지 않음
  const excludedPaths = [
    '/coming-soon',
    '/api',
    '/_next',
    '/images',
    '/favicon',
  ];

  // 예외 경로 체크
  const isExcluded = excludedPaths.some(
    (path) => pathname.startsWith(path) || pathname === path
  );

  // 정적 파일 확장자 체크 (이미지, 폰트, 아이콘 등)
  const isStaticFile = /\.(ico|png|jpg|jpeg|gif|svg|webp|woff|woff2|ttf|eot)$/i.test(
    pathname
  );

  // 예외 경로나 정적 파일이 아닌 경우에만 리다이렉트
  if (!isExcluded && !isStaticFile) {
    return NextResponse.redirect(new URL('/coming-soon', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
