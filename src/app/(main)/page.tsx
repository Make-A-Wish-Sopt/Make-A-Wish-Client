import MypageButton from '@/components/Elements/Button/MypageButton';
import Header from '@/components/Layout/Hedaer';
import IndexPageContainer from '@/domain/(main)/container';
import { HeroSection } from '@/domain/(main)/content';
import MainLayout from '@/layouts/MainLayout';

export default async function IndexPage() {
  return (
    <MainLayout Header={<Header rightMenu={<MypageButton />} />}>
      <IndexPageContainer>
        <HeroSection />
      </IndexPageContainer>
    </MainLayout>
  );
}
