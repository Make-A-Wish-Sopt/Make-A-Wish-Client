import Header from '@/components/Common/Hedaer';
import MainPageContainer from '@/domain/home/container';
import MainLayout from '@/layouts/MainLayout';

export default async function Home() {
  return (
    <>
      <Header mypageBtn />
      <MainLayout>
        <MainPageContainer />
      </MainLayout>
    </>
  );
}
