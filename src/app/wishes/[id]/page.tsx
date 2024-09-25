import Header from '@/components/Common/Hedaer';
import WishesInviteContainer from '@/container/wishes/[id]/server';
import MainLayout from '@/layouts/MainLayout';

export default function WishesInvitePage() {
  return (
    <>
      <Header />
      <MainLayout>
        <WishesInviteContainer />
      </MainLayout>
    </>
  );
}
