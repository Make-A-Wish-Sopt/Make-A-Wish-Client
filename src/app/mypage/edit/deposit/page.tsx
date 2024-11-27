import { getProgressWishLinkData } from '@/api/wishes';
import Header from '@/components/Common/Hedaer';
import MainLayout from '@/layouts/MainLayout';

export default async function wisheDepositEditPage() {
  const progressWishLinkData = await getProgressWishLinkData();

  return (
    <>
      <Header backBtn />
      <MainLayout>
        {/* <WishesCreateTitleText>생일잔치 링크 수정하기</WishesCreateTitleText> */}
      </MainLayout>
    </>
  );
}
