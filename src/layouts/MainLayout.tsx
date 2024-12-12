import ErrorPage from '@/app/error';
import { RoutePathType } from '@/hooks/common/useRouters';
import { getLoginUserCookiesData } from '@/utils/common/cookies';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default async function MainLayout({
  checkLoggedIn,
  children,
}: { checkLoggedIn?: boolean } & PropsWithChildren) {
  const loginUserData = await getLoginUserCookiesData();

  if (checkLoggedIn && !loginUserData) {
    return <ErrorPage alertMessage="로그인이 필요합니다!" />;
  }

  const headersList = headers();
  const headerPathname = headersList.get('x-pathname') as RoutePathType;

  if (headerPathname === '/' && loginUserData) {
    redirect('/wishes');
  }

  return (
    <main className="relative flex justify-center">
      {checkLoggedIn && !loginUserData ? (
        <ErrorPage />
      ) : (
        <div className="w-375 h-svh px-22 ">{children}</div>
      )}
    </main>
  );
}
