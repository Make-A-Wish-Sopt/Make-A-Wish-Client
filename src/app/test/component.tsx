'use client';

import Button from '@/components/Common/Button';
import StepFlowChart from '@/components/UI/StepFlowChart';
import { createMermaidFlowChart } from '@/constant/mermaid';
import useFunnel from '@/hooks/common/useFunnel';
import { StepsType } from '@/hooks/common/useLinkedStep';

// ✅ stepArray 내부의 모든 문자열을 추출하는 유틸리티 타입
type ExtractSteps<T> = T extends string
  ? T
  : T extends Record<string, readonly string[]>
    ? T[keyof T][number]
    : never;

export type StepKeysType<T extends StepsType> = ExtractSteps<T[number]>;

export default function TestComponent() {
  const selectPaymenet = { selectPaymenet: ['account', 'kakaopay'] } as const;
  const testStep = { testStep: ['step1', 'step2'] } as const;
  const stepArray = ['link', 'select', selectPaymenet, 'done'] as const;

  const stepLables: Record<StepKeysType<typeof stepArray>, string> = {
    link: '사용자 소원정보 입력단계',
    select: '입금받을 은행 선택 단계',
    account: '계좌정보 입력 단계',
    kakaopay: '카카오페이 송금코드 입력단계',
    done: '소원생성 완료',
  };

  const { steps, Funnel, Step, currentChartStep, onNextStep, onPrevStep, onMoveStep } =
    useFunnel(stepArray);

  const dynamic = createMermaidFlowChart(stepArray, stepLables, currentChartStep());

  return (
    <>
      <div className="w-full ">
        <StepFlowChart
          // chart={basic}
          chart={dynamic}
          onMoveStep={onMoveStep}
          steps={steps}
        />
        <Funnel>
          <Step name="link">
            <h1 className="text-main_blue text-[24px]">1.link</h1>
          </Step>

          <Step name="select">
            <h1 className="text-main_blue text-[24px]">2.select</h1>
          </Step>

          <Step name="account">
            <h1 className="text-main_blue text-[24px]">3.account</h1>
          </Step>

          <Step name="kakaopay">
            <h1 className="text-main_blue text-[24px]">3.kakaopay</h1>
          </Step>

          <Step name="done">
            <h1 className="text-main_blue text-[24px]">4.done</h1>
          </Step>
        </Funnel>
      </div>

      <div className="flex gap-5 mb-20">
        <Button onClick={onPrevStep}>이전 단계</Button>
        <Button onClick={() => onNextStep()}>그냥 다음 단계</Button>
      </div>

      <div className="flex gap-5 mb-20">
        <Button onClick={() => onNextStep<typeof selectPaymenet>({ selectPaymenet: 'kakaopay' })}>
          select 다음 단계
        </Button>
        <Button onClick={() => onNextStep<typeof testStep>({ testStep: 'step1' })}>
          test 다음 단계
        </Button>
      </div>

      <div className="flex gap-5 mb-20">
        <Button onClick={() => onMoveStep('done')}>done 이동</Button>
      </div>
    </>
  );
}
