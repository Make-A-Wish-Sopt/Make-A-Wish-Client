'use client';

import { PropsWithChildren, Suspense, useEffect } from 'react';
import { ModalContextProvider } from '@/Context/modalContext';
import Loading from '@/app/loading';
import { Toaster } from 'sonner';

interface MainLayoutProps extends PropsWithChildren {
  Header?: JSX.Element;
  Footer?: JSX.Element;
}

export default function MainLayout({ Header = null, Footer = null, children }: MainLayoutProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
    }
  }, []);

  return (
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
  );
}
