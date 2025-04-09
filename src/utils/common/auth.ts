import { getLoginUserCookiesData } from './cookies';

export async function isLoggedIn() {
  const loginUserData = await getLoginUserCookiesData();

  return !!loginUserData;
}

export const getKakaoLoginUrl = () => {
  const kakaoClientId = process.env.KAKAO_RESTAPI_KEY;
  const redirectURI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  if (!kakaoClientId) return '';

  return `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoClientId}&redirect_uri=${redirectURI}`;
};
