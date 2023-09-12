import PATH from '@/constant/path';
import axios from 'axios';

//서버통신 함수
export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

client.interceptors.request.use(function (config: any) {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    config.headers['accessToken'] = null;
    return config;
  }

  if (config.headers && token) {
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  }
  return config;
});

client.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    console.log(error);

    if (error.response && error.response.status === 401) {
      if (error.response.data.message === '유효하지 않은 토큰입니다.') {
        alert('로그인 상태를 확인해주세요!');
        window.location.replace('/');
      }
    }
  },
);
