import { useEffect, useState } from 'react';

type StepType = string | { [key: string]: string[] };
type StepsType = StepType[];

export default function useFormSteps(stepArr: StepsType) {
  const [step, setStep] = useState<LinkedStepNode | null>(null);

  useEffect(() => {
    setStep(createLinkedStep(stepArr));
  }, []);

  function getStepArr() {
    return stepArr;
  }

  function currentStep() {
    if (!step) return;

    return step.value;
  }

  function onNextStep() {
    if (!step || !step.next) return;

    if (typeof step.next.value === 'string') {
      setStep(step.next);
    }
  }

  function onNextSteps<T extends Record<string, string[]>>(
    stepKey: keyof T,
    stepValue: T[keyof T][number],
  ) {
    if (!step || !step.prev) return;

    if (typeof step.next.value === 'string') {
      return;
    }

    const nextStepsKey = Object.keys(step.next.value)[0];
    const nextSteps = step.next.value[nextStepsKey];

    if (stepKey === nextStepsKey && nextSteps.includes(stepValue)) {
      setStep({
        ...step.next,
        value: nextStepsKey,
      });
    } else {
      console.log('Next StepKey is ', nextStepsKey);
      console.log('Next Steps are ', nextSteps);
      console.log('Please Select Collect Next Step Key&Value');
    }
  }

  function onPrevStep() {
    if (!step || !step.prev) return;

    if (typeof step.prev.value === 'string') {
      setStep(step.prev);
    }
  }

  function onPrevSteps<T extends Record<string, string[]>>(
    stepKey: keyof T,
    stepValue: T[keyof T][number],
  ) {
    if (!step || !step.prev) return;

    if (typeof step.prev.value === 'string') {
      return;
    }
    const prevStepsKey = Object.keys(step.prev.value)[0];
    const prevSteps = step.prev.value[prevStepsKey];

    if (stepKey === prevStepsKey && prevSteps.includes(stepValue)) {
      setStep({
        ...step.prev,
        value: prevStepsKey,
      });
    } else {
      console.log('Prev StepKey is ', prevStepsKey);
      console.log('Prev Steps are ', prevSteps);
      console.log('Please Select Collect Prev Step Key&Value');
    }
  }

  return {
    currentStep,
    onNextStep,
    onPrevStep,
    onNextSteps,
    onPrevSteps,
    getStepArr,
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
