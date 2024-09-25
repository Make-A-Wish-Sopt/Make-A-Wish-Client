import Header from '@/components/Common/Hedaer';
import MainLayout from '@/layouts/MainLayout';
import MypageContainer from '@/container/mypaeg/container';

export default function Mypage() {
  return (
    <>
      <Header backBtn />
      <MainLayout>
        <MypageContainer />
      </MainLayout>
    </>
  );
}
