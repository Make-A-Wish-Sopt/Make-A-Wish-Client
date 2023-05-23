import axios from 'axios';

//서버통신 함수
export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
