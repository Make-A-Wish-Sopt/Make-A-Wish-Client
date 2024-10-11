import MainLayout from '@/layouts/MainLayout';
import Header from '@/components/Common/Hedaer';
import WishesSharePageContainer from '@/container/wishes/share/container';

// 예외처리 해야합니다!

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
