'use client';

import Button from '@/components/Common/Button';
import useFormSteps from '@/hooks/common/useStep';

export default function TestComponent() {
  const testStep = ['link', 'select', { kakaopay: 'kakaopay', account: 'account' }, 'done'];
  type TestStepType = typeof testStep;
  const {
    currentStep,
    handleNextStepRouter,
    handlePrevStepRouter,
    TestTest,
    handleSameLevelNext,
    handleSameLevelPrev,
    nextSpecificStep,
  } = useFormSteps<TestStepType>(testStep);

  console.log('specific', nextSpecificStep());

  return (
    <TestTest>
      <div className="flex gap-5">
        <Button onClick={() => handlePrevStepRouter()}>이전 단계</Button>
        <Button onClick={() => handleNextStepRouter()}>다음 단계</Button>
      </div>

      <div className="flex gap-5 mt-30">
        <Button
          onClick={() => {
            handleSameLevelPrev(nextSpecificStep());
          }}
        >
          구체적 이전단계
        </Button>
        <Button
          onClick={() => {
            handleSameLevelNext('step1');
          }}
        >
          구체적 다음단계
        </Button>
      </div>
    </TestTest>
  );
}
