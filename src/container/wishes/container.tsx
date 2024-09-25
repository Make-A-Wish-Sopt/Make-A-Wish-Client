'use client';

import { useGetPublicWishes } from '@/hooks/queries/public';
import { CenteredGuideMessage, CakeTree, WishesCreateButton } from './client';
import { defaultCakeListData } from '@/constant/cakeData';
import Loading from '@/app/loading';
import { useGetCakesResult } from '@/hooks/queries/cakes';
import { useGetMainProgressData } from '@/hooks/queries/wishes';

export default function WishesPageContainer() {
  // 여기서 아이디를 서버에서 받는게 제일 좋을거 같다.
  const { progressData } = useGetMainProgressData();
  const wishId = progressData ? progressData.wishId : '';
  const { publicWishesData, isLoading } = useGetPublicWishes(wishId);
  const { receivedCakeList, receivedCakeListTotalCount } = useGetCakesResult(wishId);

  

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="w-full text-right px-5 mt-8">
            <span className="text-[20px] font-bitbit text-main_blue">
              {publicWishesData ? `D-${publicWishesData.dayCount}` : 'D-?'}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <>
              {publicWishesData ? (
                <CenteredGuideMessage
                  message={
                    receivedCakeList?.length === 1
                      ? `저희가 ${publicWishesData.name}님의 생일을\n축하하며 편지를 남겼어요!`
                      : `${publicWishesData.name}님의 생일잔치에\n도착한 케이크들이에요!`
                  }
                />
              ) : (
                <CenteredGuideMessage />
              )}
            </>
            <CakeTree cakeList={receivedCakeList || defaultCakeListData} />
            <WishesCreateButton isWishesCreateBefore={publicWishesData === undefined} />
            <div className="fixed bottom-0 w-full h-170 bg-[linear-gradient(180deg,_rgba(4,6,31,0)_0%,_rgba(4,6,31,1)_100%)]"></div>
          </div>
        </>
      )}
    </>
  );
}
