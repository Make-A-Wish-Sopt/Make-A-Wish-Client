'use client';

import Button from '@/components/Common/Button';
import useFormSteps, { StepsType } from '@/hooks/common/useStep';
import mermaid from 'mermaid';
import { useEffect, useRef } from 'react';

export default function TestComponent() {
  const selectPaymenet = { selectPaymenet: ['account', 'kakaopay'] };
  const stepArray = ['link', 'select', selectPaymenet, 'done'];

  const { currentStep, onNextStep, onPrevStep, Funnel, Step, onMoveStep } = useFormSteps(
    stepArray as StepsType,
  );

  return (
    <>
      <div className="w-full ">
        <Funnel>
          <Step name="">
            <h1 className="text-main_blue text-[24px]">link</h1>
          </Step>

          <Step name="">
            <h1 className="text-main_blue text-[24px]">select</h1>
          </Step>
        </Funnel>
      </div>

      <div className="flex gap-5">
        <Button onClick={onPrevStep}>이전 단계</Button>
        <Button onClick={onNextStep}>다음 단계</Button>
      </div>
    </>
  );
}
