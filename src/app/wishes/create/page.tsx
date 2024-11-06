import ErrorPage from '@/app/error';
import Header from '@/components/Common/Hedaer';
import WishesCreatePageContainer from '@/domain/wishes/create/container';
import MainLayout from '@/layouts/MainLayout';
import { convertDecode } from '@/utils/common/convert';

export type WishesCreateStepType = 'link' | 'account';

export default async function WishesCreatePage({
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
    <>
      <Header backBtn pathTo="/wishes" />
      <MainLayout>
        <WishesCreatePageContainer createStep={searchParams.step} wishTitle={decodeWishTitle} />
      </MainLayout>
    </>
  );
}
