import MainLayout from '@/layouts/MainLayout';
import Header from '@/components/Common/Hedaer';
import WishesSharePageContainer from '@/container/wishes/share/container';

export default async function WishesSharePage() {
  return (
    <>
      <Header />
      <MainLayout>
        <WishesSharePageContainer />
      </MainLayout>
    </>
  );
}
