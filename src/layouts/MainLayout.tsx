import ErrorPage from '@/app/error';
import { RoutePathType } from '@/hooks/common/useRouters';
import { isLoggedIn } from '@/utils/common/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default async function MainLayout({
  Header,
  isPrivate = false,
  children,
}: { Header?: JSX.Element; isPrivate?: boolean } & PropsWithChildren) {
  if (isPrivate && !(await isLoggedIn())) {
    return <ErrorPage alertMessage="로그인이 필요합니다!" routePath="/" />;
  }

  //이미 로그인이 되어있고 로그인화면으로 진입 시 메인화면으로 리다이렉트

  const headerPathname = headers().get('x-pathname') as RoutePathType;

  if (headerPathname === '/' && (await isLoggedIn())) {
    redirect('/wishes');
  }

  return (
    <>
      {Header}
      <main className="relative flex justify-center">
        <div className="w-375 h-svh px-22 ">{children}</div>
      </main>
    </>
  );
}
