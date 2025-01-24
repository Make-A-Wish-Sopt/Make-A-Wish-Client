'use client';

import Button from '@/components/Common/Button';
import useFormSteps from '@/hooks/common/useStep';

export default function TestComponent() {
  const deepStep = {
    kakaopay: 'kakaopay',
    account: 'account',
  } as const;

  type DeepStepType = typeof deepStep;

  const testStep = ['link', 'select', deepStep, 'done'];

  type TestStepType = typeof testStep;

  const {
    currentStep,
    handleNextStepRouter,
    handlePrevStepRouter,
    handleSameLevelNext,
    handleSameLevelPrev,
    Funnel,
    Step,
  } = useFormSteps<TestStepType>(testStep);

  console.log(currentStep());

  return (
    <>
      <div className="flex gap-5">
        <Button onClick={() => handlePrevStepRouter()}>이전 단계</Button>
        <Button onClick={() => handleNextStepRouter()}>다음 단계</Button>
      </div>

      <div className="flex gap-5 mt-30">
        <Button
          onClick={() => {
            handleSameLevelPrev<DeepStepType>('account');
          }}
        >
          구체적 이전단계
        </Button>
        <Button
          onClick={() => {
            handleSameLevelNext<DeepStepType>('account');
          }}
        >
          구체적 다음단계
        </Button>
      </div>

      <Funnel>
        <Step name="link">
          <h1 className="text-white text-[16px] font-bitbit">링크 단계입니다!</h1>
        </Step>

        <Step name="select">
          <h1 className="text-white text-[16px] font-bitbit">선택 단계입니다!</h1>
        </Step>

        <Step name={''}>
          <h1 className="text-white text-[16px] font-bitbit">은행 단계입니다!</h1>
        </Step>

        <Step name="done">
          <h1 className="text-white text-[16px] font-bitbit">완료 단계입니다!</h1>
        </Step>
      </Funnel>
    </>
  );
}
