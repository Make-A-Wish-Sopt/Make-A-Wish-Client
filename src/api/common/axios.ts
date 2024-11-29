import { getLoginUserCookiesData, LoginUserDataType } from '@/utils/common/cookies';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { updateAccessToken } from '../auth';
import { DefaultResponseType } from '@/types/api/response';

//client 객체 정의
export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
client.interceptors.request.use(
  async function (config) {
    // const accessToken = localStorage.getItem('accessToken');
    const loginUserCookiesData = await getLoginUserCookiesData();

    console.log('request : ', loginUserCookiesData.accessToken);

    if (!loginUserCookiesData) {
      return config;
    }

    const { accessToken } = loginUserCookiesData;

    if (config.headers) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

// 응답 인터셉터
client.interceptors.response.use(
  function (response) {
    console.log('first', response);
    return response;
  },
  async function (error: AxiosError) {
    const responseData = error.response.data as DefaultResponseType;
    const originalRequest: CustomAxiosRequestConfig = error.config;

    // 재시도를 막기 위한 플래그 확인
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    if (responseData.message === '유효하지 않은 토큰입니다.') {
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

      await fetch('http://localhost:8080/api/set-cookies', {
        method: 'POST',
        body: JSON.stringify(newCookiesData),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(async (response) => {
        const loginUserCookiesData: DefaultResponseType<LoginUserDataType> = await response.json();
        error.config.headers.Authorization = loginUserCookiesData.data.accessToken;
      });
      originalRequest._retry = true;

      return client(error.config);
    }

    return Promise.reject(error);
    // const originalRequest = error.config;
    // let retryFlg = false;

    // if (retryFlg) {
    //   return Promise.reject(error); // 이미 재시도된 요청은 다시 재시도하지 않음
    // }

    // // 토큰 만료 시 처리
    // if (error.response && error.response.data.message === '유효하지 않은 토큰입니다.') {
    //   try {
    //     // 1. accessToken 및 refreshToken 갱신
    // const { accessToken, refreshToken } = await updateAccessToken();

    //     const loginUserCookiesData = await getLoginUserCookiesData();

    //     if (accessToken && refreshToken) {
    //       // 2. 새 토큰 쿠키에 저장
    //       const newCookiesData = {
    //         ...loginUserCookiesData,
    //         accessToken: accessToken,
    //         refreshToken: refreshToken,
    //       };

    //       await axios.post(
    //         'http://localhost:8080/api/set-cookies',
    //         JSON.stringify(newCookiesData),
    //         {
    //           headers: {
    //             'Content-Type': 'application/json',
    //           },
    //         },
    //       );

    //       // 3. 갱신된 토큰을 헤더에 추가
    //       originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

    //       retryFlg = true;

    //       // 4. 원래 요청 재시도
    //       return client(originalRequest);
    //     } else {
    //       alert('로그인 상태를 확인해주세요!');
    //       window.location.replace('/');
    //     }
    //   } catch (e) {
    //     console.error('토큰 갱신 중 오류 발생:', e);
    //     window.location.replace('/');
    //   }
    // }

    // // 다른 에러 처리
    // if (error.response?.data?.message === '유효하지 않은 소원 링크입니다.') {
    //   alert(error.response.data.message);
    // } else if (
    //   error.response?.data?.message === '이미 진행 중인 소원 링크가 있습니다.' ||
    //   error.response?.data?.message === '주간이 끝난 소원 링크입니다.'
    // ) {
    //   alert(error.response?.data?.message);
    //   window.location.replace('/main');
    // }

    // return Promise.reject(error); // 에러를 그대로 반환
  },
);
