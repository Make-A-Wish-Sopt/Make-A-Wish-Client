import MainLayout from '@/layouts/MainLayout';
import Header from '@/components/Common/Hedaer';
import WishesPageContainer from '@/container/wishes/container';
import { getLoginUserCookiesData } from '@/utils/common/cookies';

export default async function WishesPage() {
  return (
    <>
      <Header mypageBtn />
      <MainLayout>
        <WishesPageContainer />
      </MainLayout>
    </>
  );
}
