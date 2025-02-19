'use client';

import { FunnelProps, StepProps } from '@/hooks/common/useFunnel';
import { ReactElement } from 'react';
import Button from './Button';
import { StepFlowChartProps } from '../UI/StepFlowChart';
import { useFunnelContext } from '@/Context/FunnelContext';
import useToggle from '@/hooks/common/useToggle';
import dynamic from 'next/dynamic';
import { createMermaidFlowChart } from '@/constant/mermaid';

const StepFlowChart = dynamic(() => import('../UI/StepFlowChart'));

export const Step = (props: StepProps): ReactElement => {
  return <>{props.children}</>;
};

export const Funnel = ({ children }: FunnelProps) => {
  const { steps, currentStep, currentChartStep, onMoveStep, labels } = useFunnelContext();
  const chart = createMermaidFlowChart(steps, labels, currentChartStep());

  const targetStep = children.find((childStep) => childStep.props.name === currentStep());

  return (
    <>
      {targetStep}
      <FunnelVisualTestDebugger steps={steps} onMoveStep={onMoveStep} chart={chart} />
    </>
  );
};

const FunnelVisualTestDebugger = (props: StepFlowChartProps) => {
  const visualState = useToggle();

  return (
    <div className="fixed bottom-0 right-0">
      {visualState.state && <StepFlowChart {...props} />}

      <Button onClick={visualState.handleState}>
        {visualState.state ? 'Visual OFF' : 'Visual ON'}
      </Button>
    </div>
  );
};
