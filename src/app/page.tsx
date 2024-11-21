import MainPageContainer from '@/domain/home/container';
import MainLayout from '@/layouts/MainLayout';

export default async function Home() {
  return (
    <MainLayout>
      <MainPageContainer />
    </MainLayout>
  );
}
