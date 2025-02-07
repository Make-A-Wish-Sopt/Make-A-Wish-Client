/**
 * 이 함수는 현재 단계(`currentStep`)을 활성화하여 머메이드(Mermaid) 다이어그램을 생성합니다.
 *
 * 머메이드 코드 작성 규칙:
 * - 각 단계의 노드는 `{step}-{stepIdx}` 형식으로 작성합니다.
 * - 하위 메뉴가 있는 경우 `{step}-{stepIdx}-{submenuIdx}` 형식으로 작성합니다.
 *   (예: `account-2-0` → `account` 단계의 2번째 인덱스, 0번째 서브메뉴)
 * - 현재 활성화된 단계는 `class ${currentStep} active;`로 강조됩니다.
 *
 * @param {string} currentStep - 현재 활성화할 단계의 식별자
 * @returns {string} 머메이드 다이어그램 코드
 */

import { StepArrayType } from '@/hooks/common/useStep';

export const createWishesFlowChart = (currentStep: string) => {
  return `
    flowchart TD
    link-0(사용자 소원정보 입력 단계) --> If{선물도 원하는가?}
    If --> |No| done-3(소원생성 완료)
    If --> |Yes| select-1(입금받을 은행 선택 단계)
    select-1 --> |계좌입금 방식| account-2-0(계좌정보 입력 단계)
    select-1(입금받을 은행 선택 단계) --> |카카오페이 방식| kakaopay-2-1(카카오페이 송금코드 입력단계)
    subgraph selectPayment-2[Select Payment]
      direction TB
      account-2-0(계좌정보 입력 단계)
      kakaopay-2-1(카카오페이 송금코드 입력단계)
    end

    account-2-0(계좌정보 입력 단계) --> |소원생성 완료| done-3(소원생성 완료)
    kakaopay-2-1(카카오페이 송금코드 입력단계) --> |소원생성 완료| done-3(소원생성 완료)

    classDef active fill:#ffcc00,stroke:#333,stroke-width:3px;
    class ${currentStep} active;
    `;
};

export const createDynamicWishesFlowChart = (stepArray: StepArrayType, currentStep: string) => {
  let mermaidCode = `flowchart TD\n`;
  let prevStepId = '';

  stepArray.forEach((step, stepIdx) => {
    if (typeof step === 'string') {
      const stepId = `${step}-${stepIdx}`;
      mermaidCode += `  ${stepId}(${step} 단계)\n`;
      if (prevStepId) mermaidCode += `  ${prevStepId} --> ${stepId}\n`;
      prevStepId = stepId;
    } else if (typeof step === 'object') {
      const [stepKey, subSteps] = Object.entries(step)[0];
      const stepId = `${stepKey}-${stepIdx}`;
      mermaidCode += `  subgraph ${stepId}[${stepKey} 단계]\n    direction TB\n`;

      subSteps.forEach((subStep, subIdx) => {
        const subStepId = `${subStep}-${stepIdx}-${subIdx}`;
        mermaidCode += `    ${subStepId}(${subStep} 단계)\n`;
      });
      mermaidCode += `  end\n`;
      subSteps.forEach((subStep, subIdx) => {
        mermaidCode += `  ${prevStepId} --> ${subStep}-${stepIdx}-${subIdx}\n`;
      });
      prevStepId = subSteps.map((subStep, subIdx) => `${subStep}-${stepIdx}-${subIdx}`).join(' ');
    }
  });

  mermaidCode += `\n  classDef active fill:#ffcc00,stroke:#333,stroke-width:3px;\n  class ${currentStep} active;\n`;

  return mermaidCode;
};
