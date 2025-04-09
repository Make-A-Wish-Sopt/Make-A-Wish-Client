'use client';

import { Step, StepProps } from '@/components/Modules/Funnel';
import { ReactElement, useState } from 'react';

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

// useFunnel.ts
const useFunnel = <T extends FunnelStepsType>(steps: T) => {
  const [stepIdx, setStepIdx] = useState(0);
  const [subIdx, setSubIdx] = useState<null | number>(null);
  const [history, setHistory] = useState<Array<number | [number, number]>>([]);

  const addHistory = (index: number | [number, number]) => {
    setHistory((prev) => [...prev, index]);
  };

  const findStepIndex = (target: ExtractStepNames<T>): [number, number?] | null => {
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      if (typeof step === 'string') {
        if (step === target) return [i];
      } else {
        const subIdx = step.indexOf(target as string);
        if (subIdx !== -1) return [i, subIdx];
      }
    }
    return null;
  };

  const onMoveStep = (target: ExtractStepNames<T>) => {
    const found = findStepIndex(target);
    if (!found) return;

    const [mainIdx, subIdx] = found;
    if (subIdx === undefined) {
      addHistory(stepIdx);
    } else {
      addHistory([stepIdx, subIdx]);
    }

    setStepIdx(mainIdx);
    setSubIdx(subIdx ?? null);
  };

  const nextStep = (target?: ExtractStepNames<T>) => {
    if (target) return onMoveStep(target);
    const nextIdx = stepIdx + 1;
    if (nextIdx >= steps.length) return;
    addHistory(stepIdx);
    setStepIdx(nextIdx);
    setSubIdx(null);
  };

  const prevStep = () => {
    const temp = [...history];
    if (temp.length === 0) return;

    const last = temp.pop();

    setHistory(temp);

    if (typeof last === 'number') {
      setStepIdx(last);
      setSubIdx(null);
    } else {
      const [mainIdx, sub] = last;
      setStepIdx(mainIdx);
      setSubIdx(sub);
    }
  };

  const currentStep = (): ExtractStepNames<T> => {
    const step = steps[stepIdx];
    return typeof step === 'string'
      ? (step as ExtractStepNames<T>)
      : (step[subIdx ?? 0] as ExtractStepNames<T>);
  };

  return {
    currentStep,
    nextStep,
    prevStep,
    onMoveStep,
    isEmptyHistory: () => history.length === 0,
    isFirstStep: () => history.length === 0 || stepIdx === 0,
  };
};

export default useFunnel;
