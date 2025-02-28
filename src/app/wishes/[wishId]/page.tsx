import { getPublicWishes } from '@/api/public';
import ErrorPage from '@/app/error';
import Header from '@/components/Common/Hedaer';
import { WishesIdLayoutWithContent } from '@/domain/wishes/[id]/component';
import WishesIdPageContainer from '@/domain/wishes/[id]/container';
import MainLayout from '@/layouts/MainLayout';
import { DefaultResponseType } from '@/types/api/response';

export default async function WishesIdPage({ params }: { params: { wishId: string } }) {
  const { wishId } = params;

  const publicProgressWishes = await getPublicWishes(wishId);

  if (!publicProgressWishes.success) {
    const errorResonse = publicProgressWishes.data as DefaultResponseType;
    return <ErrorPage alertMessage={`${errorResonse.message}`} />;
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
