import { client } from '@/api/common/axios';
import { TokenResponse, UserInfo, ResponseType } from '@/types/kakaoLoginType';
import axios, { AxiosResponse } from 'axios';
import qs from 'qs';

export async function getTokenFromKakao(authCode: string) {
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

  const payload = qs.stringify({
    grant_type: "authorization_code",
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    code: authCode,
  });

  try {
    const response = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      payload,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get access token from Kakao");
  }
}

export async function sendTokenToServer(accessToken: string): Promise<ResponseType> {
  const url = 'https://www.sunmulzu.shop/api/v1/auth';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  };
  const requestBody = {
    socialType: 'KAKAO'
  };

  try {
    const response = await axios.post<ResponseType>(url, requestBody, { headers });
    console.log('Access token sent to the server successfully.');
    return response.data;
  } catch (error) {
    console.error('Failed to send access token to the server:', error);
    throw new Error('Failed to send access token to the server');
  }
}

export async function getUserFromKakao(accessToken: string): Promise<any> {
  const url = 'https://kapi.kakao.com/v2/user/me';
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  };

  try {
    const response = await axios.get(url, { headers });
    console.log('User information retrieved from Kakao successfully.');
    return response.data;
  } catch (error) {
    console.error('Failed to retrieve user information from Kakao:', error);
    throw new Error('Failed to retrieve user information from Kakao');
  }
}