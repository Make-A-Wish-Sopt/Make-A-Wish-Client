import WishesPageStateContainer, { CakeTree, WishesCreateOrShareButton } from './client';
import { defaultCakeListData } from '@/constant/model/cakes';
import { MainProgressDataType } from '@/types/wishesType';
import { getPublicWishes } from '@/api/public';
import { getCakesResult } from '@/api/cakes';
import { getLoginUserCookiesData, LoginUserDataType } from '@/utils/common/cookies';
import { getMainProgressWishesData } from '@/api/wishes';
import DayCountText from '@/components/UI/DayCountText';
import { WishesMessageToCreateUser } from './server';

export default async function WishesPageContainer({
  loginUserData,
}: {
  loginUserData?: LoginUserDataType;
}) {
  const progressWishesData = await getMainProgressWishesData();
  // const loginUserData = await getLoginUserCookiesData();
  const wishId = progressWishesData && progressWishesData.wishId;
  const publicWishesData = wishId && (await getPublicWishes(wishId));
  // const receivedCakeList = wishId && (await getCakesResult(wishId));

  return (
    <WishesPageStateContainer>
      <DayCountText dayCount={progressWishesData?.dayCount} />
      <WishesMessageToCreateUser publicWishesData={publicWishesData} />

      {/* <div className="w-full text-right px-5 mt-8">
        <span className="text-[20px] font-bitbit text-main_blue">
          {publicWishesData ? `D-${publicWishesData?.dayCount}` : 'D-?'}
        </span>
      </div>

      <div className="flex flex-col items-center">
        {publicWishesData ? (
          <CenteredGuideMessage
            message={
              receivedCakeList?.length === 1
                ? `저희가 ${publicWishesData.name}님의 생일을\n축하하며 편지를 남겼어요!`
                : `${publicWishesData.name}님의 생일잔치에\n도착한 케이크들이에요!`
            }
          />
        ) : (
          <CenteredGuideMessage nickName={loginUserData?.nickName} />
        )}

        <CakeTree cakeList={receivedCakeList || defaultCakeListData} />


        <WishesCreateOrShareButton isWishesCreateBefore={publicWishesData === undefined} />
        <div className="fixed bottom-0 w-full h-170 bg-[linear-gradient(180deg,_rgba(4,6,31,0)_0%,_rgba(4,6,31,1)_100%)]"></div>
      </div> */}
    </WishesPageStateContainer>
  );
}
