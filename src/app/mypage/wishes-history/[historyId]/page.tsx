import Header from '@/components/Common/Hedaer';
import WishesHistoryMessageTreePageContainer from '@/domain/mypage/wish-history/[historyId]/container';
import MainLayout from '@/layouts/MainLayout';

export default async function WishesHistoryMessageTreePage() {
  return (
    <>
      <Header backBtn routePath="/mypage" />
      <MainLayout checkLoggedIn>
        <WishesHistoryMessageTreePageContainer></WishesHistoryMessageTreePageContainer>
      </MainLayout>
    </>
  );
}
