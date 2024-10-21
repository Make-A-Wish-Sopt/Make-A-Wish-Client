'use client';

import React, { Suspense } from 'react';
import Loading from '@/app/loading';

export default function RootProvider({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
