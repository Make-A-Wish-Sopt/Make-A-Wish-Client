'use client';

import {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from 'react';
import { Funnel } from '@/components/Modules/Funnel';
import useFunnel, { ExtractStepNames, FunnelStepsType } from '@/hooks/useFunnel';

// 공유 데이터 타입
type SharedDataMap<T extends FunnelStepsType> = Partial<Record<ExtractStepNames<T>, unknown>>;

// 컨텍스트 props 타입 (제네릭 포함)
interface FunnelContextProps<T extends FunnelStepsType> extends ReturnType<typeof useFunnel> {
  setSharedData: Dispatch<SetStateAction<SharedDataMap<T>>>;
  getSharedData: (key: ExtractStepNames<T>) => SharedDataMap<T>[ExtractStepNames<T>] | undefined;
}

// any로 생성하되, 내부에서 안전하게 타입 단언
const FunnelContext = createContext<FunnelContextProps<any> | null>(null);

// 외부에서 사용하는 훅 (with 타입 단언)
export const useFunnelContext = <T extends FunnelStepsType>() => {
  const context = useContext(FunnelContext);
  if (!context) {
    throw new Error('useFunnelContext must be used within a FunnelProvider');
  }
  return context as FunnelContextProps<T>;
};

// FunnelProvider는 제네릭으로 설계하되, context에선 any를 사용
export function FunnelProvider<T extends FunnelStepsType>({
  steps,
  children,
}: PropsWithChildren<{ steps: T }>) {
  const funnel = useFunnel(steps);
  const [sharedData, setSharedData] = useState<SharedDataMap<T>>({});

  const getSharedData = (key: ExtractStepNames<T>) => {
    return sharedData[key];
  };

  // 실제 value를 FunnelContext에 넣을 땐 as로 강제 캐스팅
  const contextValue = {
    ...funnel,
    setSharedData,
    getSharedData,
  } as FunnelContextProps<T>;

  return (
    <FunnelContext.Provider value={contextValue}>
      <Funnel current={funnel.currentStep()}>{children}</Funnel>
    </FunnelContext.Provider>
  );
}

// 'use client';

// import { Funnel } from '@/components/Modules/Funnel';
// import useFunnel, { ExtractStepNames, FunnelStepsType } from '@/hooks/useFunnel';
// import {
//   createContext,
//   Dispatch,
//   PropsWithChildren,
//   SetStateAction,
//   useContext,
//   useState,
// } from 'react';

// // 제네릭 타입을 사용하여 공유 데이터 타입 정의
// type SharedDataMap<T extends FunnelStepsType> = Partial<Record<ExtractStepNames<T>, any>>;

// // FunnelContextProps 타입을 제네릭으로 선언
// interface FunnelContextProps<T extends FunnelStepsType> extends ReturnType<typeof useFunnel> {
//   setSharedData: Dispatch<SetStateAction<SharedDataMap<T>>>;
//   getSharedData: (key: ExtractStepNames<T>) => SharedDataMap<T>[ExtractStepNames<T>] | undefined;
// }

// // FunnelContext를 제네릭으로 정의
// const FunnelContext = createContext<FunnelContextProps<any> | null>(null);

// // useFunnelContext 훅을 제네릭으로 수정
// export const useFunnelContext = <T extends FunnelStepsType>() => {
//   const context = useContext(FunnelContext);
//   if (!context) {
//     throw new Error('useFunnelContext must be used within a FunnelProvider');
//   }
//   return context as FunnelContextProps<T>;
// };

// // FunnelProvider 컴포넌트에서 제네릭 타입을 받아 처리
// export function FunnelProvider<T extends FunnelStepsType>({
//   steps,
//   children,
// }: PropsWithChildren<{ steps: T }>) {
//   const funnel = useFunnel(steps);
//   const [sharedData, setSharedData] = useState<SharedDataMap<T>>({});

//   // sharedData가 비어있는지 체크하는 함수
//   const isSharedDataEmpty = () => Object.keys(sharedData).length === 0;

//   // getSharedData에서 undefined 반환
//   const getSharedData = (key: ExtractStepNames<T>) => {
//     if (isSharedDataEmpty()) return undefined;
//     return sharedData[key];
//   };

//   return (
//     <FunnelContext.Provider value={{ ...funnel, setSharedData, getSharedData }}>
//       <Funnel current={funnel.currentStep()}>{children}</Funnel>
//     </FunnelContext.Provider>
//   );
// }
