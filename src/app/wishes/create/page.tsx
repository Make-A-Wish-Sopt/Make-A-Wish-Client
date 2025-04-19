import { Step } from '@/components/Modules/Funnel';
import MainLayout from '@/layouts/MainLayout';
import ErrorPage from '@/app/error';
import { WishesCreateFunnelSteps } from '@/constant/funnelStep';
import FunnelContainer from '@/app/_components/FunnelContainer';
import dynamic from 'next/dynamic';
import StepTitle from '@/components/UI/StepTitle';
import { getUserAccount } from '@/api/user';
import { accountFormInitValues } from '@/constant/init';
import Header from '@/components/Elements/Header';
import BackButton from '@/components/Elements/Button/BackButton';
import WishesFormStep from './_components/Steps/WishesFormStep';
import StepBackHeader from '../../_components/StepBackHeader';

const DynamicSelectPaymentFormStep = dynamic(
  () => import('./_components/Steps/SelectPaymentFormStep'),
  { ssr: false },
);
const DynamicAccountFormStep = dynamic(() => import('./_components/Steps/AccountFormStep'), {
  ssr: false,
});
const DynamicKakaopayCodeForm = dynamic(() => import('./_components/Steps/KakaopayCodeFormStep'), {
  ssr: false,
});

async function WishesCreatePage({ searchParams }: { searchParams: { wishTitle: string } }) {
  if (!searchParams.wishTitle) {
    return <ErrorPage alertMessage={`생일잔치제목을 입력하고\n입장해주세요!`} />;
  }

  const accountData = await getUserAccount();

  return (
    <FunnelContainer steps={WishesCreateFunnelSteps}>
      <Step name="wishes">
        <MainLayout Header={<Header leftMenu={<BackButton routePath="/wishes" />} />}>
          <StepTitle title="생일잔치 링크 생성하기" />
          <Step.FormSection className="flex flex-col gap-12 mb-24">
            <WishesFormStep />
          </Step.FormSection>
        </MainLayout>
      </Step>

      <Step name="selectPayment">
        <MainLayout>
          <StepBackHeader />
          <StepTitle title="현금 입금 방식 선택하기" />
          <Step.FormSection className="flex flex-col gap-12 mb-24">
            <DynamicSelectPaymentFormStep isForPayCode />
          </Step.FormSection>
        </MainLayout>
      </Step>

      <Step name="account">
        <MainLayout>
          <StepBackHeader />
          <StepTitle title="입금 받을 계좌 입력하기" />
          <Step.FormSection className="flex flex-col gap-12 mb-24">
            <DynamicAccountFormStep
              isEdit={false}
              defaultFormValues={
                accountData?.transferInfo ? accountData.transferInfo : accountFormInitValues
              }
            />
          </Step.FormSection>
        </MainLayout>
      </Step>

      <Step name="kakaopay">
        <MainLayout>
          <StepBackHeader />
          <StepTitle title="카카오톡 송금코드 가져오기" />
          <Step.FormSection className="flex flex-col gap-12 mb-24">
            <DynamicKakaopayCodeForm
              isEdit={false}
              defaultFormValues={
                accountData?.transferInfo ? accountData.transferInfo : accountFormInitValues
              }
            />
          </Step.FormSection>
        </MainLayout>
      </Step>
    </FunnelContainer>
  );
}

export default WishesCreatePage;
