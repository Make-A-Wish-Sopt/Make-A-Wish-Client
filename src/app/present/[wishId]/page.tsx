import { getPublicWishes } from '@/api/public';
import ErrorPage from '@/app/error';
import { Step } from '@/components/Modules/Funnel';
import MainLayout from '@/layouts/MainLayout';
import { WishInfoForGiver } from './components/PresentForm.Server';
import PresentForm from './components/PresentForm';
import { PresentFunnelStep } from '@/constant/funnelStep';
import { FunnelContainer } from '@/app/_components/FunnelContainer';
import Header from '@/components/Elements/Header';
import { BackButton } from '@/components/Elements/Button/BackButton';
import { AlimTalkMessageButton } from '@/app/wishes/_components/AlimTalckButton';
import dynamic from 'next/dynamic';
import { DefaultResponseType, PublicWishesDataType } from '@/types/api/response';

const DynamicPaymentForm = dynamic(() => import('./components/PaymentForm'));
const DynamicCompleteForm = dynamic(() => import('./components/CompleteForm'));

export default async function GivePresentPage({ params }: { params: { wishId: string } }) {
  const publicProgressWishes = await getPublicWishes(params.wishId);

  if (!publicProgressWishes.success) {
    const errorResonse = publicProgressWishes.data as DefaultResponseType;
    return <ErrorPage alertMessage={`${errorResonse.message}`} />;
  }

  const publicWishesData = publicProgressWishes.data as PublicWishesDataType;

  const { title, presentImageUrl, hint, transferInfo, nickname } = publicWishesData;

  return (
    <FunnelContainer steps={PresentFunnelStep}>
      <Step name="present">
        <MainLayout Header={<Header leftMenu={<BackButton />} />}>
          <WishInfoForGiver
            생일잔치제목={title}
            친구가남긴이미지={presentImageUrl}
            친구가남긴메세지={hint}
          />
          <Step.FormSection className="flex flex-col mb-24">
            <PresentForm />
          </Step.FormSection>
        </MainLayout>
      </Step>

      <Step name="payment">
        <MainLayout>
          <Step.FormSection className="flex flex-col mb-24">
            <DynamicPaymentForm transferInfo={transferInfo} nickname={nickname} />
          </Step.FormSection>
        </MainLayout>
      </Step>

      <Step name="complete">
        <MainLayout>
          <Step.FormSection>
            <DynamicCompleteForm nickName={nickname} />
          </Step.FormSection>

          <Step.ButtonWrapper fixedBottom className="z-30">
            <AlimTalkMessageButton buttonText={'제 생일에도 써볼래요!'} />
          </Step.ButtonWrapper>
        </MainLayout>
      </Step>
    </FunnelContainer>
  );
}
