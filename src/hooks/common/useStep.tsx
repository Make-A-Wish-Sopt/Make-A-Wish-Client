import { PropsWithChildren, useState } from 'react';
import { RoutePathType, useRouters } from './useRouters';
import { usePathname } from 'next/navigation';

export default function useFormSteps<T extends (string | { [key: string]: string })[]>(stepArr: T) {
  const pathname = usePathname();
  const { handleRouter } = useRouters();

  const [step, setStep] = useState(0);

  console.log('Current Step Is : ', step);

  function stepUp() {
    setStep(step + 1);
  }

  function stepDown() {
    setStep(step - 1);
  }

  function isNextStepIsSingleStep() {
    return typeof stepArr[step + 1] === 'string';
  }

  function isPrevStepIsSingleStep() {
    return typeof stepArr[step - 1] === 'string';
  }

  function currentStep() {
    return stepArr[step] as string;
  }

  function isStepLast() {
    if (step === stepArr.length - 1) return true;
    return false;
  }

  function isStepFirst() {
    if (step === 0) return true;
    return false;
  }

  function nextSpecificStep(): { [key: string]: string } {
    if (!isStepLast())
      if (typeof stepArr[step + 1] !== 'string') {
        return stepArr[step + 1] as { [key: string]: string };
      }
  }

  function handleSameLevelNext(key: keyof ReturnType<typeof nextSpecificStep>, query?: string) {
    if (isStepLast()) return;
    if (isNextStepIsSingleStep()) return;

    const test = stepArr[step + 1] as { [key: string]: string };
    const path = `${pathname}?step=${test[key]}${query ? `&${query}` : ''}` as RoutePathType;
    handleRouter(path);
    stepUp();
  }

  function handleSameLevelPrev(key: keyof ReturnType<typeof nextSpecificStep>, query?: string) {
    if (isStepFirst()) return;
    if (isNextStepIsSingleStep()) return;

    const test = stepArr[step - 1] as { [key: string]: string };
    const path = `${pathname}?step=${test[key]}${query ? `&${query}` : ''}` as RoutePathType;
    handleRouter(path);
    stepDown();
  }

  function handleNextStepRouter(query?: string) {
    if (isStepLast()) return;
    if (!isNextStepIsSingleStep()) return;

    const path =
      `${pathname}?step=${stepArr[step + 1]}${query ? `&${query}` : ''}` as RoutePathType;
    handleRouter(path);
    stepUp();
  }

  function handlePrevStepRouter(query?: string) {
    if (isStepFirst()) return;
    if (!isPrevStepIsSingleStep()) return;

    const path =
      `${pathname}?step=${stepArr[step - 1]}${query ? `&${query}` : ''}` as RoutePathType;
    handleRouter(path);
    stepDown();
  }

  function TestTest({ children }: PropsWithChildren) {
    return (
      <>
        <h1 className="text-white text-[16px] font-bitbit">HELLO WORLD</h1>
        {children}
      </>
    );
  }

  return {
    handleNextStepRouter,
    handlePrevStepRouter,
    currentStep,
    TestTest,
    handleSameLevelNext,
    handleSameLevelPrev,
    nextSpecificStep,
  };
}
