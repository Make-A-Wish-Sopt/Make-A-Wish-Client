import { PropsWithChildren, ReactElement, ReactNode, useState } from 'react';
import { RoutePathType, useRouters } from './useRouters';
import { usePathname } from 'next/navigation';

export default function useFormSteps<T extends (string | { [key: string]: string })[]>(stepArr: T) {
  interface StepProps {
    name: string;
    children: ReactNode;
  }

  interface FunnelProps {
    children: Array<ReactElement<StepProps>>;
  }

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

  function handleSameLevelNext<T>(key: keyof T, query?: string) {
    if (isStepLast()) return;
    if (isNextStepIsSingleStep()) return;

    const test = stepArr[step + 1] as T;
    const path = `${pathname}?step=${test[key]}${query ? `&${query}` : ''}` as RoutePathType;
    handleRouter(path);

    stepUp();
  }

  function handleSameLevelPrev<T>(key: keyof T, query?: string) {
    if (isStepFirst()) return;
    if (isNextStepIsSingleStep()) return;

    const test = stepArr[step - 1] as T;
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

  const Step = (props: StepProps): ReactElement => {
    return <>{props.children}</>;
  };

  const Funnel = ({ children }: FunnelProps) => {
    const targetStep = children.find((childStep) => childStep.props.name === stepArr[step]);

    return <>{targetStep}</>;
  };

  return {
    handleNextStepRouter,
    handlePrevStepRouter,
    currentStep,
    handleSameLevelNext,
    handleSameLevelPrev,
    Funnel,
    Step,
  };
}
