'use client';

import Button, { ButtonProps } from '@/components/Elements/Button';
import { Funnel } from '@/components/Modules/Funnel';
import { ExtractStepNames, FunnelProps, FunnelStepsType } from '@/hooks/useFunnel';
import useFunnel from '@/hooks/useFunnel';
import {
  createContext,
  Dispatch,
  memo,
  MemoExoticComponent,
  PropsWithChildren,
  SetStateAction,
  useContext,
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

export const FunnelProvider = <T extends FunnelStepsType>({
  steps,
  children,
}: PropsWithChildren<{ steps: T }>) => {
  const funnel = useFunnel(steps);

  const [sharedData, setSharedData] = useState<SharedDataMap<T>>({});

  const getSharedData = (key: ExtractStepNames<T>) => {
    if (isSharedDataEmpty()) return;

    return sharedData[key];
  };

  const isSharedDataEmpty = () => {
    return Object.keys(sharedData).length === 0;
  };

  const contextValue: FunnelContextProps<T> = {
    ...funnel,
    PrevButton: PrevButtonBase,
    setSharedData: setSharedData,
    getSharedData: getSharedData,
  };

  return (
    <FunnelContext.Provider value={contextValue}>
      <Funnel current={funnel.currentStep()}>{children}</Funnel>
    </FunnelContext.Provider>
  );
};

export const useFunnelContext = <T extends FunnelStepsType>() => {
  const context = useContext(FunnelContext);
  if (!context) {
    throw new Error('useFunnelContext must be used within a FunnelProvider');
  }
  return context as FunnelContextProps<T>;
};

const PrevButtonBase = memo(({ bgColor = 'gray4', fontColor = 'white', ...rest }: ButtonProps) => {
  const { prevStep, isFirstStep, currentStep } = useFunnelContext();

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
