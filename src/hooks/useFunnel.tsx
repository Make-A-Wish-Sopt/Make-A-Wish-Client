'use client';

import { useEffect, useState } from 'react';

export type FunnelStepsType = readonly (string | readonly string[])[];

export interface FunnelProps {
  children: React.ReactElement[];
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
  const [stepHistory, setStepHistory] = useState<Array<number | [number, number]>>([]);
  const [prevDisabled, setPrevDisabled] = useState(false);

  useEffect(() => {
    if (stepHistory.length === 0 || stepIdx === 0) {
      setPrevDisabled(true);
    } else {
      setPrevDisabled(false);
    }
  }, [stepHistory]);

  const addHistory = (index: number | [number, number]) => {
    setStepHistory((prev) => [...prev, index]);
  };

  const findStepIndex = (target: ExtractStepNames<T>): [number, number?] | null => {
    for (let i = 0; i < steps.length; i += 1) {
      const step = steps[i];
      if (typeof step === 'string') {
        if (step === target) return [i];
      } else {
        const subIndex = step.indexOf(target as string);
        if (subIndex !== -1) return [i, subIndex];
      }
    }
    return null;
  };

  const onMoveStep = (target: ExtractStepNames<T>) => {
    const foundStep = findStepIndex(target);

    if (!foundStep) return;

    const [targetMainIdx, targetSubIndex] = [...foundStep];

    if (subIdx === null) {
      addHistory(stepIdx);
    } else {
      addHistory([stepIdx, subIdx]);
    }

    setStepIdx(targetMainIdx);
    setSubIdx(targetSubIndex ?? null);
  };

  const nextStep = (target?: ExtractStepNames<T>) => {
    if (target) {
      onMoveStep(target);
      return;
    }

    const nextIdx = stepIdx + 1;
    if (nextIdx >= steps.length) return;

    addHistory(stepIdx);
    setStepIdx(nextIdx);
    setSubIdx(null);
  };

  const prevStep = () => {
    const temp = [...stepHistory];
    if (temp.length === 0) return;

    const last = temp.pop();

    if (typeof last === 'number') {
      setStepIdx(last);
      setSubIdx(null);
    } else {
      const [mainIdx, subIndex] = last;
      setStepIdx(mainIdx);
      setSubIdx(subIndex);
    }

    setStepHistory(temp);
  };

  const currentStep = (): ExtractStepNames<T> => {
    const step = steps[stepIdx];
    if (!step) throw new Error('Invalid step index');

    return typeof step === 'string'
      ? (step as ExtractStepNames<T>)
      : (step[subIdx ?? 0] as ExtractStepNames<T>);
  };

  return {
    currentStep,
    nextStep,
    prevStep,
    onMoveStep,
    prevDisabled,
  };
};

export default useFunnel;
