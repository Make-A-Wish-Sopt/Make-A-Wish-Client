import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { sendCodeToServer } from '@/api/kakaoLogin/sendCodeToServer';
import { useMutation } from 'react-query';


export function useAuthKakao() {
  const [accessToken, setAccessToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');

  const router = useRouter();
  const { code: authCode } = router.query;

  const { mutate: kakaoLoginMutate } = useMutation(() =>
    sendCodeToServer(authCode as string),
    {
      onSuccess: (data) => {
        const { accessToken, refreshToken } = data
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        console.log(`accessToken: ${accessToken}, refreshToken: ${refreshToken}`);
      },
      onError: (error) => {
        console.log('kakaoLogin Error : ' + error);
      },
    }
  )

  useEffect(() => {
    if (authCode) {
      kakaoLoginMutate();
    }
  }, [authCode, kakaoLoginMutate]);

  return { accessToken, refreshToken };
}
