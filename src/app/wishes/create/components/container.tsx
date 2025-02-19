'use client';

import { FunnelContextProvider } from '@/Context/FunnelContext';
import { StepKeysType } from '@/hooks/common/useFunnel';
import { PropsWithChildren } from 'react';

export const selectPaymenet = { selectPaymenet: ['account', 'kakaopay'] } as const;
const wishesCreateSteps = ['link', 'select', selectPaymenet, 'done'] as const;
const wishesCreateStepsLables: Record<StepKeysType<typeof wishesCreateSteps>, string> = {
  link: '사용자 소원정보 입력단계',
  select: '입금받을 은행 선택 단계',
  account: '계좌정보 입력 단계',
  kakaopay: '카카오페이 송금코드 입력단계',
  done: '소원생성 완료',
};

export default function WishesCreatePageContainer({ children }: PropsWithChildren) {
  return (
    <FunnelContextProvider<typeof wishesCreateSteps>
      steps={wishesCreateSteps}
      labels={wishesCreateStepsLables}
    >
      {children}
    </FunnelContextProvider>
  );
}
