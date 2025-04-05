'use client';

import Button, { ButtonProps } from '@/components/Elements/Button';
import { ExtractStepNames, FunnelProps, FunnelStepsType } from '@/hooks/useFunnel';
import useFunnel from '@/hooks/useFunnel';
import { createContext, memo, MemoExoticComponent, PropsWithChildren, useContext } from 'react';

interface FunnelContextProps<T extends FunnelStepsType, K> {
  currentStep: () => ExtractStepNames<T>;
  nextStep: (target?: ExtractStepNames<T>) => void;
  prevStep: () => void;
  onMoveStep: (target: ExtractStepNames<T>) => void;
  isEmptyHistory: () => boolean;
  Funnel: ({ children }: FunnelProps) => JSX.Element;
  inputs: K;
  PrevButton: MemoExoticComponent<({ bgColor, fontColor, ...rest }: ButtonProps) => JSX.Element>;
}

const FunnelContext = createContext<FunnelContextProps<FunnelStepsType, unknown> | null>(null);

export const FunnelProvider = <T extends FunnelStepsType, K>({
  steps,
  inputs,
  children,
}: PropsWithChildren<{ steps: T; inputs: K }>) => {
  const { nextStep, prevStep, onMoveStep, currentStep, isEmptyHistory, Funnel } = useFunnel(steps);

  const PrevButton = memo(({ bgColor = 'gray4', fontColor = 'white', ...rest }: ButtonProps) => {
    const { isEmptyHistory, prevStep } = useFunnelContext();

    return (
      <Button
        bgColor={bgColor}
        fontColor={fontColor}
        onClick={rest.onClick ? rest.onClick : prevStep}
        disabled={isEmptyHistory()}
        {...rest}
      >
        이전
      </Button>
    );
  });

  return (
    <FunnelContext.Provider
      value={{
        nextStep,
        prevStep,
        onMoveStep,
        currentStep,
        isEmptyHistory,
        Funnel,
        inputs,
        PrevButton,
      }}
    >
      {children}
    </FunnelContext.Provider>
  );
};

export const useFunnelContext = <T extends FunnelStepsType, K>() => {
  const context = useContext(FunnelContext) as FunnelContextProps<T, K>;
  if (!context) {
    throw new Error('useFunnelContext must be used within a FunnelProvider');
  }
  return context;
};
