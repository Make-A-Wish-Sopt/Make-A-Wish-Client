import { getProgressWishLinkData } from '@/api/wishes';
import Header from '@/components/Common/Hedaer';
import WishesEditPageContainer from '@/domain/mypage/edit/link/container';
import { WishesCreateTitleText } from '@/domain/wishes/create/component';
import MainLayout from '@/layouts/MainLayout';

export default async function wisheLinkEditPage() {
  const progressWishLinkData = await getProgressWishLinkData();

  const { status, ...progressWishesData } = progressWishLinkData;

  return (
    <>
      <Header backBtn />
      <MainLayout>
        <WishesEditPageContainer progressWishesData={progressWishesData}>
          <WishesCreateTitleText>생일잔치 링크 수정하기</WishesCreateTitleText>
        </WishesEditPageContainer>
      </MainLayout>
    </>
  );
}
