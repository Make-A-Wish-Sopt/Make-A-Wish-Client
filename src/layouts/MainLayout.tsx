import ErrorPage from '@/app/error';
import { isLoggedIn } from '@/utils/common/auth';
import { PropsWithChildren } from 'react';

export default async function MainLayout({
  Header,
  isPrivate = false,
  children,
}: { Header?: JSX.Element; isPrivate?: boolean } & PropsWithChildren) {
  const isUserLoggedIn = await isLoggedIn();

  // 로그인 필요한 페이지에서 비로그인 상태 체크
  if (isPrivate && !isUserLoggedIn) {
    return <ErrorPage alertMessage="로그인이 필요합니다!" routePath="/" />;
  }

  return (
    <>
      {Header}
      <main className="relative flex justify-center">
        <div className="w-375 h-svh px-22">{children}</div>
      </main>
    </>
  );
}
