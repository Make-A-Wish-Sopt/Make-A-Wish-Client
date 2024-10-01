import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { LOGIN_USER_COOKIE_KEY } from '@/constant/cookies';

export async function POST(request: Request) {
  const { loginUserData } = await request.json();

  const cookieStore = cookies();
  cookieStore.set(LOGIN_USER_COOKIE_KEY, JSON.stringify(loginUserData));

  return NextResponse.json({ success: true });
}
