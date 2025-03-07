import { getWishes } from '@/api/wishes';
import Header from '@/components/Common/Hedaer';
import WishesHistoryPageContainer from '@/domain/mypage/wish-history/container';
import { WishesCreateTitleText } from '@/domain/wishes/create/component';
import MainLayout from '@/layouts/MainLayout';

export default async function WishesHistoryPage() {
  const wishesHistory = await getWishes();

  return (
    <>
      <Header backBtn routePath="/mypage" />
      <MainLayout checkLoggedIn>
        <WishesHistoryPageContainer wishesHistory={wishesHistory}>
          <WishesCreateTitleText>지난 생일잔치 링크 모음</WishesCreateTitleText>,
        </WishesHistoryPageContainer>
      </MainLayout>
    </>
  );
}
