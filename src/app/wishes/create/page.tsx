import ErrorPage from '@/app/error';
import Loading from '@/app/loading';
import Header from '@/components/Common/Hedaer';
import WishesCreatePageContainer from '@/container/wishes/create/container';
import MainLayout from '@/layouts/MainLayout';
import { convertDecode } from '@/utils/common/convert';
import { Suspense } from 'react';

export type WishesCreateStepType = 'link' | 'account';

export default function WishesCreatePage({
  searchParams,
}: {
  searchParams: { step: WishesCreateStepType; wishTitle: string };
}) {
  const { step, wishTitle } = searchParams;

  if ((step !== 'link' && step !== 'account') || wishTitle === '') {
    return <ErrorPage />;
  }

  const decodeWishTitle = convertDecode(wishTitle);

  return (
    <Suspense fallback={<Loading />}>
      <Header backBtn pathTo="/wishes" />
      <MainLayout>
        <WishesCreatePageContainer createStep={searchParams.step} wishTitle={decodeWishTitle} />
      </MainLayout>
    </Suspense>
  );
}
