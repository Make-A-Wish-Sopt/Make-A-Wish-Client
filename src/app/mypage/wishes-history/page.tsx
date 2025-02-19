import { getWishes } from '@/api/wishes';
import BackButton from '@/components/Elements/Button/BackButton';
import Header from '@/components/Layout/Hedaer';
import WishesHistoryPageContainer from '@/domain/mypage/wish-history/container';
import { WishesCreateTitleText } from '@/domain/wishes/create/content';
import MainLayout from '@/layouts/MainLayout';

export default async function WishesHistoryPage() {
  const wishesHistory = await getWishes();

  return (
    <MainLayout Header={<Header leftMenu={<BackButton routePath="/mypage" />} />} isPrivate>
      <WishesHistoryPageContainer wishesHistory={wishesHistory}>
        <WishesCreateTitleText>지난 생일잔치 링크 모음</WishesCreateTitleText>,
      </WishesHistoryPageContainer>
    </MainLayout>
  );
}
