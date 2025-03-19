'use client';

import ErrorPage from '@/app/error';
import { isLoggedIn } from '@/utils/common/auth';
import { PropsWithChildren } from 'react';
import ModalPortal from './ModalPortal';
import { ModalContextProvider } from '@/Context/modalContext';

interface MainLayoutProps extends PropsWithChildren {
  Header: JSX.Element;
  Footer?: JSX.Element;
  isPrivate?: boolean; // 삭제예정
  modalKeys?: string[];
}

export default function MainLayout({
  Header,
  Footer,
  isPrivate = false,
  modalKeys = [],
  children,
}: MainLayoutProps) {
  //추후 반응형까지 고려한 로직들을 추가 예정

  return (
    <>
      <ModalContextProvider init={modalKeys}>
        {Header}
        <main className="relative flex justify-center">
          <div className="w-375 h-svh px-22">{children}</div>
        </main>
        {Footer}
      </ModalContextProvider>
    </>
  );
}
