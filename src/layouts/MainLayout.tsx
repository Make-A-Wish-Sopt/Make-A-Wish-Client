'use client';

import { PropsWithChildren, Suspense } from 'react';
import { ModalContextProvider } from '@/Context/modalContext';
import Loading from '@/app/loading';
import { AuthProvider } from '@/Context/AuthContext';
import { Toaster } from 'sonner';

interface MainLayoutProps extends PropsWithChildren {
  Header?: JSX.Element;
  Footer?: JSX.Element;
}

export default function MainLayout({ Header, Footer, children }: MainLayoutProps) {
  //추후 반응형까지 고려한 로직들을 추가 예정

  return (
    <AuthProvider>
      <ModalContextProvider>
        <>
          {Header}
          <main className="relative flex justify-center">
            <div className="w-375 h-svh px-22 overflow-x-hidden">
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </div>
          </main>
          {Footer}
        </>
        <Toaster />
      </ModalContextProvider>
    </AuthProvider>
  );
}
