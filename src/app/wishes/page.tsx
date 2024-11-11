import MainLayout from '@/layouts/MainLayout';
import Header from '@/components/Common/Hedaer';
import { getMainProgressWishesData } from '@/api/wishes';

import { getLoginUserCookiesData } from '@/utils/common/cookies';
import WishesPageContainer, {
  CakesTreeMessage,
  WishesPageFixedBottomButton,
} from '@/domain/wishes/container';
import { ReceivedCakePresentList, WishesMessageToCreateUser } from '@/domain/wishes/service';
import { MessageText } from '@/domain/wishes/component';
import { defaultCakeListData } from '@/constant/model/cakes';

export default async function WishesPage() {
  const progressWishesData = await getMainProgressWishesData();
  const loginUserData = await getLoginUserCookiesData();

  return (
    <>
      <Header mypageBtn />
      <MainLayout>
        <WishesPageContainer>
          {progressWishesData ? (
            <>
              <WishesMessageToCreateUser
                wishId={progressWishesData.wishId}
                nickName={loginUserData.nickName}
              />
              <ReceivedCakePresentList wishId={progressWishesData.wishId} />
            </>
          ) : (
            <>
              <span className="flex flex-row-reverse w-full text-[24px] font-bitbit text-center text-main_blue mt-12 mb-10">
                D-?
              </span>
              <MessageText>{`${loginUserData.nickName}님, 친구들을 초대해\n케이크 접시를 꾸며봐요!`}</MessageText>
              <CakesTreeMessage cakeList={defaultCakeListData} />
            </>
          )}
          <WishesPageFixedBottomButton isWishProgress={!!progressWishesData} />
        </WishesPageContainer>
      </MainLayout>
    </>
  );
}
