import Header from '@/components/Common/Hedaer';
import GivePresentPageContainer from '@/container/present/container';
import MainLayout from '@/layouts/MainLayout';

export type PresentStepType = 'present' | 'payment';

export default async function GivePresentPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { presentStep: PresentStepType; avatarCakeId?: string; presentId?: string };
}) {
  return (
    <>
      <Header backBtn />
      <MainLayout>
        <GivePresentPageContainer
          wishId={params.id}
          avatarCakeId={searchParams.avatarCakeId}
          presentId={searchParams.presentId}
          presentStep={searchParams.presentStep}
        />
      </MainLayout>
    </>
  );
}
