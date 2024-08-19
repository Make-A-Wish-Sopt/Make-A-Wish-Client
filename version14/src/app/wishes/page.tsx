import MainLayout from '@/layouts/MainLayout';
import Header from '@/components/Common/Hedaer';
import { MainContent, WishesMessage } from './components/server';

export default function WishesPage() {
  return (
    <>
      <Header menuBtn />
      <MainLayout>
        <WishesMessage />
        <MainContent />
      </MainLayout>
    </>
  );
}
