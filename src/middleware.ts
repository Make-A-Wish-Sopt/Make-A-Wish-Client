import { getLoginUserCookiesData } from '@/utils/common/cookies';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 로그인 필요 경로 목록
const protectedRoutes = ['/wishes'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isFileRequest = pathname.match(/\.\w+$/);
  if (isFileRequest) return NextResponse.next();

  const isLoggedIn = !!(await getLoginUserCookiesData());

  // 로그인한 사용자가 메인 페이지('/')에 접근하는 경우 리디렉션
  if (isLoggedIn && pathname === '/') {
    return NextResponse.redirect(new URL('/wishes', request.url));
  }

  // 로그인하지 않은 사용자가 보호된 경로에 접근하는 경우 로그인 페이지로 리디렉션
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (!isLoggedIn && isProtected) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
