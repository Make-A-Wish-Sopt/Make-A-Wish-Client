import Header from '@/components/Common/Hedaer';
import InvitedWishesPageContainer from '@/container/wishes/[id]/container';
import MainLayout from '@/layouts/MainLayout';

export default function InvitedWishesPage() {
  return (
    <>
      <Header />
      <MainLayout>
        <InvitedWishesPageContainer />
      </MainLayout>
    </>
  );
}
