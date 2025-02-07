import { usePathname } from 'next/navigation';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { RoutePathType, useRouters } from './useRouters';

type StepType = string | { [key: string]: string[] };
type StepsType = StepType[];

interface StepProps {
  name: string;
  children: ReactNode;
}

interface FunnelProps {
  children: Array<ReactElement<StepProps>>;
}

export default function useFormSteps(stepArr: StepsType) {
  const [step, setStep] = useState<LinkedStepNode | null>(null);

  const { handleRouter } = useRouters();
  const pathname = usePathname();

  useEffect(() => {
    setStep(createLinkedStep(stepArr));
  }, []);

  function handleMoveStep(step: string) {
    const stepRouter = `${pathname}?step=${step}` as RoutePathType;
    handleRouter(stepRouter);
  }

  function getStepArr() {
    return stepArr;
  }

  function currentStep() {
    if (!step) return;

    if (typeof step.value === 'string') return step.value;

    return 'hello';
  }

  console.log(step);

  function onMoveStpe(target: string) {
    if (currentStep() === target) return;
    const back = findStepBack(step, target);
    const front = findStepFront(step, target);
    if (back) {
      setStep(back);
      return;
    }
    if (front) {
      setStep(front);
      return;
    }
  }

  function findStepBack(steptest: LinkedStepNode, target: string) {
    if (!steptest.next) return;

    if (steptest.value === target) return steptest;

    return findStepBack(step.next, target);
  }

  function findStepFront(steptest: LinkedStepNode, target: string) {
    if (!steptest.prev) return;

    if (steptest.value === target) return steptest;

    return findStepFront(step.prev, target);
  }

  function onNextStep() {
    if (!step || !step.next) return;

    if (typeof step.next.value === 'string') {
      setStep(step.next);

      handleMoveStep(step.next.value);
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

      handleMoveStep(nextStepsKey);
    } else {
      console.log('Next StepKey is ', nextStepsKey);
      console.log('Next Steps are ', nextSteps);
      console.log('Please Select Collect Next Step Key&Value');
      return;
    }
  }

  function onPrevStep() {
    if (!step || !step.prev) return;

    if (typeof step.prev.value === 'string') {
      setStep(step.prev);

      handleMoveStep(step.prev.value);
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

      handleMoveStep(prevStepsKey);
    } else {
      console.log('Prev StepKey is ', prevStepsKey);
      console.log('Prev Steps are ', prevSteps);
      console.log('Please Select Collect Prev Step Key&Value');
      return;
    }
  }

  const Step = (props: StepProps): ReactElement => {
    return <>{props.children}</>;
  };

  const Funnel = ({ children }: FunnelProps) => {
    if (!step) return;
    const targetStep = children.find((childStep) => childStep.props.name === step.value);

    return <>{targetStep}</>;
  };

  const DynamicFlowDiagram = () => {
    const isObjectStep = (step: any): step is Record<string, string[]> => {
      return typeof step === 'object' && step !== null;
    };

    const calculateNodePositions = () => {
      const centerX = 200;
      const startY = 50;
      const verticalGap = 100;
      const subStepOffset = 150;

      const nodes = [];
      let currentY = startY;

      stepArr.forEach((step, index) => {
        if (isObjectStep(step)) {
          // 메인 노드 (왼쪽)
          const stepKey = Object.keys(step)[0];
          nodes.push({
            id: stepKey,
            label: stepKey,
            position: { x: centerX, y: currentY },
            type: 'main',
          });

          // 서브 노드들 (오른쪽)
          const subSteps = step[stepKey];
          subSteps.forEach((subStep, subIndex) => {
            nodes.push({
              id: `${stepKey}-${subStep}`,
              label: subStep,
              position: {
                x: centerX + subStepOffset,
                y: currentY - ((subSteps.length - 1) * 30) / 2 + subIndex * 30,
              },
              type: 'sub',
              parentId: stepKey,
            });
          });
        } else {
          // 일반 노드
          nodes.push({
            id: step,
            label: step,
            position: { x: centerX, y: currentY },
            type: 'main',
          });
        }
        currentY += verticalGap;
      });

      return nodes;
    };

    const generateArrows = (nodes) => {
      const arrows = [];
      const mainNodes = nodes.filter((node) => node.type === 'main');

      // 메인 노드들 사이의 수직 화살표
      for (let i = 0; i < mainNodes.length - 1; i++) {
        const current = mainNodes[i];
        const next = mainNodes[i + 1];
        arrows.push({
          id: `${current.id}-to-${next.id}`,
          path: `M ${current.position.x} ${current.position.y + 25}Q ${current.position.x} ${(current.position.y + next.position.y) / 2}${next.position.x} ${next.position.y - 25}`,
          type: 'main',
        });
      }

      // 서브 노드로의 화살표
      nodes
        .filter((node) => node.type === 'sub')
        .forEach((subNode) => {
          const parentNode = nodes.find((n) => n.id === subNode.parentId);
          if (parentNode) {
            arrows.push({
              id: `${parentNode.id}-to-${subNode.id}`,
              path: `M ${parentNode.position.x + 25} ${parentNode.position.y}
                Q ${(parentNode.position.x + subNode.position.x) / 2} ${subNode.position.y}
                ${subNode.position.x - 25} ${subNode.position.y}`,
              type: 'sub',
            });
          }
        });

      return arrows;
    };

    const nodes = calculateNodePositions();
    const arrows = generateArrows(nodes);

    const handleNodeClick = (nodeId: string, type: string) => {
      onMoveStpe(nodeId);
      // if (type === 'main') {
      //   // setCurrentStep(nodeId);
      // } else if (type === 'sub') {
      //   // if (parentId) setCurrentStep(parentId);
      // }
    };

    return (
      <div className="relative w-[500px] h-[600px] bg-white p-4 border rounded-lg shadow-lg">
        {nodes.map((node) => (
          <div
            key={node.id}
            onClick={() => handleNodeClick(node.id, node.type)}
            className={`
            absolute rounded-lg p-3 cursor-pointer
            transition-colors duration-200 shadow-sm
            ${currentStep() === node.id ? 'bg-yellow' : 'bg-gray1'}
            hover:bg-yellow-300
          `}
            style={{
              left: node.position.x,
              top: node.position.y,
              transform: 'translate(-50%, -50%)',
              minWidth: '100px',
              textAlign: 'center',
            }}
          >
            {node.label}
          </div>
        ))}
      </div>
    );
  };

  return {
    currentStep,
    onNextStep,
    onPrevStep,
    onNextSteps,
    onPrevSteps,
    getStepArr,
    Funnel,
    Step,
    DynamicFlowDiagram,
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
