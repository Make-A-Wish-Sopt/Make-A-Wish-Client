import { getPublicWishes } from '@/api/public';
import ErrorPage from '@/app/error';
import { Step } from '@/components/Modules/Funnel';
import MainLayout from '@/layouts/MainLayout';
import { WishInfoForGiver } from './components/PresentForm.Server';
import PresentForm from './components/PresentForm';
import PaymentForm from './components/PaymentForm';
import CompleteForm from './components/CompleteForm';
import { PresentFunnelStep } from '@/constant/funnelStep';
import { FunnelContainer } from '@/app/_components/FunnelContainer';
import Header from '@/components/Elements/Header';
import { BackButton } from '@/components/Elements/Button/BackButton';

export default async function GivePresentPage({ params }: { params: { wishId: string } }) {
  const publicWishesData = await getPublicWishes(params.wishId);

  if (!publicWishesData) {
    return <ErrorPage alertMessage="해당 소원은 존재하지 않아요!" />;
  }

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
            <PaymentForm transferInfo={transferInfo} nickname={nickname} />
          </Step.FormSection>
        </MainLayout>
      </Step>

      <Step name="complete">
        <MainLayout>
          <Step.FormSection>
            <CompleteForm nickName={nickname} />
          </Step.FormSection>
        </MainLayout>
      </Step>
    </FunnelContainer>
  );
}
