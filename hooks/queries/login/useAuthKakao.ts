import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { sendCodeToServer } from '@/api/login/sendCodeToServer';
import { useMutation } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { LoginUserInfo } from '@/recoil/auth/loginUserInfo';

export default function useAuthKakao() {
  const [accessToken, setAccessToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');
  const [nickName, setNickname] = useState<string>('');

  const setLoginUserInfo = useSetRecoilState(LoginUserInfo);

  const router = useRouter();
  const { code: authCode } = router.query;
  console.log(authCode);

  const { mutate: kakaoLoginMutate } = useMutation(() => sendCodeToServer(authCode as string), {
    onSuccess: (data) => {
      const { nickName, accessToken, refreshToken } = data;

      setLoginUserInfo((prev) => ({
        ...prev,
        nickName: nickName,
        accessToken: accessToken,
        refreshToken: refreshToken,
      }));

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setNickname(nickName);

      localStorage.setItem('accessToken', accessToken);
    },
    onError: (error) => {
      alert('카카오 로그인에 실패하셨습니다. : ' + error);
      router.back();
    },
  });

  useEffect(() => {
    if (authCode) {
      kakaoLoginMutate();
    }
  }, [authCode, kakaoLoginMutate]);

  return { accessToken, refreshToken, nickName };
}
