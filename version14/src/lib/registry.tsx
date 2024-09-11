'use client';

import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import theme from '@/styles/theme';
import Loading from '@/app/loading';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function GlobalRegistry({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loading />}>
          {/* <GlobalStyle /> */}
          {children}
        </Suspense>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
