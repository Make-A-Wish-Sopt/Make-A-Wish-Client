import { getLoginUserCookiesData, LoginUserDataType } from '@/utils/common/cookies';
import axios, { AxiosError } from 'axios';
import { updateAccessToken } from '../auth';
import { DefaultResponseType } from '@/types/api/response';
import { getCookie, setCookie } from 'cookies-next/client';
import { cookies } from 'next/headers';
import { LOGIN_USER_COOKIE_KEY } from '@/constant/cookies';

let tokenRefreshFlag = false;

//client 객체 정의
export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});

// 요청 인터셉터
client.interceptors.request.use(
  async function (config) {
    if (tokenRefreshFlag) {
      tokenRefreshFlag = false;
      return config;
    }

    if (config.headers.Authorization) {
      return config;
    }

    const loginUserCookiesData = await getLoginUserCookiesData();

    if (loginUserCookiesData) {
      config.headers['Authorization'] = `Bearer ${loginUserCookiesData.accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// 응답 인터셉터
client.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error: AxiosError) {
    // 재시도를 막기 위한 플래그 확인
    if (tokenRefreshFlag) {
      return Promise.reject(error);
    }

    if (error.response) {
      const responseData = error.response.data as DefaultResponseType;

      if (responseData.message === '유효하지 않은 토큰입니다.') {
        const data = await updateAccessToken();

        if (!data) {
          //재로그인 시키기
          return;
        }

        const { accessToken } = data;

        error.config.headers['Authorization'] = `Bearer ${accessToken}`;

        tokenRefreshFlag = true;

        return client(error.config);
      }
    }

    return Promise.reject(error);
  },
);
