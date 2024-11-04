import MainLayout from '@/layouts/MainLayout';
import Header from '@/components/Common/Hedaer';
import { getMainProgressWishesData } from '@/api/wishes';

import { getLoginUserCookiesData } from '@/utils/common/cookies';
import WishesPageContainer from '@/domain/wishes/container';

export default async function WishesPage() {
  const progressWishesData = await getMainProgressWishesData();
  const loginUserData = await getLoginUserCookiesData();

  return (
    <>
      <Header mypageBtn />
      <MainLayout>
        <WishesPageContainer
          progressWishesData={progressWishesData}
          loginUserData={loginUserData}
        />
      </MainLayout>
    </>
  );
}
