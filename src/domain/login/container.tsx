'use client';

import Loading from '@/app/loading';
import { useRouters } from '@/hooks/common/useRouters';
import { LoginUserDataType } from '@/utils/common/cookies';
import axios from 'axios';
import { PropsWithChildren, useEffect } from 'react';

export default function LoginPageContainer({ children }: PropsWithChildren) {
  return <>{children}</>;
}

export function LoginWithSavedCookiesDatas({
  loginUserData,
}: {
  loginUserData: LoginUserDataType;
}) {
  const { handleRouter } = useRouters();

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
