import FixedStepButton from '@/components/Common/Button/FixedStepButton';
import Header from '@/components/Common/Hedaer';
import StepInputProvider from '@/context/stepInputContext';
import MainLayout from '@/layouts/MainLayout';

export default function CreateWishPage() {
  return (
    <>
      <Header backBtn />
      <MainLayout>
        <StepInputProvider>
          <FixedStepButton> </FixedStepButton>
        </StepInputProvider>
      </MainLayout>
    </>
  );
}
