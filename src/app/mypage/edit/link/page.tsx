import { getProgressWishLinkData } from '@/api/wishes';
import ErrorPage from '@/app/error';
import Header, { BackButton } from '@/components/Common/Hedaer';
import WisheLinkEditPageContainer from '@/domain/mypage/edit/link/container';
import { WishesCreateTitleText } from '@/domain/wishes/create/component';
import MainLayout from '@/layouts/MainLayout';

export default async function WisheLinkEditPage() {
  const progressWishLinkData = await getProgressWishLinkData();

  if (!progressWishLinkData) {
    return <ErrorPage alertMessage="진행중인 소원이 존재하지 않아요!" btnMessage="뒤로 돌아가기" />;
  }

  const { status, ...progressWishesData } = progressWishLinkData;

  return (
    <>
      <Header leftMenu={<BackButton routePath="/" />} />
      <MainLayout>
        <WisheLinkEditPageContainer
          progressWishesData={progressWishesData}
          wishesProgressStatus={status}
        >
          <WishesCreateTitleText>생일잔치 링크 수정하기</WishesCreateTitleText>
        </WisheLinkEditPageContainer>
      </MainLayout>
    </>
  );
}
