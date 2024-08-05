import MainLayout from '@/layouts/MainLayout';
import Header from '@/components/Common/Hedaer';
import { MainContent, WishesMessage } from './components/server';
import FixedBottomButton from '@/components/Common/Button/FixedBottomButton';

export default function WishesPage() {
  return (
    <>
      <Header menuBtn />
      <MainLayout>
        <WishesMessage />
        <MainContent />
        <FixedBottomButton color="mainBlue_white" routePath="/wishes/create">
          소원링크 생성하기
        </FixedBottomButton>
      </MainLayout>
    </>
  );
}
