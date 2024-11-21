import ErrorPage from '@/app/error';
import { getLoginUserCookiesData } from '@/utils/common/cookies';
import { PropsWithChildren } from 'react';

export default async function MainLayout({
  checkLoggedIn,
  children,
}: { checkLoggedIn?: boolean } & PropsWithChildren) {
  const loginUserCookiesData = await getLoginUserCookiesData();

  if (checkLoggedIn && !loginUserCookiesData) {
    return <ErrorPage alertMessage="로그인이 필요합니다!" />;
  }

  return (
    <main className="relative flex justify-center">
      <div className="w-full h-svh px-22 min-w-375 max-w-500">{children}</div>
    </main>
  );
}
