import { getPublicWishes } from '@/api/public';
import ErrorPage from '@/app/error';
import Header from '@/components/Common/Hedaer';
import GivePresentPageContainer from '@/domain/present/container';
import { MessageFromWisheMaker } from '@/domain/present/service';
import MainLayout from '@/layouts/MainLayout';

export type PresentStepType = 'present' | 'payment' | 'done';

export default async function GivePresentPage({
  params,
  searchParams,
}: {
  params: { wishId: string };
  searchParams: { presentStep: PresentStepType; avatarCakeId?: string; presentId?: string };
}) {
  const publicWishesData = await getPublicWishes(params.wishId);

  if (!publicWishesData) {
    return <ErrorPage alertMessage="진행중인 소원링크가 존재 하지 않습니다!" />;
  }

  return (
    <>
      <Header backBtn pathTo={`/present/${params.wishId}`} />
      <MainLayout>
        <GivePresentPageContainer
          avatarCakeId={searchParams.avatarCakeId}
          step={searchParams.presentStep}
          publicWishesData={publicWishesData}
          wishId={params.wishId}
        >
          {
            {
              present: <MessageFromWisheMaker wishId={params.wishId} />,
            }[searchParams.presentStep]
          }
        </GivePresentPageContainer>
      </MainLayout>
    </>
  );
}
