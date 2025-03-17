import ErrorPage from '@/app/error';
import { isLoggedIn } from '@/utils/common/auth';
import { PropsWithChildren } from 'react';
import ModalPortal from './ModalPortal';

export default async function MainLayout({
  Header,
  Footer,
  isPrivate = false,
  children,
}: { Header?: JSX.Element; Footer?: JSX.Element; isPrivate?: boolean } & PropsWithChildren) {
  //추후 반응형까지 고려한 로직들을 추가 예정

  return (
    <>
      {Header}
      <main className="relative flex justify-center">
        <div className="w-375 h-svh px-22">{children}</div>
      </main>
      {Footer}
    </>
  );
}
