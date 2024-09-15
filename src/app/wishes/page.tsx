import MainLayout from '@/layouts/MainLayout';
import Header from '@/components/Common/Hedaer';
import WishesContainer from '@/container/wishes/wishes-container.server';

export default function WishesPage() {
  return (
    <>
      <Header menuBtn />
      <MainLayout>
        <WishesContainer />
      </MainLayout>
    </>
  );
}
