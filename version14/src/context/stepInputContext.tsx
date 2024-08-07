'use client';

import { createContext, PropsWithChildren, useContext, useState } from 'react';

interface StepInputContextType {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
}

export const StepInputContext = createContext<StepInputContextType>({
  step: 1,
  nextStep: () => {},
  prevStep: () => {},
});

export default function StepInputProvider({ children }: PropsWithChildren) {
  const [step, setStep] = useState(1);

  function nextStep() {
    setStep(step + 1);
  }

  function prevStep() {
    if (step > 0) {
      setStep(step - 1);
    }
  }

  return (
    <StepInputContext.Provider value={{ step, nextStep, prevStep }}>
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
