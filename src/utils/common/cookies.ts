'use server';

import { LOGIN_USER_COOKIE_KEY } from '@/constant/cookies';
import { cookies } from 'next/headers';

export interface LoginUserDataType {
  nickName: string;
  accessToken: string;
  refreshToken: string;
  wishId: string;
}

export async function getLoginUserCookiesData(): Promise<LoginUserDataType | undefined> {
  const loginUserCookiesData = cookies().get(LOGIN_USER_COOKIE_KEY)?.value;

  if (!loginUserCookiesData) {
    return undefined;
  }

  const loginUserData: LoginUserDataType = JSON.parse(loginUserCookiesData);

  return { ...loginUserData };
}

export async function setLoginUserCookiesData(loginUserData: LoginUserDataType) {
  cookies().delete(LOGIN_USER_COOKIE_KEY);

  cookies().set(LOGIN_USER_COOKIE_KEY, JSON.stringify(loginUserData), {
    httpOnly: true,
    sameSite: 'strict',
  });
}

export async function resetLoginUserCookiesData() {
  cookies().delete(LOGIN_USER_COOKIE_KEY);
}
