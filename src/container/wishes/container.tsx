import { getPublicWishes } from '@/api/public';
import { getCakesResult } from '@/api/cakes';
import { getMainProgressWishesData } from '@/api/wishes';
import DayCountText from '@/components/UI/DayCountText';
import { WishesMessageToCreateUser } from './server';
import WishesPageStateContainer from './client';
import { CakeItemType, defaultCakeListData } from '@/constant/model/cakes';
import { CakesTree } from '@/components/UI/CakeTree';
import { getLoginUserCookiesData } from '@/utils/common/cookies';

export default async function WishesPageContainer() {
  const progressWishesData = await getMainProgressWishesData();

  const { wishId, dayCount } = progressWishesData;
  const publicWishesData = await getPublicWishes(wishId);
  const receivedCakeList = await getCakesResult(wishId);
  const { nickName } = await getLoginUserCookiesData();

  return (
    <WishesPageStateContainer isWishesProgress={progressWishesData !== undefined}>
      <DayCountText dayCount={dayCount} />
      <WishesMessageToCreateUser
        publicWishesData={publicWishesData}
        cakeMessageOnlyOne={receivedCakeList.length === 1}
      />

      <CakesTree cakeList={defineCakeTree(receivedCakeList)} wishId={wishId} nickName={nickName} />
      <div className="fixed bottom-0 w-full h-170 bg-[linear-gradient(180deg,_rgba(4,6,31,0)_0%,_rgba(4,6,31,1)_100%)]" />
    </WishesPageStateContainer>
  );
}

function defineCakeTree(receivedCakeList?: CakeItemType[]) {
  if (!receivedCakeList) return defaultCakeListData;

  if (receivedCakeList.length === 0) return defaultCakeListData;

  if (receivedCakeList.length > 0 && receivedCakeList.length < 12) {
    const mergedCakeList = [
      ...receivedCakeList,
      ...defaultCakeListData.slice(0, 12 - receivedCakeList.length),
    ];

    return mergedCakeList;
  }

  return receivedCakeList;
}
