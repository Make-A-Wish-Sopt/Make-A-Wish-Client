import axios, { AxiosError } from 'axios';
import { getLoginUserCookiesData } from '@/utils/cookies';
import { DefaultResponseType } from '@/types/api/response';
import { updateAccessToken } from '../api/auth';

export const apiRoute = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

let tokenRefreshFlag = false;

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
        // await fetch('/api/cookies', {
        //   method: 'DELETE',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // });

        const data = await updateAccessToken();

        if (!data) {
          return; //에러
        }

        const { accessToken, refreshToken } = data;

        const loginUserCookiesData = await getLoginUserCookiesData();

        const newCookiesData = {
          ...loginUserCookiesData,
          accessToken: accessToken,
          refreshToken: refreshToken,
        };

        // const response = await fetch('/api/cookies', {
        //   method: 'POST',
        //   body: JSON.stringify(newCookiesData),
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   credentials: 'include',
        // });

        // const newLoginUserData: DefaultResponseType<LoginUserDataType> = await response.json();

        error.config.headers['Authorization'] = `Bearer ${accessToken}`;

        tokenRefreshFlag = true;

        return client(error.config);
      }
    }

    return Promise.reject(error);
  },
);

// import axios, { AxiosError, AxiosHeaders } from 'axios';
// import { getLoginUserCookiesData } from '@/utils/cookies';
// import { DefaultResponseType } from '@/types/api/response';
// import { updateAccessToken } from '../api/auth';

// // 인증 토큰 갱신 중복 방지를 위한 플래그
// let tokenRefreshFlag = false;

// // 공통 API 인스턴스 (토큰 없음)
// export const apiRoute = axios.create({
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // 메인 API 인스턴스
// export const client = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
// });

// // 요청 인터셉터
// client.interceptors.request.use(
//   async (config) => {
//     if (tokenRefreshFlag) {
//       tokenRefreshFlag = false;
//       return config;
//     }

//     // 이미 Authorization이 있으면 그대로 사용
//     if (config.headers && 'has' in config.headers && config.headers.has('Authorization')) {
//       return config;
//     }

//     const loginUserCookiesData = await getLoginUserCookiesData();

//     if (loginUserCookiesData && config.headers && 'set' in config.headers) {
//       (config.headers as AxiosHeaders).set(
//         'Authorization',
//         `Bearer ${loginUserCookiesData.accessToken}`,
//       );
//     }

//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// // 응답 인터셉터
// client.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     if (tokenRefreshFlag) {
//       return Promise.reject(error);
//     }

//     if (error.response) {
//       const responseData = error.response.data as DefaultResponseType;

//       if (responseData?.message === '유효하지 않은 토큰입니다.') {
//         const data = await updateAccessToken();

//         if (!data) {
//           // 재로그인 필요
//           return Promise.reject(error); // 또는 redirect 등 처리
//         }

//         const { accessToken } = data;

//         // 토큰 다시 설정
//         if (error.config?.headers && 'set' in error.config.headers) {
//           (error.config.headers as AxiosHeaders).set('Authorization', `Bearer ${accessToken}`);
//         }

//         tokenRefreshFlag = true;

//         return client(error.config); // 요청 재시도
//       }
//     }

//     return Promise.reject(error);
//   },
// );
