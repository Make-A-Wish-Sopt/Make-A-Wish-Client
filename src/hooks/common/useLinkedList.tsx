import { useEffect, useState } from 'react';

type StepType = string | { [key: string]: string[] };
type StepsType = StepType[];

export default function useFormSteps(stepArr: StepsType) {
  const [step, setStep] = useState<LinkedStepNode | null>(null);

  useEffect(() => {
    setStep(createLinkedStep(stepArr));
  }, []);

  function currentStep() {
    if (!step) return;

    if (step.next) {
      console.log('next : ', step.next.value);
    }

    if (step.prev) {
      console.log('prev : ', step.prev.value);
    }

    console.log('current : ', step.value);

    console.log('========================');

    return step.value;
  }

  function nextTest<T = string>(queryKey: T) {
    if (!step || !step.next) return;

    if (typeof step.next.value === 'string') {
      setStep(step.next);
      return;
    }

    if (queryKey) {
      setStep({
        ...step.next,
        value: Object.keys(step.next.value[0])[0],
      });
    } else {
      console.log('세부적인 스텝을 입력해주세요!');
    }
  }

  function next<T = string>(queryKey?: T) {
    if (!step || !step.next) return;

    if (typeof step.next.value === 'string') {
      setStep(step.next);
      return;
    }

    if (queryKey) {
      setStep({
        ...step.next,
        value: Object.keys(step.next.value[0])[0],
      });
    } else {
      console.log('세부적인 스텝을 입력해주세요!');
    }
  }

  function prev(queryKey?: string) {
    if (!step || !step.prev) return;

    if (typeof step.prev.value === 'string') {
      setStep(step.prev);
      return;
    }

    if (queryKey) {
      setStep({
        ...step.prev,
        value: Object.keys(step.prev.value[0])[0],
      });
    } else {
      console.log('세부적인 스텝을 입력해주세요!');
    }
  }

  // function nextSteps<T extends { [key: string]: string[] }, K extends keyof T>(
  //   stepKey: K,
  //   stepQuery: T[K][number],
  // ) {
  //   if (step && step.next && typeof step.next.value !== 'string') {
  //     if (Object.keys(step.next.value)[0] === stepKey && step.next.depth - step.depth === 1) {
  //       setStep({
  //         ...step.next,
  //         value: stepKey as string,
  //       });
  //     } else {
  //       console.log('Check step align!');
  //     }
  //   }
  // }

  // function prevSteps<T extends { [key: string]: string[] }, K extends keyof T>(
  //   stepKey: K,
  //   stepQuery: T[K][number],
  // ) {
  //   if (step && step.prev && typeof step.prev.value !== 'string') {
  //     if (Object.keys(step.prev.value)[0] === stepKey && step.depth - step.prev.depth === 1) {
  //       setStep({
  //         ...step.prev,
  //         value: stepKey as string,
  //       });
  //     } else {
  //       console.log('Check step align!');
  //     }
  //   }
  // }

  return {
    currentStep,
    next,
    prev,
  };
}

interface LinkedStepNode {
  value: StepType;
  next?: LinkedStepNode;
  prev?: LinkedStepNode;
  depth: number;
}

function createLinkedStep(steps: StepsType): LinkedStepNode | null {
  if (steps.length === 0) return null;

  const head: LinkedStepNode = {
    value: typeof steps[0] === 'string' ? steps[0] : Object.keys(steps[0])[0],
    depth: 0,
  };

  let current: LinkedStepNode = head;

  for (let i = 1; i < steps.length; i++) {
    const newNode: LinkedStepNode = { value: steps[i], depth: i };
    current.next = newNode; // 현재 노드의 다음 노드 설정
    newNode.prev = current; // 새 노드의 이전 노드 설정
    current = newNode; // 현재 노드를 새 노드로 업데이트
  }

  return head;
}
