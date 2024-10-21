'use server';

import { LOGIN_USER_COOKIE_KEY } from '@/constant/cookies';
import { cookies } from 'next/headers';

const cookie = cookies();

export interface LoginUserDataType {
  nickName: string;
  accessToken: string;
  refreshToken: string;
  wishId: string;
}

export async function getLoginUserCookiesData(): Promise<any | undefined> {
  const loginUserCookiesData = cookie.get(LOGIN_USER_COOKIE_KEY)?.value;

  if (!loginUserCookiesData) {
    return undefined;
  }

  const loginUserData: LoginUserDataType = JSON.parse(loginUserCookiesData);

  return { ...loginUserData };
}

export async function setLoginUserCookiesData(loginUserData: LoginUserDataType) {
  cookie.delete(LOGIN_USER_COOKIE_KEY);

  console.log(loginUserData);

  cookie.set(LOGIN_USER_COOKIE_KEY, JSON.stringify(loginUserData), {
    httpOnly: true,
    sameSite: 'strict',
  });
}

export async function resetLoginUserCookiesData() {
  cookie.delete(LOGIN_USER_COOKIE_KEY);
}
