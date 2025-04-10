import { getLoginUserCookiesData } from '@/utils/cookies';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 보호된 경로를 정규식으로 정의
const protectedRoutes = [/^\/wishes/, /^\/mypage\/edit(\/|$)/, /^\/mypage\/history(\/|$)/];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 정적 파일 요청은 필터링 (ex: .js, .css, .png 등)
  const isFileRequest = pathname.match(/\.\w+$/);
  if (isFileRequest) return NextResponse.next();

  const isLoggedIn = !!(await getLoginUserCookiesData());

  // 로그인한 사용자가 메인 페이지('/')에 접근 시 /wishes로 리디렉션
  if (isLoggedIn && pathname === '/') {
    return NextResponse.redirect(new URL('/wishes', request.url));
  }

  // 보호된 경로 접근 여부 판단 (정규식 사용)
  const isProtected = protectedRoutes.some((route) => route.test(pathname));

  // 로그인하지 않은 사용자가 보호된 경로 접근 시 /로 리디렉션
  if (!isLoggedIn && isProtected) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
