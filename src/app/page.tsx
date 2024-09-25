import Header from '@/components/Common/Hedaer';
import MainPageContainer from '@/container/container';
import MainLayout from '@/layouts/MainLayout';

export default function Home() {
  return (
    <>
      <Header />
      <MainLayout>
        <MainPageContainer />
      </MainLayout>
    </>
  );
}
