'use client';

import ErrorPage from '@/app/error';
import Loading from '@/app/loading';
import { apiRoute } from '@/configs/axios.configs';
import { useRouters } from '@/hooks/common/useRouters';
import { DefaultResponseType } from '@/types/api/response';
import { LoginUserDataType } from '@/utils/common/cookies';
import { PropsWithChildren, useEffect } from 'react';

export default function LoginPageContainer({ children }: PropsWithChildren) {
  return <>{children}</>;
}

export function SaveUserDataWithRedirectWishes({
  loginUserData,
}: {
  loginUserData: LoginUserDataType;
}) {
  const { handleRouter } = useRouters();

  useEffect(() => {
    async function fetchAccessToken() {
      try {
        const res = await apiRoute.post('/api/cookies', loginUserData);
        const data = res.data as DefaultResponseType;

        if (data.success) {
          handleRouter('/wishes');
        } else {
          alert('로그인 중 오류가 발생했어요!');
          handleRouter('/');
        }
      } catch (error) {
        return <ErrorPage alertMessage="오류가 발생했어요!" />;
      }
    }
    fetchAccessToken();
  }, []);

  return <Loading />;
}
