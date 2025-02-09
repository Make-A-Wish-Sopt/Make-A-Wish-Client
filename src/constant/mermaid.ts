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

import { StepsType } from '@/hooks/common/useLinkedStep';

export function createMermaidFlowChart(
  steps: StepsType,
  labels: Record<string, string>,
  currentStep: string,
): string {
  let mermaidCode = 'flowchart TD\n';
  const subgraphs: string[] = [];

  steps.forEach((step, stepIdx) => {
    if (typeof step === 'string') {
      // 일반 단계
      const stepId = `${step}-${stepIdx}`;
      mermaidCode += `    ${stepId}(${labels[step]})\n`;
    } else if (typeof step === 'object') {
      // 하위 메뉴가 있는 경우 (예: selectPayment)
      const [groupKey, subSteps] = Object.entries(step)[0] as [string, readonly string[]];
      const subgraphId = `${groupKey}-${stepIdx}`;

      subgraphs.push(`    subgraph ${subgraphId}[${groupKey}]\n      direction TB\n`);

      // 서브그룹 안에서 하위 단계 처리

      subSteps.forEach((subStep, subIdx) => {
        const subStepId = `${subStep}-${stepIdx}-${subIdx}`;
        subgraphs.push(`      ${subStepId}(${labels[subStep]})\n`);
      });

      subgraphs.push(`    end\n`);
    }
  });

  mermaidCode += subgraphs.join('');

  for (let i = 1; i < steps.length; i++) {
    const currentStep = steps[i - 1];
    const nextStep = steps[i];

    if (typeof currentStep === 'string') {
      if (typeof nextStep === 'string') {
        mermaidCode += `    ${currentStep}-${i - 1} --> ${nextStep}-${i}\n`;
      } else {
        const subSteps = Object.values(nextStep)[0];

        subSteps.forEach((step, index) => {
          mermaidCode += `    ${currentStep}-${i - 1} --> ${step}-${i}-${index}\n`;
        });
      }
    } else {
      if (typeof nextStep === 'string') {
        const subSteps = Object.values(currentStep)[0];

        subSteps.forEach((step, index) => {
          mermaidCode += `    ${step}-${i - 1}-${index} --> ${nextStep}-${i}\n`;
        });
      }
    }
  }

  // 현재 활성화된 단계 강조
  mermaidCode += `    classDef active fill:#ffcc00,stroke:#333,stroke-width:3px;\n`;
  mermaidCode += `    class ${currentStep} active;\n`;

  return mermaidCode;
}

export const testMermaid = () => {};
