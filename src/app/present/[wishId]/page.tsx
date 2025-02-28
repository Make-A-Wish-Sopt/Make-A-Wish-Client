import { getPublicWishes } from '@/api/public';
import ErrorPage from '@/app/error';
import Header from '@/components/Common/Hedaer';
import GivePresentPageContainer from '@/domain/present/[wishId]/container';
import MainLayout from '@/layouts/MainLayout';
import { DefaultResponseType, PublicWishesDataType } from '@/types/api/response';

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
  const publicProgressWishes = await getPublicWishes(params.wishId);

  if (!publicProgressWishes.success) {
    const errorResonse = publicProgressWishes.data as DefaultResponseType;
    return <ErrorPage alertMessage={`${errorResonse.message}`} />;
  }

  const publicWishesData = publicProgressWishes.data as PublicWishesDataType;

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
