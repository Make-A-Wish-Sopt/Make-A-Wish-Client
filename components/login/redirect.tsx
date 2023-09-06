import { useRouter } from 'next/router';
import useAuthKakao from '@/hooks/queries/login/useAuthKakao';
import { useEffect } from 'react';

export default function Redirect() {
  const router = useRouter();

  const { accessToken, refreshToken, nickName } = useAuthKakao();

  useEffect(() => {
    if (accessToken && refreshToken && nickName) {
      router.push('/main');
    }
  }, [accessToken, refreshToken, nickName]);

  return (
    <>
      <div> 카카오 로그인 중 입니다...</div>
    </>
  );
}
