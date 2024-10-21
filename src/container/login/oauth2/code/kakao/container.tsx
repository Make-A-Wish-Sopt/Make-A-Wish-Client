'use client';

import Loading from '@/app/loading';
import { LoginUserDataType } from '@/utils/common/cookies';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginContainer({ loginUserData }: { loginUserData?: LoginUserDataType }) {
  const router = useRouter();

  if (!loginUserData) {
    alert('카카오 로그인 에러');
    router.push('/');
    return <Loading />;
  }

  useEffect(() => {
    fetch('http://localhost:8080/api/set-cookies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginUserData),
    }).then(() => {
      router.push('/wishes');
    });
  }, []);

  return <Loading />;
}
