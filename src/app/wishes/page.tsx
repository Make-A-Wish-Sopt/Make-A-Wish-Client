import MainLayout from '@/layouts/MainLayout';
import Header from '@/components/Common/Hedaer';
import { getMainProgressWishesData } from '@/api/wishes';

import { getLoginUserCookiesData } from '@/utils/common/cookies';
import WishesPageContainer from '@/domain/wishes/container';
import { ReceivedCakePresentList, WishesMessageToCreateUser } from '@/domain/wishes/service';

export default async function WishesPage() {
  const progressWishesData = await getMainProgressWishesData();
  // const loginUserData = await getLoginUserCookiesData();

  return (
    <>
      <Header mypageBtn />
      <MainLayout>
        <WishesPageContainer>
          <ReceivedCakePresentList wishId={progressWishesData.wishId} />
          {/* {progressWishesData && (
            <>
              <WishesMessageToCreateUser wishId={progressWishesData.wishId} />
              <ReceivedCakePresentList wishId={progressWishesData.wishId} />
            </>
          )} */}
        </WishesPageContainer>
      </MainLayout>
    </>
  );
}
