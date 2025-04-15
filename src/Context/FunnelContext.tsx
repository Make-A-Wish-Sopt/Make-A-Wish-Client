'use client';

import Button, { ButtonProps } from '@/components/Elements/Button';
import { Funnel } from '@/components/Modules/Funnel';
import useFunnel, { ExtractStepNames, FunnelStepsType } from '@/hooks/useFunnel';
import {
  createContext,
  Dispatch,
  memo,
  MemoExoticComponent,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

interface FunnelContextProps<T extends FunnelStepsType> {
  currentStep: () => ExtractStepNames<T>;
  nextStep: (target?: ExtractStepNames<T>) => void;
  prevStep: () => void;
  onMoveStep: (target: ExtractStepNames<T>) => void;
  isEmptyHistory: () => boolean;
  isFirstStep: () => boolean;
  PrevButton: MemoExoticComponent<(props: ButtonProps) => JSX.Element>;
  setSharedData: Dispatch<SetStateAction<{} | Record<ExtractStepNames<T>, unknown>>>;
  getSharedData: (
    key: ExtractStepNames<T>,
  ) => Partial<Record<ExtractStepNames<T>, unknown>>[ExtractStepNames<T>];
}

type SharedDataMap<T extends FunnelStepsType> = Partial<Record<ExtractStepNames<T>, unknown>>;

const FunnelContext = createContext<FunnelContextProps<any> | null>(null);

export const useFunnelContext = <T extends FunnelStepsType>() => {
  const context = useContext(FunnelContext);
  if (!context) {
    throw new Error('useFunnelContext must be used within a FunnelProvider');
  }
  return context as FunnelContextProps<T>;
};

const PrevButtonBase = memo(({ bgColor = 'gray4', fontColor = 'white', ...rest }: ButtonProps) => {
  const { prevStep, isFirstStep } = useFunnelContext();

  return (
    <Button
      bgColor={bgColor}
      fontColor={fontColor}
      onClick={rest.onClick ?? prevStep}
      disabled={isFirstStep()}
      {...rest}
    >
      이전
    </Button>
  );
});

export function FunnelProvider<T extends FunnelStepsType>({
  steps,
  children,
}: PropsWithChildren<{ steps: T }>) {
  const funnel = useFunnel(steps);

  const [sharedData, setSharedData] = useState<SharedDataMap<T>>({});

  const isSharedDataEmpty = () => {
    return Object.keys(sharedData).length === 0;
  };

  const getSharedData = (key: ExtractStepNames<T>) => {
    if (isSharedDataEmpty()) return null;

    return sharedData[key];
  };

  const contextValue = useMemo<FunnelContextProps<T>>(
    () => ({
      ...funnel,
      PrevButton: PrevButtonBase,
      setSharedData,
      getSharedData,
    }),
    [sharedData],
  );

  return (
    <FunnelContext.Provider value={contextValue}>
      <Funnel current={funnel.currentStep()}>{children}</Funnel>
    </FunnelContext.Provider>
  );
}
