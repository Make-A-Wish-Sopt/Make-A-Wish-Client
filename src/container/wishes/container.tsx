import { getPublicWishes } from '@/api/public';
import { getCakesResult } from '@/api/cakes';
import { getMainProgressWishesData } from '@/api/wishes';
import DayCountText from '@/components/UI/DayCountText';
import { CakesMessageTree, WishesMessageToCreateUser } from './server';
import WishesPageStateContainer from './client';

export default async function WishesPageContainer() {
  const progressWishesData = await getMainProgressWishesData();
  const publicWishesData = await getPublicWishes(progressWishesData?.wishId);
  const receivedCakeList = await getCakesResult(progressWishesData?.wishId);

  return (
    <WishesPageStateContainer
      // DayCountText={<DayCountText dayCount={progressWishesData?.dayCount} />}
      // WishesMessageToCreateUser={<WishesMessageToCreateUser publicWishesData={publicWishesData} />}
      // ReceivedCakeTree={<ReceivedCakeTree receivedCakeList={receivedCakeList} />}
      isWishesProgress={progressWishesData !== undefined}
    >
      <DayCountText dayCount={progressWishesData?.dayCount} />
      <WishesMessageToCreateUser publicWishesData={publicWishesData} />

      <CakesMessageTree receivedCakeList={receivedCakeList} />
      <div className="fixed bottom-0 w-full h-170 bg-[linear-gradient(180deg,_rgba(4,6,31,0)_0%,_rgba(4,6,31,1)_100%)]" />
    </WishesPageStateContainer>
  );
}
