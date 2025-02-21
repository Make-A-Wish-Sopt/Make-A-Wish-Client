// import { StepsType } from '@/hooks/useFunnel';

// export const getMermaidCode = (steps: StepsType, currentStep: string) => {
//   let diagram: string[] = ['stateDiagram'];

//   for (let i = 0; i < steps.length; i++) {
//     const current = steps[i];
//     const next = steps[i + 1];

//     if (typeof current === 'string') {
//       if (typeof next === 'string') {
//         diagram.push(`  ${current} --> ${next} : Go to ${capitalize(next)}`);
//       } else if (typeof next === 'object' && next !== null) {
//         const [deepStepName, deepStepValues] = Object.entries(next)[0];
//         diagram.push(`  ${current} --> ${deepStepName} : Go to ${capitalize(deepStepName)}`);
//         diagram.push(`  state ${deepStepName} {`);
//         deepStepValues.forEach((value) => {
//           diagram.push(`    ${value}`);
//         });
//         diagram.push(`  }`);
//       }
//     }

//     if (typeof current === 'object' && current !== null) {
//       const [deepStepName, deepStepValues] = Object.entries(current)[0];

//       // 다음 단계가 있다면 연결 추가
//       if (typeof next === 'string') {
//         diagram.push(`  ${deepStepName} --> ${next} : Go to ${capitalize(next)}`);
//       } else if (typeof next === 'object' && next !== null) {
//         const [nextDeepStepName, nextDeepStepValues] = Object.entries(next)[0];
//         diagram.push(
//           `  ${deepStepName} --> ${nextDeepStepName} : Go to ${capitalize(nextDeepStepName)}`,
//         );
//         diagram.push(`  state ${nextDeepStepName} {`);
//         nextDeepStepValues.forEach((value) => {
//           diagram.push(`    ${value}`);
//         });
//         diagram.push(`  }`);
//       }
//     }
//   }

//   diagram.push(`\n  classDef active fill:#ffcc00,stroke:#333,stroke-width:3px;`);
//   diagram.push(`  class ${currentStep} active;`);

//   return diagram.join('\n');
// };

// // 첫 글자를 대문자로 변환하는 함수
// const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);
