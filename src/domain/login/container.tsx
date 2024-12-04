'use client';

import Loading from '@/app/loading';
import { useRouters } from '@/hooks/common/useRouters';
import { LoginUserDataType } from '@/utils/common/cookies';
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
    async function fetchAccessToken() {
      const response = await fetch('/api/cookies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginUserData),
      });

      handleRouter('/wishes');
    }

    fetchAccessToken();
  }, []);

  return <Loading />;
}
