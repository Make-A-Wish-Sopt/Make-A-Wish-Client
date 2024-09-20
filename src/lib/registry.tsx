'use client';

import React, { Suspense } from 'react';
import Loading from '@/app/loading';
import { QueryClient, QueryClientProvider } from 'react-query';
import AuthProvider from '@/context/authContext';
import StepInputProvider from '@/context/stepInputContext';

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
      <StepInputProvider>
        <AuthProvider>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </AuthProvider>
      </StepInputProvider>
    </QueryClientProvider>
  );
}
