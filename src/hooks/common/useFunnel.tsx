import { ReactElement, ReactNode, useState } from 'react';

export default function useFunnel(steps: StepsType) {
  const [stepIdx, setStepIdx] = useState(0);
  const [current, setCurrent] = useState<string | {}>(steps[stepIdx]);
  const [historys, setHistorys] = useState<Array<string | {}>>([]);
  const stepsMap = steps.reduce<Record<string, number>>((acc, step, index) => {
    if (typeof step === 'string') {
      acc[step] = index;
    } else {
      const key = Object.keys(step)[0];
      acc[key] = index;
    }
    return acc;
  }, {});

  const stepUp = () => setStepIdx(stepIdx + 1);
  const isNextSingleType = () => typeof steps[stepIdx + 1] === 'string';
  const isStepLast = () => stepIdx === steps.length - 1;
  const isStepFirst = () => stepIdx === 0;

  const currentStep = () => {
    return typeof current === 'string' ? current : (Object.values(current)[0] as string);
  };

  const currentChartStep = () => {
    if (typeof current === 'string') {
      return `${steps[stepIdx]}-${stepIdx}`;
    } else {
      const currentStep = Object.values(current)[0];
      const currentSubSteps = Object.values(steps[stepIdx])[0];
      const currentStepIdx = currentSubSteps.indexOf(currentStep);

      if (currentStepIdx >= 0) {
        return `${currentStep}-${stepIdx}-${currentStepIdx}`;
      }
    }
  };

  const addHistory = () => {
    const tempHistorys = historys;
    tempHistorys.push(current);
    setHistorys([...tempHistorys]);
  };

  const removeHistory = () => {
    const tempHistorys = historys;
    const lastHistory = tempHistorys.pop();

    if (typeof lastHistory === 'string') {
      setStepIdx(stepsMap[lastHistory]);
    } else {
      const stepKey = Object.keys(lastHistory)[0];
      setStepIdx(stepsMap[stepKey]);
    }

    setCurrent(lastHistory);
    setHistorys([...tempHistorys]);
  };

  const moveToNextStep = () => {
    if (!isNextSingleType()) return;

    addHistory();
    setCurrent(steps[stepIdx + 1]);
    stepUp();
  };

  const moveToNextTargetStep = <T extends MultiStepType>(
    target: Record<keyof T, T[keyof T][number]>,
  ) => {
    if (isNextSingleType()) return;

    const targetKey = Object.keys(target)[0];
    const targetStep = target[targetKey];

    const nextStepKey = Object.keys(steps[stepIdx + 1])[0];
    const nextSubSteps = steps[stepIdx + 1][nextStepKey];

    if (nextStepKey !== targetKey) return;

    if (targetKey === nextStepKey && nextSubSteps && nextSubSteps.includes(targetStep)) {
      addHistory();
      setCurrent({ [targetKey]: targetStep });
      stepUp();
    }
  };

  const onNextStep = <T extends MultiStepType>(target?: Record<keyof T, T[keyof T][number]>) => {
    if (isStepLast()) return;

    if (!target) {
      moveToNextStep();
    } else {
      moveToNextTargetStep<T>(target);
    }
  };

  const onMoveStep = (target: string | Record<string, string>) => {
    if (typeof target === 'string') {
      const targetStepIdx = stepsMap[target];

      setCurrent(steps[targetStepIdx]);
      setStepIdx(targetStepIdx);
    } else {
      const targetKey = Object.keys(target)[0];
      const targetStep = Object.values(target)[0];
      const targetStepIdx = stepsMap[targetKey];
      const multiStep = steps[targetStepIdx] as MultiStepType;
      const subSteps = multiStep[targetKey];
      const targetIdx = subSteps.indexOf(targetStep);

      if (targetIdx >= 0) {
        setCurrent({ [targetKey]: targetStep });
      }

      setStepIdx(targetStepIdx);
    }

    addHistory();
  };

  const onPrevStep = () => {
    if (isStepFirst() || historys.length === 0) return;

    removeHistory();
  };

  const Step = (props: StepProps): ReactElement => {
    return <>{props.children}</>;
  };

  const Funnel = ({ children }: FunnelProps) => {
    const targetStep = children.find((childStep) => childStep.props.name === currentStep());

    return <>{targetStep}</>;
  };

  return {
    steps,
    currentStep,
    currentChartStep,
    onNextStep,
    onPrevStep,
    Funnel,
    Step,
    onMoveStep,
  };
}

type SingleStepType = string;
type MultiStepType = { readonly [key: string]: readonly string[] };

type StepType = SingleStepType | MultiStepType;
type StepsType = readonly [string, ...StepType[]];

interface StepProps {
  name: string;
  children: ReactNode;
}

interface FunnelProps {
  children: Array<ReactElement<StepProps>>;
}
