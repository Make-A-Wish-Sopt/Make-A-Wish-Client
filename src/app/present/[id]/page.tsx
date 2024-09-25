import Header from '@/components/Common/Hedaer';
import GivePresentPageContainer from '@/container/present/container';
import MainLayout from '@/layouts/MainLayout';

export default function GivePresentPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { avatarCakeId: string };
}) {
  return (
    <>
      <Header backBtn />
      <MainLayout>
        <GivePresentPageContainer wishId={params.id} avatarCakeId={searchParams.avatarCakeId} />
      </MainLayout>
    </>
  );
}
