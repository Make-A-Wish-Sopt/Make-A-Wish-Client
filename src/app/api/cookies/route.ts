import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { LOGIN_USER_COOKIE_KEY } from '@/constant/cookies';
import { DefaultResponseType } from '@/types/api/response';
import { LoginUserDataType } from '@/utils/common/cookies';

export async function POST(request: Request) {
  const cookiesData = await request.json();

  const cookieStore = cookies();

  cookieStore.set(LOGIN_USER_COOKIE_KEY, JSON.stringify(cookiesData), {
    path: '/',
    sameSite: 'lax',
    httpOnly: true,
  });

  const data: LoginUserDataType = JSON.parse(cookieStore.get(LOGIN_USER_COOKIE_KEY)?.value);

  return NextResponse.json<DefaultResponseType<LoginUserDataType>>({
    success: true,
    message: '쿠키 데이터 저장성공',
    data: data,
  });
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
