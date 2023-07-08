import { useRouter } from 'next/router';
import { useAuthKakao } from '@/hooks/useAuthKakao';
import { useEffect } from 'react';

export default function Kakao() {
  const router = useRouter();

  const { accessToken, refreshToken } = useAuthKakao();

  useEffect(() => {
    if (accessToken && refreshToken) {
      router.push('/main');
    }
  }, [accessToken, refreshToken]);

  return (
    <>
      <div> 카카오 로그인 중 입니다...</div>
    </>
  );
}
