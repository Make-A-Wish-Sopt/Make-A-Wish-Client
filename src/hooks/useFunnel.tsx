'use client';

import { Step, StepProps } from '@/components/Modules/Funnel';
import { Children, PropsWithChildren, ReactElement, ReactNode, useState } from 'react';

export type FunnelStepsType = readonly (string | readonly string[])[];

export interface FunnelProps {
  children: ReactElement<StepProps, typeof Step>[];
}

// 배열을 평탄화하는 제네릭 타입
export type Flatten<T> = T extends readonly (infer U)[] ? U : never;

// 중첩된 배열에서 string을 추출하는 제네릭 타입
export type ExtractStrings<T> = T extends string
  ? T
  : T extends readonly string[]
    ? T[number]
    : never;

// 배열에서 모든 string 값을 추출하는 제네릭 타입
export type ExtractStepNames<T extends readonly (string | readonly string[])[]> = ExtractStrings<
  Flatten<T>
>;

const useFunnel = <T extends FunnelStepsType>(steps: T) => {
  const [stepIdx, setStepIdx] = useState(0);
  const [subIdx, setSubIdx] = useState<null | number>(null);
  const [history, setHistory] = useState<Array<number | number[]>>([]);

  const addHistory = (stepIndex: number | number[]) => {
    const tempHistory = history;
    tempHistory.push(stepIndex);
    setHistory([...tempHistory]);
  };

  const nextStep = (target?: ExtractStepNames<T>) => {
    if (target) {
      onMoveStep(target);
      return;
    }

    if (stepIdx >= steps.length) return;

    if (typeof steps[stepIdx + 1] === 'string') {
      addHistory(stepIdx);
      setStepIdx(stepIdx + 1);
      return;
    }
  };

  const prevStep = () => {
    if (history.length === 0) return;

    const tempHistory = [...history];
    const lastStepIdx = tempHistory.pop();

    if (typeof lastStepIdx === 'number') {
      setStepIdx(lastStepIdx);
      setSubIdx(null);
    } else {
      const [mainIndex, subIndex] = lastStepIdx;
      setStepIdx(mainIndex);
      setSubIdx(subIndex);
    }

    setHistory([...tempHistory]);
  };

  const findStep = (target: ExtractStepNames<T>) => {
    const result = steps
      .map((step, mainIndex) => {
        if (typeof step === 'string') {
          return step === target ? [mainIndex] : null;
        } else {
          const subIndex = step.findIndex((subStep) => subStep === target);
          return subIndex !== -1 ? [mainIndex, subIndex] : null;
        }
      })
      .find((item) => item !== null); // null이 아닌 첫 번째 값 반환

    return result || null; // 값이 없으면 null 반환
  };

  const onMoveStep = (target: ExtractStepNames<T>) => {
    const stepIndex = findStep(target);

    console.log(stepIndex);

    if (stepIndex === null) return;

    const [mainIndex, subIndex] = stepIndex;

    setStepIdx(mainIndex);

    if (subIndex === undefined) {
      setSubIdx(null);
    } else {
      setSubIdx(subIndex);
    }

    if (subIdx === null) {
      addHistory(stepIdx);
    } else {
      addHistory([stepIdx, subIdx]);
    }
  };

  const currentStep = () => {
    if (typeof steps[stepIdx] === 'string') return steps[stepIdx] as ExtractStepNames<T>;
    else {
      return steps[stepIdx][subIdx] as ExtractStepNames<T>;
    }
  };

  const isEmptyHistory = () => {
    return history.length === 0;
  };

  const Funnel = ({ children }: FunnelProps) => {
    const targetStep = Children.toArray(children).find(
      (childStep) => (childStep as ReactElement).key === `.$${currentStep()}`,
    );

    return <>{targetStep}</>;
  };

  return { nextStep, prevStep, onMoveStep, currentStep, isEmptyHistory, Funnel };
};

export default useFunnel;
