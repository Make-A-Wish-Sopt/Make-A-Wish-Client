'use client';

import { postAuthKakao } from '@/api/auth';
import Loading from '@/app/loading';
import { useAuthKakao } from '@/hooks/queries/auth';
import { LoginUserInfo } from '@/recoil/auth/loginUserInfo';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useSetRecoilState } from 'recoil';

export default function Kakao() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const router = useRouter();

  if (!code) {
    alert('code error');
    router.back();
    return;
  }

  const setLoginUserInfo = useSetRecoilState(LoginUserInfo);

  const { mutate: kakaoLoginMutate } = useMutation((code: string) => postAuthKakao(code), {
    onSuccess: (data) => {
      const { accessToken, nickName, refreshToken } = data;
      setLoginUserInfo((prev) => ({
        ...prev,
        nickName: nickName,
        accessToken: accessToken,
        refreshToken: refreshToken,
      }));

      localStorage.setItem('accessToken', accessToken);
      router.push('/wishes');
    },
    onError: (error) => {
      alert('카카오 로그인에 실패하셨습니다. : ' + error);
      router.back();
    },
  });

  useEffect(() => {
    if (code) {
      kakaoLoginMutate(code);
    }
  }, []);

  return <Loading></Loading>;
}
