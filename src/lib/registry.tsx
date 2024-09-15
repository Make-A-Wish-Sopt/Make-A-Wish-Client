'use client';

import React, { Suspense } from 'react';
import Loading from '@/app/loading';
import { QueryClient, QueryClientProvider } from 'react-query';
import AuthProvider from '@/context/authContext';

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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </AuthProvider>
    </QueryClientProvider>
  );
}
