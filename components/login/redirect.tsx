import { useRouter } from 'next/router';
import useAuthKakao from '@/hooks/queries/login/useAuthKakao';
import { useEffect } from 'react';
import Loading from '../common/loading';

export default function Redirect() {
  const router = useRouter();

  const { accessToken, refreshToken, nickName } = useAuthKakao();

  useEffect(() => {
    if (accessToken && refreshToken && nickName) {
      router.push('/main');
    }
  }, [accessToken, refreshToken, nickName]);

  return (
    <Loading />
  );
}