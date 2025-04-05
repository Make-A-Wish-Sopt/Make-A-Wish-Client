import { Step } from '@/components/Modules/Funnel';
import { WishCreateFunnel, WishCreateFunnelProvider } from './Components/FunnelContainer';
import { ExtractStepNames } from '@/hooks/useFunnel';
import SelectPaymentForm from './Components/Form/SelectPaymentForm';
import KakaopayCodeForm from './Components/Form/KakaopayCodeForm';
import MainLayout from '@/layouts/MainLayout';
import WishesForm from './Components/Form/WishesForm';
import AccountForm from './Components/Form/AccountForm';
import WishCreateFinishForm from './Components/Form/WishCreateFinishForm.Server';
import { ReactNode } from 'react';
import Image from 'next/image';
import { WishesFormPresentIc } from '@public/assets/icons';

/**
 * Wishes Create Funnel의 모든 단계를 정의하는 상수
 * @remarks 중첩 배열은 서브 스텝을 나타냅니다
 */
const WishesCreateFunnelSteps = [
  'complete',
  'wishes',
  'selectPayment',
  ['account', 'kakaopay'],
  'complete',
] as const;

export type WishesFunnelStepType = typeof WishesCreateFunnelSteps;

/**
 * Wishes Create Funnel에서 사용 가능한 모든 단계 이름
 * @example 'wishes' | 'selectPayment' | 'account' | 'kakaopay' | 'done'
 */
export type WishesFunnelStepName = ExtractStepNames<typeof WishesCreateFunnelSteps>;

export default async function WishesCreatePage() {
  return (
    <WishCreateFunnelProvider steps={WishesCreateFunnelSteps}>
      <WishCreateFunnel>
        <Step name="wishes">
          <MainLayout>
            <StepTitle title={'생일잔치 링크 생성하기'} />
            <Step.FormSection className="flex flex-col gap-12 mb-24">
              <WishesForm />
            </Step.FormSection>
          </MainLayout>
        </Step>

        <Step name="selectPayment">
          <MainLayout>
            <StepTitle title={'현금 입금 방식 선택하기'} />
            <Step.FormSection className="flex flex-col gap-12 mb-24">
              <SelectPaymentForm />
            </Step.FormSection>
          </MainLayout>
        </Step>

        <Step name="account">
          <MainLayout>
            <StepTitle title={'입금 받을 계좌 입력하기'} />
            <Step.FormSection className="flex flex-col gap-12 mb-24">
              <AccountForm />
            </Step.FormSection>
          </MainLayout>
        </Step>

        <Step name="kakaopay">
          <MainLayout>
            <StepTitle title={'카카오톡 송금코드 가져오기'} />
            <Step.FormSection className="flex flex-col gap-12 mb-24">
              <KakaopayCodeForm />
            </Step.FormSection>
          </MainLayout>
        </Step>

        <Step name="complete">
          <MainLayout>
            <Step.FormSection className="flex flex-col gap-12 mb-24">
              <WishCreateFinishForm />
            </Step.FormSection>
          </MainLayout>
        </Step>
      </WishCreateFunnel>
    </WishCreateFunnelProvider>
  );
}

const StepTitle = ({ title }: { title: ReactNode }) => {
  return (
    <div className="flex items-center gap-10 mt-26 mb-20">
      <Image src={WishesFormPresentIc} alt="선물 아이콘 이미지" />
      <h1 className="font-bitbit text-main_blue text-[24px]">{title}</h1>
    </div>
  );
};
