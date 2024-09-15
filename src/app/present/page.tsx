import Header from '@/components/Common/Hedaer';
import PresentContainer from '@/container/present/index-container.server';
import MainLayout from '@/layouts/MainLayout';

export default function PresentPage() {
  return (
    <>
      <Header backBtn />
      <MainLayout>
        <PresentContainer />
      </MainLayout>
    </>
  );
}
