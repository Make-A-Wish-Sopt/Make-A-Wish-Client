'use client';

import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

interface StepInputContextType {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  nextBtnDisabled: boolean;
  prevBtnDisabled: boolean;
  changeNextBtnDisabledState: (state: boolean) => void;
  changePrevBtnDisabledState: (state: boolean) => void;
}

export const StepInputContext = createContext<StepInputContextType>({
  step: 1,
  nextStep: () => {},
  prevStep: () => {},
  nextBtnDisabled: true,
  prevBtnDisabled: true,
  changeNextBtnDisabledState: () => {},
  changePrevBtnDisabledState: () => {},
});

export default function StepInputProvider({ children }: PropsWithChildren) {
  const [step, setStep] = useState(2);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);

  useEffect(() => {
    if (step === 1) {
      setPrevBtnDisabled(true);
    } else {
      setPrevBtnDisabled(false);
    }
  }, [step]);

  function nextStep() {
    setStep(step + 1);
  }

  function prevStep() {
    if (step > 0) {
      setStep(step - 1);
    }
  }

  function changeNextBtnDisabledState(state: boolean) {
    setNextBtnDisabled(state);
  }

  function changePrevBtnDisabledState(state: boolean) {
    setPrevBtnDisabled(state);
  }

  return (
    <StepInputContext.Provider
      value={{
        step,
        nextStep,
        prevStep,
        nextBtnDisabled,
        prevBtnDisabled,
        changeNextBtnDisabledState,
        changePrevBtnDisabledState,
      }}
    >
      {children}
    </StepInputContext.Provider>
  );
}

export function useStepInputContext() {
  const context = useContext(StepInputContext);
  if (context === null) {
    throw new Error('useStepInputContext must be used within StepProvider');
  }
  return context;
}
