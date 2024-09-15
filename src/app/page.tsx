import Header from '@/components/Common/Hedaer';
import MainLayout from '@/layouts/MainLayout';
import IndexContainer from '@/container/index-container.server';

export default function Home() {
  return (
    <>
      <Header />
      <MainLayout>
        <IndexContainer />
      </MainLayout>
    </>
  );
}
