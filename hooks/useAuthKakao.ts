import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { TokenResponse, UserInfo, ResponseType } from '@/types/kakaoLoginType';
import { getTokenFromKakao, sendTokenToServer, getUserFromKakao } from '@/api/kakaoLogin/login';

export function useAuthKaKao() {
  const [nickname, setNickname] = useState<string>('');
  const [accessToken, setAccessToken] = useState<string>('');

  const router = useRouter();
  const { code: authCode, error: kakaoServerError } = router.query;
  // console.log("authCode : " + authCode);

  const loginHandler = useCallback(
    async (code: string) => {
      try {
        // 1. 인가 코드를 사용해서 엑세스 토큰 가져오기
        const tokenResponse = await getTokenFromKakao(code);
        const { access_token: access_token } = tokenResponse;
        console.log("token from Kakao : " + access_token);

        // 2. 엑세스 토큰을 서버로 보냄
        const apiResponse = await sendTokenToServer(access_token);

        const accessToken = apiResponse.data.accessToken
        console.log("token from Service server : " + accessToken);
        setAccessToken(accessToken);

        if (apiResponse.success) {
          router.push('/mainPage');
          console.log('로그인 성공_토큰 : ' + apiResponse.data.accessToken);
          localStorage.setItem('accessToken', apiResponse.data.accessToken);

          // 3. 사용자 정보 받아오기
          const userInfo = await getUserFromKakao(access_token);
          console.log(userInfo);

          const { properties } = userInfo;
          const nickname = properties.nickname;

          setNickname(nickname);
        } else {
          // router.replace('/');
          router.push('/mainPage');
          console.log('로그인 실패2 : ' + apiResponse.message);
        }
      } catch (error: any) {
        // router.replace('/');
        router.push('/mainPage');
        console.log('로그인 실패3 : ' + error.message);
      }
    },
    [router],
  );

  useEffect(() => {
    if (authCode) {
      loginHandler(authCode as string);
    } else if (kakaoServerError) {
      // router.push('/');
      router.push('/mainPage');
      console.log('로그인 실패4 : ' + kakaoServerError);
    }
  }, [loginHandler, authCode, kakaoServerError, router]);

  return { accessToken, nickname };
}