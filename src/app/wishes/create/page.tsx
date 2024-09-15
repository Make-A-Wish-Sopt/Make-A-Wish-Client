import Header from '@/components/Common/Hedaer';
import WishesCreateContainer from '@/container/wishes/create/wishes-create-container.server';
import StepInputProvider from '@/context/stepInputContext';
import MainLayout from '@/layouts/MainLayout';

export default function WishesCreatePage() {
  return (
    <>
      <Header backBtn />
      <MainLayout>
        <StepInputProvider>
          <WishesCreateContainer />
        </StepInputProvider>
      </MainLayout>
    </>
  );
}
