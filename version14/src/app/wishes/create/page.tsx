import FixedStepButton from '@/components/Common/Button/FixedStepButton';
import Header from '@/components/Common/Hedaer';
import WishesCreateContainer from '@/container/wishes/create/wishes-create.container';
import StepInputProvider from '@/context/stepInputContext';
import MainLayout from '@/layouts/MainLayout';


export default function WishesCreatePage() {
  return (
    <>
      <Header backBtn />
      <MainLayout>
        <StepInputProvider>
          <WishesCreateContainer/>
          <FixedStepButton> </FixedStepButton>
        </StepInputProvider>
      </MainLayout>
    </>
  );
}
