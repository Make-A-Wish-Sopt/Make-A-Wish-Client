import Header from '@/components/Common/Hedaer';
import PresentContainer from '@/container/present/index-container.server';
import MainLayout from '@/layouts/MainLayout';

export default function Home() {
  return (
    <>
      <Header />
      <MainLayout>
        <PresentContainer />
      </MainLayout>
    </>
  );
}
