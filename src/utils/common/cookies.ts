'use server';

import { LOGIN_USER_COOKIE_KEY } from '@/constant/cookies';
import { cookies } from 'next/headers';

export interface LoginUserDataType {
  nickName: string;
  accessToken: string;
  refreshToken: string;
  wishId: string;
}

export async function getCookieData(): Promise<LoginUserDataType> {
  const cookieData = cookies().get(LOGIN_USER_COOKIE_KEY);
  return new Promise((resolve) =>
    setTimeout(() => {
      if (cookieData) {
        resolve(JSON.parse(cookieData.value));
      }
    }, 1000),
  );
}

export async function getLoginUserCookiesData(): Promise<LoginUserDataType | undefined> {
  const loginUserCookiesData = cookies().get(LOGIN_USER_COOKIE_KEY)?.value;

  if (!loginUserCookiesData) {
    return undefined;
  }

  const loginUserData: LoginUserDataType = JSON.parse(loginUserCookiesData);

  return { ...loginUserData };
}
