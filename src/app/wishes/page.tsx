import MainLayout from '@/layouts/MainLayout';
import Header from '@/components/Common/Hedaer';
import WishesPageContainer from '@/container/wishes/container';
import { getMainProgressWishesData } from '@/api/wishes';

export default async function WishesPage() {
  const progressWishesData = await getMainProgressWishesData();

  return (
    <>
      <Header mypageBtn />
      <MainLayout>
        <WishesPageContainer progressWishesData={progressWishesData} />
      </MainLayout>
    </>
  );
}
