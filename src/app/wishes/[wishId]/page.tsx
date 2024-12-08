import { getPublicWishes } from '@/api/public';
import ErrorPage from '@/app/error';
import { WishesIdLayoutWithContent } from '@/domain/wishes/[id]/component';
import WishesIdPageContainer from '@/domain/wishes/[id]/container';
import MainLayout from '@/layouts/MainLayout';

export default async function WishesIdPage({ params }: { params: { wishId: string } }) {
  const { wishId } = params;
  const publicProgressWishes = await getPublicWishes(wishId);

  if (!publicProgressWishes) {
    return <ErrorPage alertMessage="해당 소원은 존재하지 않아요!" />;
  }

  return (
    <>
      <MainLayout>
        <WishesIdPageContainer wishId={wishId}>
          <WishesIdLayoutWithContent />
        </WishesIdPageContainer>
      </MainLayout>
    </>
  );
}
