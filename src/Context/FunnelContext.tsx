'use client';

import useFunnel, { MultiStepType, StepKeysType, StepsType } from '@/hooks/common/useFunnel';
import { createContext, PropsWithChildren, useContext } from 'react';

type FunnelContextType<T extends StepsType> = {
  steps: StepsType;
  currentStep: () => string;
  currentChartStep: () => string;
  onNextStep: <U extends MultiStepType>(target?: Record<keyof U, U[keyof U][number]>) => void;
  onPrevStep: () => void;
  onMoveStep: (target: string | Record<string, string>) => void;
  labels: Record<StepKeysType<T>, string>;
};

const FunnelContext = createContext<FunnelContextType<StepsType> | null>(null);

export function FunnelContextProvider<T extends StepsType>({
  steps,
  labels,
  children,
}: {
  steps: StepsType;
  labels: Record<StepKeysType<T>, string>;
} & PropsWithChildren) {
  const funnelData = useFunnel(steps);

  return (
    <FunnelContext.Provider value={{ ...funnelData, labels }}>{children}</FunnelContext.Provider>
  );
}

export default FunnelContext;

export function useFunnelContext() {
  const context = useContext(FunnelContext);
  if (!context) throw new Error('FunnelContextType must be used within FunnelProvider');
  return context;
}
