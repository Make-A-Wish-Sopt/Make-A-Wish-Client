import Header from '@/components/Common/Hedaer';
import WishesEditPageContainer from '@/container/mypaeg/wishes/edit/container';
import MainLayout from '@/layouts/MainLayout';

export default async function wishesEditPage() {
  return (
    <>
      <Header backBtn />
      <MainLayout>
        <WishesEditPageContainer />
      </MainLayout>
    </>
  );
}
