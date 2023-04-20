import axios from 'axios';

//서버통신 함수
export const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {},
  withCredentials: true,
});
