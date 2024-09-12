import Loading from '@/components/Common/Loading/Loading';
import Layout from '@/components/Layout';
import { useAuthKakao } from '@/hooks/queries/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Kakao() {
  const { accessToken, refreshToken, nickName } = useAuthKakao();
  const router = useRouter();

  useEffect(() => {
    if (accessToken && refreshToken && nickName) {
      router.push('/main');
    }
  }, [accessToken, refreshToken, nickName]);

  return <Layout layoutKey="empty">{<Loading />}</Layout>;
}
