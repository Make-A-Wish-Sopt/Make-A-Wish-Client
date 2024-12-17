import { getSingleWishInfo } from '@/api/wishes';
import Header from '@/components/Common/Hedaer';
import WishesHistoryMessageTreePageContainer from '@/domain/mypage/wish-history/[historyId]/container';
import MainLayout from '@/layouts/MainLayout';
import { getLoginUserCookiesData } from '@/utils/common/cookies';

export default async function WishesHistoryMessageTreePage({
  params,
}: {
  params: { historyId: string };
}) {
  const { historyId } = params;

  const wishesHistory = await getSingleWishInfo(historyId);
  const loginUserData = await getLoginUserCookiesData();

  return (
    <>
      <Header backBtn mypageBtn />
      <MainLayout checkLoggedIn>
        <WishesHistoryMessageTreePageContainer
          wishesHistory={wishesHistory}
          nickname={loginUserData.nickName}
        ></WishesHistoryMessageTreePageContainer>
      </MainLayout>
    </>
  );
}
