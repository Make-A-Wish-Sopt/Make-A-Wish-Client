import { getLoginUserCookiesData } from '@/utils/common/cookies';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // 현재 경로 확인
  const pathname = request.nextUrl.pathname;

  // 쿠키에서 로그인 상태 확인
  const isLoggedIn = !!(await getLoginUserCookiesData());

  // 로그인한 사용자가 메인 페이지('/')에 접근하는 경우
  if (isLoggedIn && pathname === '/') {
    return NextResponse.redirect(new URL('/wishes', request.url));
  }

  return NextResponse.next();
}
