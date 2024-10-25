'use client';

import Loading from '@/app/loading';
import { LoginUserDataType } from '@/utils/common/cookies';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginContainer({ loginUserData }: { loginUserData?: LoginUserDataType }) {
  const router = useRouter();

  if (!loginUserData) {
    alert('카카오 로그인 에러');
    router.push('/');
  }

  useEffect(() => {
    axios
      .post('http://localhost:8080/api/set-cookies', JSON.stringify(loginUserData), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        router.push('/wishes');
      });
  }, []);

  return <Loading />;
}
