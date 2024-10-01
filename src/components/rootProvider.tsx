'use client';

import React, { Suspense } from 'react';
import Loading from '@/app/loading';
import StepInputProvider from '@/context/stepInputContext';

export default function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <StepInputProvider>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </StepInputProvider>
  );
}
