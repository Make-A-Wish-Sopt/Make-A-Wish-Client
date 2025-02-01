'use client';

import Button from '@/components/Common/Button';
import useFormSteps from '@/hooks/common/useLinkedList';
import StepVisual from '@/utils/common/d3';

export default function TestComponent() {
  const deepStep1Query: ['account', 'kakaopay'] = ['account', 'kakaopay'];
  const deepStep1 = { deepStep1: deepStep1Query };
  type DeepStep1Type = typeof deepStep1;

  const deepStep2Query: ['step1', 'step2'] = ['step1', 'step2'];
  const deepStep2 = { deepStep2: deepStep2Query };
  type DeepStep2Type = typeof deepStep2;

  const stepArray = ['link', 'select', deepStep1, deepStep2, 'done'];

  const hook = useFormSteps(stepArray);
  const { currentStep, onNextStep, onPrevStep, onNextSteps, onPrevSteps } = hook;

  const currentStepValue = currentStep() || 'link'; // currentStep()이 undefined일 경우 기본값 설정

  return (
    <>
      <div className="flex gap-5">
        <Button
          onClick={() => {
            onPrevStep();
          }}
        >
          이전 단계
        </Button>
        <Button
          onClick={() => {
            onNextStep();
          }}
        >
          다음 단계
        </Button>
      </div>
      <div className="flex gap-5 mt-30">
        <Button
          onClick={() => {
            // onNextSteps<typeof deepStep1Query>('');
          }}
        >
          이전 단계
        </Button>
        <Button
          onClick={() => {
            onNextSteps<DeepStep1Type>('deepStep1', 'kakaopay');
          }}
        >
          다음 단계
        </Button>
      </div>
      <StepVisual test={hook} />
    </>
  );
}
