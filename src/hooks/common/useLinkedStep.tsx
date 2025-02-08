import { ReactElement, ReactNode, useState } from 'react';

export default function useLinkedStep(steps: StepsType) {
  const [stepNode, setStepNode] = useState<LinkedStepNode>(createLinkedStep(steps));
  const [current, setCurrent] = useState<string | {}>(stepNode.value);
  const [historys, setHistorys] = useState<Array<string | {}>>([]);

  const currentStep = () => {
    return typeof current === 'string' ? current : Object.values(current)[0];
  };

  const moveToNextStep = () => {
    if (typeof stepNode.next.value !== 'string') return;

    setStepNode(stepNode.next);
    setCurrent(stepNode.next.value);
    const tempHistorys = historys;
    tempHistorys.push(current);
    setHistorys([...tempHistorys]);
  };

  const moveToNextTargetStep = <T extends MultiStepType>(
    target: Record<keyof T, T[keyof T][number]>,
  ) => {
    if (typeof stepNode.next.value === 'string') return;

    const targetKey = Object.keys(target)[0];
    const targetStep = target[targetKey];

    const nextStepKey = Object.keys(stepNode.next.value)[0];
    const nextSubSteps = stepNode.next.value[nextStepKey];

    if (nextStepKey !== targetKey) return;

    if (targetKey === nextStepKey && nextSubSteps && nextSubSteps.includes(targetStep)) {
      setCurrent({ [targetKey]: targetStep });
      setStepNode(stepNode.next);

      const tempHistorys = historys;
      tempHistorys.push(current);
      setHistorys([...tempHistorys]);
    }
  };

  const onNextStep = <T extends MultiStepType>(target?: Record<keyof T, T[keyof T][number]>) => {
    if (!stepNode.next) return;

    if (!target) {
      moveToNextStep();
    } else {
      moveToNextTargetStep<T>(target);
    }
  };

  const onPrevStep = () => {
    if (!stepNode.prev) return;

    const tempHistorys = historys;
    const lastHistory = tempHistorys.pop();

    setCurrent(lastHistory);
    setHistorys([...tempHistorys]);
    setStepNode(stepNode.prev);
  };

  const Step = (props: StepProps): ReactElement => {
    return <>{props.children}</>;
  };

  const Funnel = ({ children }: FunnelProps) => {
    if (!stepNode) return;

    const targetStep = children.find((childStep) => childStep.props.name === currentStep());

    return <>{targetStep}</>;
  };

  return {
    currentStep,
    onNextStep,
    onPrevStep,
    Funnel,
    Step,
  };
}

interface LinkedStepNode {
  value: StepType;
  next?: LinkedStepNode;
  prev?: LinkedStepNode;
  depth: number;
}

function createLinkedStep(steps: StepsType): LinkedStepNode {
  if (steps.length === 0) return;

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

type SingleStepType = string;
type MultiStepType = { readonly [key: string]: readonly string[] };

type StepType = SingleStepType | MultiStepType;
export type StepsType = readonly [string, ...StepType[]];

interface StepProps {
  name: string;
  children: ReactNode;
}

interface FunnelProps {
  children: Array<ReactElement<StepProps>>;
}
