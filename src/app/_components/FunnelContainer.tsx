'use client';

import React, { PropsWithChildren } from 'react';
import { FunnelProvider } from '@/Context/FunnelContext';
import { FunnelStepsType } from '@/hooks/useFunnel';

export default function FunnelContainer<T extends FunnelStepsType>({
  steps,
  children,
}: { steps: T } & PropsWithChildren) {
  return <FunnelProvider<T> steps={steps}>{children}</FunnelProvider>;
}
