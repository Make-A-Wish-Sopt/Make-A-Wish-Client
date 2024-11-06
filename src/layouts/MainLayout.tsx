import { getLoginUserCookiesData } from '@/utils/common/cookies';
import { PropsWithChildren } from 'react';

export default async function MainLayout({ children }: PropsWithChildren) {
  const loginUserCookiesData = await getLoginUserCookiesData();

  if (!loginUserCookiesData) {
    //  로그인페이지로 이동
  }

  return (
    <main className="flex justify-center">
      <div className="w-full h-full px-22 min-w-375 max-w-500">{children}</div>
    </main>
  );
}
