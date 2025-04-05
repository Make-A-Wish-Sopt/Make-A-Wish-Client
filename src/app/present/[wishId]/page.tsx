import { getPublicWishes } from '@/api/public';
import ErrorPage from '@/app/error';
import { PresentFunnel, PresentFunnelProvider } from './components/FunnelContainer';
import { Step } from '@/components/Modules/Funnel';
import MainLayout from '@/layouts/MainLayout';
import { WishInfoForGiver } from './components/PresentForm.Server';
import PresentForm from './components/PresentForm';
import PaymentForm from './components/PaymentForm';
import CompleteForm from './components/CompleteForm';

const PresentSteps = ['complete', 'present', 'payment', 'complete'] as const;

export type PresentFunnelStepType = typeof PresentSteps;

export default async function GivePresentPage({ params }: { params: { wishId: string } }) {
  const publicWishesData = await getPublicWishes(params.wishId);

  if (!publicWishesData) {
    return <ErrorPage alertMessage="해당 소원은 존재하지 않아요!" />;
  }

  const { title, presentImageUrl, hint, transferInfo, nickname } = publicWishesData;

  return (
    <PresentFunnelProvider steps={PresentSteps}>
      <PresentFunnel>
        <Step name="present">
          <MainLayout>
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
      </PresentFunnel>
    </PresentFunnelProvider>
  );
}
