'use client';

import Loading from '@/app/loading';
import { useRouters } from '@/hooks/common/useRouters';
import { LoginUserDataType } from '@/utils/common/cookies';
import axios from 'axios';
import { useEffect } from 'react';

export default function LoginContainer({ loginUserData }: { loginUserData?: LoginUserDataType }) {
  const { handleRouter } = useRouters();

  if (!loginUserData) {
    // alert('카카오 로그인 에러');
    handleRouter('/');
    return;
  }

  useEffect(() => {
    axios
      .post('http://localhost:8080/api/set-cookies', JSON.stringify(loginUserData), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        handleRouter('/wishes');
      });

    localStorage.setItem('accessToken', loginUserData.accessToken);
    handleRouter('/wishes');
  }, []);

  return <Loading />;
}
