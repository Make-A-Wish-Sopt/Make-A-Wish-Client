import ErrorPage from '@/app/error';
import { isLoggedIn } from '@/utils/common/auth';
import { PropsWithChildren } from 'react';

export default async function MainLayout({
  Header,
  isPrivate = false,
  children,
}: { Header?: JSX.Element; isPrivate?: boolean } & PropsWithChildren) {
  // 로그인 필요한 페이지에서 비로그인 상태 체크
  if (isPrivate) {
    const isUserLoggedIn = await isLoggedIn();
    if (!isUserLoggedIn) {
      return (
        <ErrorPage alertMessage="로그인이 필요해요!" routePath="/" btnMessage="로그인 하러가기" />
      );
    }
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
