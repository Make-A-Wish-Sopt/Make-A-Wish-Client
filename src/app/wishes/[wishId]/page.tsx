import { getPublicWishes } from '@/api/public';
import ErrorPage from '@/app/error';
import Header from '@/components/Common/Hedaer';
import { WishesIdLayoutWithContent } from '@/domain/wishes/[id]/component';
import WishesIdPageContainer from '@/domain/wishes/[id]/container';
import MainLayout from '@/layouts/MainLayout';

export default async function WishesIdPage({ params }: { params: { wishId: string } }) {
  const { wishId } = params;
  const publicProgressWishes = await getPublicWishes(wishId);

  if (publicProgressWishes === 'done') {
    return <ErrorPage alertMessage={`이미 종료된 생일잔치에요!`} />;
  }

  if (!publicProgressWishes) {
    return <ErrorPage alertMessage={`존재하지 않은 생일잔치에요!`} />;
  }

  return (
    <>
      <Header mypageBtn />
      <MainLayout>
        <WishesIdPageContainer wishId={wishId}>
          <WishesIdLayoutWithContent />
        </WishesIdPageContainer>
      </MainLayout>
    </>
  );
}
