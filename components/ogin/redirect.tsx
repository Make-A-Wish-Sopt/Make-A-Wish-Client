import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Loading from '../ommon/loading';
import { useAuthKakao } from '@/hooks/queries/auth';

export default function Redirect() {
  const router = useRouter();

  const { accessToken, refreshToken, nickName } = useAuthKakao();

  useEffect(() => {
    if (accessToken && refreshToken && nickName) {
      router.push('/main');
    }
  }, [accessToken, refreshToken, nickName]);

  return <Loading />;
}
