'use client';

import { postAuthKakao } from '@/api/auth';
import Loading from '@/app/loading';
import { useAuthContext } from '@/context/authContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useMutation } from 'react-query';

export default function Kakao() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const router = useRouter();

  const { onLogin } = useAuthContext();

  if (!code) {
    alert('code error');
    router.back();
    return;
  }

  const { mutate: kakaoLoginMutate } = useMutation((code: string) => postAuthKakao(code), {
    onSuccess: (data) => {
      const { accessToken, nickName } = data;
      onLogin({
        accessToken: accessToken,
        nickName: nickName,
        wishId: '',
      });

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

  return <Loading />;
}
