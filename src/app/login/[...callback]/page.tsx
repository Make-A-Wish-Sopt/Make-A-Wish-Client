'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { postAuthKakao } from '@/api/auth';
import { apiRoute } from '@/configs/apiConfig';
import Loading from '../../loading';
import ErrorPage from '../../error';

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get('code');

  const [status, setStatus] = useState<'loading' | 'error'>('loading');

  useEffect(() => {
    if (!code) {
      setStatus('error');
      return;
    }

    const login = async () => {
      try {
        const loginUserData = await postAuthKakao(code);
        if (!loginUserData) throw new Error('로그인 실패');

        const res = await apiRoute.post('/api/cookies', loginUserData);
        if (!res.data.success) throw new Error('쿠키 저장 실패');

        router.replace('/wishes');
      } catch (error) {
        console.error('카카오 로그인 에러:', error);
        setStatus('error');
      }
    };

    login();
  }, [code, router]);

  return (
    <div className="flex justify-center items-center w-full h-full">
      {status === 'loading' && <Loading />}
      {status === 'error' && (
        <ErrorPage alertMessage={`카카오 로그인 중 문제가 발생했어요.\n다시 시도해 주세요.`} />
      )}
    </div>
  );
};

export default Page;
