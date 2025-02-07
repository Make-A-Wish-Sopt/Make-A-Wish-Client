import { usePathname } from 'next/navigation';
import { ReactElement, ReactNode, useState } from 'react';
import { RoutePathType, useRouters } from './useRouters';

type TestStepType = string;
type TestStepsType = { [key: string]: string[] };

export type StepType = TestStepType | TestStepsType;
export type StepsType = [string, ...StepType[]];

interface StepProps<K extends TestStepType> {
  name: K;
  children: ReactNode;
}

interface StepsProps<K extends TestStepsType> {
  name: keyof K;
  children: Array<ReactElement<StepProps<K[keyof K][number]>>>;
}

interface FunnelProps<T extends StepsType> {
  children: Array<
    ReactElement<
      StepProps<Extract<T[number], TestStepType>> | StepsProps<Extract<T[number], TestStepsType>>
    >
  >;
}

export default function useFormSteps<T extends StepsType>(stepArr: T) {
  const [stepIdx, setStepIdx] = useState(0);
  const [subMenu, setSubMenu] = useState('');

  const stepUp = () => setStepIdx(stepIdx + 1);
  const stepDown = () => setStepIdx(stepIdx - 1);
  const isNextSingleType = () => typeof stepArr[stepIdx + 1] === 'string';
  const isPrevSingleType = () => typeof stepArr[stepIdx - 1] === 'string';
  const isStepLast = () => stepIdx === stepArr.length - 1;
  const isStepFirst = () => stepIdx === 0;

  const currentStep = () => {
    return typeof stepArr[stepIdx] === 'string'
      ? (`${stepArr[stepIdx]}-${stepIdx}` as string)
      : subMenu;
  };

  const onMoveStep = (targetIdx: number, subMenuIdx?: string) => {
    if (targetIdx >= stepArr.length || targetIdx < 0 || +subMenuIdx < 0) return;

    if (subMenuIdx) {
      const subMenues = Object.values(stepArr[targetIdx])[0];

      if (+subMenuIdx < subMenues.length) {
        setStepIdx(targetIdx);
        setSubMenu(`${subMenues[+subMenuIdx]}-${targetIdx}-${subMenuIdx}`);
      }
      return;
    }

    if (stepIdx === targetIdx) return;

    setStepIdx(targetIdx);
  };

  const onNextStep = () => {
    if (isStepLast() || !isNextSingleType()) return;
    stepUp();
  };

  const onPrevStep = () => {
    if (isStepFirst() || !isPrevSingleType()) return;
    stepDown();
  };

  const onNextSteps = <T extends Record<string, string[]>>(
    stepKey: keyof T,
    stepValue: T[keyof T][number],
  ) => {
    if (isStepLast() || isNextSingleType()) return;

    const nextStepsKey = Object.keys(stepArr[stepIdx + 1])[0];
    const nextSteps = Object.values(stepArr[stepIdx + 1])[0];

    if (stepKey === nextStepsKey && nextSteps.includes(stepValue)) {
      stepUp();
    }
  };

  const onPrevSteps = <T extends Record<string, string[]>>(
    stepKey: keyof T,
    stepValue: T[keyof T][number],
  ) => {
    if (isStepFirst() || isPrevSingleType()) return;

    const prevStepsKey = Object.keys(stepArr[stepIdx - 1])[0];
    const prevSteps = Object.values(stepArr[stepIdx - 1])[0];

    if (stepKey === prevStepsKey && prevSteps.includes(stepValue)) {
      stepDown();
    }
  };

  const Step = <K extends Extract<T[number], string>>(props: StepProps<K>): ReactElement => {
    return <>{props.children}</>;
  };

  const Funnel = <T extends StepsType>({ children }: FunnelProps<T>) => {
    const targetStep = children.find((childStep) => childStep.props.name === stepArr[stepIdx]);

    return <>{targetStep}</>;
  };

  return {
    currentStep,
    onNextStep,
    onPrevStep,
    onNextSteps,
    onPrevSteps,
    Funnel,
    Step,
    onMoveStep,
    // stepDepth,
  };
}

// const stepDepth = stepArr.reduce<Record<string, number>>((acc, step, index) => {
//   if (typeof step === 'string') {
//     acc[step] = index;
//   } else {
//     const key = Object.keys(step)[0];
//     acc[key] = index;
//   }
//   return acc;
// }, {});

// const handleMoveStep = (step: string) => {
//   const stepRouter = `${pathname}?step=${step}` as RoutePathType;
//   handleRouter(stepRouter);
// };
