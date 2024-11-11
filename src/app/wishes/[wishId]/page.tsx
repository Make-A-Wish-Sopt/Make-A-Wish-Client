import { getPublicWishes } from '@/api/public';
import ErrorPage from '@/app/error';
import Header from '@/components/Common/Hedaer';
import InvitedWishesPageContainer from '@/container/wishes/[id]/container';
import MainLayout from '@/layouts/MainLayout';

export default async function InvitedWishesPage({ params }: { params: { wishId: string } }) {
  const { wishId } = params;
  const publicProgressWishes = await getPublicWishes(wishId);

  if (!publicProgressWishes) {
    return <ErrorPage alertMessage="소원링크가 잘못되었습니다!" />;
  }

  return (
    <>
      <Header />
      <MainLayout>
        <InvitedWishesPageContainer />
      </MainLayout>
    </>
  );
}
