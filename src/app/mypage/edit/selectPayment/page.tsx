import { getUserAccount } from '@/api/user';
import ErrorPage from '@/app/error';
import Header from '@/components/Elements/Header';
import MainLayout from '@/layouts/MainLayout';
import React from 'react';
import { Step } from '@/components/Modules/Funnel';
import { StepTitle } from '@/components/UI/StepTitle';
import { AccountFormFunnelStep } from '@/constant/funnelStep';
import SelectPaymentFormStep from '@/app/wishes/create/_components/Steps/SelectPaymentFormStep';
import AccountFormStep from '@/app/wishes/create/_components/Steps/AccountFormStep';
import KakaopayCodeFormStep from '@/app/wishes/create/_components/Steps/KakaopayCodeFormStep';
import { FunnelContainer } from '@/app/_components/FunnelContainer';
import { BackButton } from '@/components/Elements/Button/BackButton';

const page = async () => {
  const accountData = await getUserAccount();

  if (!accountData?.transferInfo) {
    return <ErrorPage alertMessage="등록된 입금방식이 없습니다!" btnMessage="뒤로 돌아가기" />;
  }

  return (
    <MainLayout Header={<Header leftMenu={<BackButton routePath="/mypage" />} />}>
      <FunnelContainer steps={AccountFormFunnelStep}>
        <Step name="selectPayment">
          <StepTitle title={'현금 입금 방식 선택하기'} />
          <SelectPaymentFormStep />
        </Step>

        <Step name="account">
          <StepTitle title={'입금 받을 계좌 입력하기'} />
          <Step.FormSection className="flex flex-col gap-12 mb-24">
            <AccountFormStep isEdit />
          </Step.FormSection>
        </Step>

        <Step name="kakaopay">
          <StepTitle title={'카카오톡 송금코드 가져오기'} />
          <Step.FormSection className="flex flex-col gap-12 mb-24">
            <KakaopayCodeFormStep isEdit />
          </Step.FormSection>
        </Step>
      </FunnelContainer>
    </MainLayout>
  );
};

export default page;
