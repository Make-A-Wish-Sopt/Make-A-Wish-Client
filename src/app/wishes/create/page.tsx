import ErrorPage from '@/app/error';
import Header from '@/components/Common/Hedaer';
import WishesCreatePageContainer from '@/container/wishes/create/container';
import MainLayout from '@/layouts/MainLayout';

export type WishesCreateStepType = 'link' | 'account';

export default function WishesCreatePage({
  searchParams,
}: {
  searchParams: { step: WishesCreateStepType };
}) {
  if (searchParams.step !== 'link' && searchParams.step !== 'account') {
    return <ErrorPage />;
  }
  return (
    <>
      <Header backBtn />
      <MainLayout>
        <WishesCreatePageContainer createStep={searchParams.step} />
      </MainLayout>
    </>
  );
}
