import { getCakesResult } from '@/api/cakes';
import { getSingleWishInfo } from '@/api/wishes';
import BackButton from '@/components/Elements/Button/BackButton';
import MypageButton from '@/components/Elements/Button/MypageButton';
import Header from '@/components/Layout/Hedaer';
import WishesHistoryMessageTreePageContainer from '@/domain/mypage/wish-history/[historyId]/container';
import MainLayout from '@/layouts/MainLayout';
import { getLoginUserCookiesData } from '@/utils/common/cookies';
import { defineCakeTree } from '@/utils/common/defineCakeTree';

export default async function WishesHistoryMessageTreePage({
  params,
}: {
  params: { historyId: string };
}) {
  const { historyId } = params;

  const wishesHistory = await getSingleWishInfo(historyId);
  const loginUserData = await getLoginUserCookiesData();
  const receivedCakeList = await getCakesResult(historyId);
  const convertRecentCakeList = receivedCakeList.reverse();
  const cakeList = defineCakeTree(convertRecentCakeList);

  return (
    <MainLayout
      Header={<Header leftMenu={<BackButton />} rightMenu={<MypageButton />} />}
      isPrivate
    >
      <WishesHistoryMessageTreePageContainer
        wishesHistory={wishesHistory}
        nickname={loginUserData.nickName}
        cakeList={cakeList}
        historyId={historyId}
      ></WishesHistoryMessageTreePageContainer>
    </MainLayout>
  );
}
