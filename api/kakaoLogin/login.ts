import { client } from '@/api/common/axios';
import { AxiosRequestConfig } from 'axios';

import { TokenResponse, UserInfo, ResponseType } from '@/types/kakaoLoginType';

export async function getTokenFromKakao(authCode: string): Promise<TokenResponse> {
  const url = 'https://kauth.kakao.com/oauth/token';
  const headers: AxiosRequestConfig['headers'] = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  };
  const requestBody = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY!,
    redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!,
    code: authCode,
  });

  try {
    const response = await client.post(url, requestBody.toString(), { headers });
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
    const response = await client.post<ResponseType>(url, requestBody, { headers });
    console.log('Access token sent to the server successfully.');
    return response.data;
  } catch (error) {
    console.error('Failed to send access token to the server:', error);
    throw new Error('Failed to send access token to the server');
  }
}

export async function getUserFromKakao(accessToken: string): Promise<any> {
  const url = 'https://kapi.kakao.com/v2/user/me';
  const headers: AxiosRequestConfig['headers'] = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  };

  try {
    const response = await client.get(url, { headers });
    console.log('User information retrieved from Kakao successfully.');
    return response.data;
  } catch (error) {
    console.error('Failed to retrieve user information from Kakao:', error);
    throw new Error('Failed to retrieve user information from Kakao');
  }
}