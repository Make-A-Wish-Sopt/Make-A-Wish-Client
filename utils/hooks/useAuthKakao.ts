import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { TokenResponse, UserInfo, ResponseType } from '@/types/kakaoLoginType';
import { getTokenFromKakao, sendTokenToServer, getUserFromKakao } from '@/api/kakaoLogin/login';

export function useAuthKaKao() {
  const [kakaoId, setKakaoId] = useState<number>(0);
  const [nickname, setNickname] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string | undefined>('');
  const [email, setEmail] = useState<string | undefined>('');

  const router = useRouter();
  const { code: authCode, error: kakaoServerError } = router.query;
  console.log("authCode : " + authCode);

  const loginHandler = useCallback(
    async (code: string) => {
      // 1. 인가 코드를 받고 인가 코드를 사용해서 엑세스 토큰을 가져옴
      const tokenResponse: TokenResponse = await getTokenFromKakao(code as string);
      console.log("TokenResponse : " + tokenResponse);

      if (!tokenResponse.access_token) {
        router.replace('/'); //push
        console.log("로그인 실패 : 액세스 토큰을 가져올 수 없습니다.");
        return;
      }

      // 2. 엑세스 토큰을 서버로 보냄
      const apiResponse: ResponseType = await sendTokenToServer(tokenResponse.access_token);

      if (apiResponse.success) {
        router.replace('/mainPage');
        console.log("로그인 성공 : " + apiResponse.data);

        // 3. 사용자 정보 받아오기
        const userInfo = await getUserFromKakao(tokenResponse.access_token);
        const {
          id: kakaoId,
          properties: { nickname, profile_image, email },
        } = userInfo;

        setKakaoId(kakaoId);
        setNickname(nickname);
        setProfileImage(profile_image);
        setEmail(email);
      } else {
        router.replace('/loginPage');
        console.log("로그인 실패 : " + apiResponse.message);
      }
    },
    [router]
  );

  useEffect(() => {
    if (authCode) {
      loginHandler(authCode as string);
    } else if (kakaoServerError) {
      router.replace('/loginPage');
      console.log("로그인 실패 : " + kakaoServerError);
    }
  }, [loginHandler, authCode, kakaoServerError, router]);

  return { kakaoId, nickname, profileImage, email };
}