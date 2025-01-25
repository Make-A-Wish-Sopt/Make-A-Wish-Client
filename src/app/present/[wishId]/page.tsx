import { getPublicWishes } from '@/api/public';
import ErrorPage from '@/app/error';
import Header from '@/components/Common/Hedaer';
import GivePresentPageContainer from '@/domain/present/[wishId]/container';
import MainLayout from '@/layouts/MainLayout';

export type PresentStepType = 'present' | 'payment' | 'done';
export type PaymentType = 'kakaopay' | 'account';

export default async function GivePresentPage({
  params,
  searchParams,
}: {
  params: { wishId: string };
  searchParams: {
    presentStep: PresentStepType;
    avatarCakeId?: string;
    presentId?: string;
  };
}) {
  const publicWishesData = await getPublicWishes(params.wishId);

  if (publicWishesData === 'done') {
    return <ErrorPage alertMessage={`이미 종료된 생일잔치에요!`} />;
  }

  if (!publicWishesData) {
    return <ErrorPage alertMessage="해당 생일잔치는 존재하지 않아요!" />;
  }

  return (
    <>
      <Header
        backBtn
        routePath={searchParams.presentStep === 'done' ? `/wishes/${params.wishId}` : undefined}
      />
      <MainLayout>
        <GivePresentPageContainer
          avatarCakeId={searchParams.avatarCakeId}
          step={searchParams.presentStep}
          publicWishesData={publicWishesData}
          wishId={params.wishId}
        />
      </MainLayout>
    </>
  );
}
