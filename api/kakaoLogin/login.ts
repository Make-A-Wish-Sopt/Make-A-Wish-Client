import { client } from '@/api/common/axios';
import { TokenResponse, UserInfo, ResponseType } from '@/types/kakaoLoginType';

export async function getTokenFromKakao(authCode: string) {
  const tokenUrl = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&code=${authCode}`;
  const response: TokenResponse = await client.post(tokenUrl, null, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response;
}

export async function sendTokenToServer(accessToken: string) {
  const apiEndpoint = '/api/v1/auth';
  const response: ResponseType = await client.post(apiEndpoint, { access_token: accessToken }, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response;
}

export async function getUserFromKakao(access_token: string) {
  const userInfoUrl = 'https://www.sunmulzu.shop/api/v1/user';
  const response: UserInfo = await client.get(userInfoUrl, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response;
}