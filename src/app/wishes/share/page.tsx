import MainLayout from '@/layouts/MainLayout';
import Header from '@/components/Common/Hedaer';
// import WishesSharePageContainer from '@/container/wishes/share/container';
import { getMainProgressWishesData } from '@/api/wishes';
import ErrorPage from '@/app/error';
import WishesSharePageContainer from '@/domain/wishes/share/container';
import { CenteredContent } from '@/domain/wishes/share/service';

// 예외처리 해야합니다!

export default async function WishesSharePage() {
  const progressWishesData = await getMainProgressWishesData();

  return (
    <>
      <Header />
      <MainLayout>
        {!!progressWishesData ? (
          <WishesSharePageContainer>
            <CenteredContent />
          </WishesSharePageContainer>
        ) : (
          <ErrorPage alertMessage="소원 정보가 존재하지 않아요!" />
        )}
      </MainLayout>
    </>
  );
}
