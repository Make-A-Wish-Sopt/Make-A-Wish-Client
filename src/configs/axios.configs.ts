import axios from 'axios';

//client 객체 정의
export const apiRoute = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});
