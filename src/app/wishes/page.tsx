import MainLayout from '@/layouts/MainLayout';
import Header from '@/components/Common/Hedaer';
import WishesPageContainer from '@/container/wishes/container';

export default function WishesPage() {
  return (
    <>
      <Header mypageBtn />
      <MainLayout>
        <WishesPageContainer />
      </MainLayout>
    </>
  );
}
