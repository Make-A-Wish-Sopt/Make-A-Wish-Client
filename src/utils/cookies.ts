'use server';

import LOGIN_USER_COOKIE_KEY from '@/constant/cookies';
import { cookies } from 'next/headers';

export interface LoginUserDataType {
  nickName: string;
  accessToken: string;
  refreshToken: string;
  wishId: string;
}

export async function getLoginUserCookiesData(): Promise<LoginUserDataType | undefined> {
  const cookieStore = await cookies();
  const loginUserCookiesData = cookieStore.get(LOGIN_USER_COOKIE_KEY)?.value;

  if (!loginUserCookiesData) {
    return undefined;
  }

  return JSON.parse(loginUserCookiesData);
}
