import Header from '@/components/Common/Hedaer';
import GivePresentPageContainer from '@/container/present/container';
import MainLayout from '@/layouts/MainLayout';

export default function GivePresentPage() {
  return (
    <>
      <Header backBtn />
      <MainLayout>
        <GivePresentPageContainer />
      </MainLayout>
    </>
  );
}
