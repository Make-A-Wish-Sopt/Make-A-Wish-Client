import { getLoginUserCookiesData } from '@/utils/common/cookies';
import axios from 'axios';
import { updateAccessToken } from '../auth';

//client 객체 정의
export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

// 요청 인터셉터
client.interceptors.request.use(async function (config: any) {
  const { accessToken } = await getLoginUserCookiesData();

  if (!accessToken) {
    config.headers['accessToken'] = '';
  }

  if (!config.headers) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

// 응답 인터셉터
client.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error: any) {
    const originalRequest = error.config;

    // 무한 재시도를 방지하기 위해 재시도 여부 플래그를 추가
    if (originalRequest._retry) {
      return Promise.reject(error); // 이미 재시도된 요청이면 에러 반환
    }

    // 토큰 만료 시 처리
    if (error.response && error.response.data.message === '유효하지 않은 토큰입니다.') {
      originalRequest._retry = true; // 재시도 여부 플래그 설정

      try {
        // 1. accessToken 및 refreshToken 갱신
        const { accessToken, refreshToken } = await updateAccessToken();

        const loginUserCookiesData = await getLoginUserCookiesData();

        if (accessToken && refreshToken) {
          // 2. 새 토큰 쿠키에 저장
          const newCookiesData = {
            ...loginUserCookiesData,
            accessToken: accessToken,
            refreshToken: refreshToken,
          };

          await fetch('http://localhost:8080/api/set-cookies', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCookiesData),
          });

          // 3. 갱신된 토큰을 헤더에 추가
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

          // 4. 원래 요청 재시도
          return client(originalRequest);
        } else {
          alert('로그인 상태를 확인해주세요!');
          window.location.replace('/');
        }
      } catch (e) {
        console.error('토큰 갱신 중 오류 발생:', e);
        window.location.replace('/');
      }
    }

    // 다른 에러 처리
    if (error.response?.data?.message === '유효하지 않은 소원 링크입니다.') {
      alert(error.response.data.message);
    } else if (
      error.response?.data?.message === '이미 진행 중인 소원 링크가 있습니다.' ||
      error.response?.data?.message === '주간이 끝난 소원 링크입니다.'
    ) {
      alert(error.response?.data?.message);
      window.location.replace('/main');
    }

    return Promise.reject(error); // 에러를 그대로 반환
  },
);
