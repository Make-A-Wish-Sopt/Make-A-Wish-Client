import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { LOGIN_USER_COOKIE_KEY } from '@/constant/cookies';
import { DefaultResponseType } from '@/types/api/response';
import { LoginUserDataType } from '@/utils/common/cookies';
import { setCookie } from 'cookies-next/server';

// export async function POST(request: Request) {
//   const cookiesData = await request.json();

//   const cookieStore = cookies();

//   cookieStore.set(LOGIN_USER_COOKIE_KEY, JSON.stringify(cookiesData), {
//     path: '/',
//     sameSite: 'lax',
//     httpOnly: true,
//   });

//   const data: LoginUserDataType = JSON.parse(cookieStore.get(LOGIN_USER_COOKIE_KEY)?.value);

//   return NextResponse.json<DefaultResponseType<LoginUserDataType>>({
//     success: true,
//     message: '쿠키 데이터 저장성공',
//     data: data,
//   });
// }
export async function POST(req: Request) {
  const cookiesData = await req.json();

  await setCookie('test', 'value');

  // 쿠키 설정을 위한 NextResponse 사용
  const response = NextResponse.json<DefaultResponseType<LoginUserDataType>>({
    success: true,
    message: '쿠키 데이터 저장 성공',
    data: cookiesData, // 전달된 쿠키 데이터 반환
  });

  response.cookies.set(LOGIN_USER_COOKIE_KEY, JSON.stringify(cookiesData), {
    path: '/',
    sameSite: 'lax', // 쿠키의 SameSite 정책
    httpOnly: true, // 클라이언트에서 접근 불가능하도록 설정
    secure: process.env.NODE_ENV === 'production', // 프로덕션 환경에서만 HTTPS 사용
  });

  return response;
}

export async function GET(req: any) {
  const cookieStore = await cookies();

  if (!cookieStore) {
    return NextResponse.json({ success: false });
  }

  const data = cookieStore;

  return NextResponse.json({ success: true, data: data });
}

export async function DELETE() {
  const cookieStore = await cookies();

  if (!cookieStore) {
    return NextResponse.json({ success: false });
  }

  cookieStore.delete(LOGIN_USER_COOKIE_KEY);

  return NextResponse.json({ success: true });
}
