import { getMainProgressWishesData } from '@/api/wishes';
import ErrorPage from '@/app/error';
import Header from '@/components/Common/Hedaer';
import ShareLinkModal from '@/components/Common/Modal/ShareLinkModal';
import { WishesCreateTitleText } from '@/domain/wishes/create/component';
import WishesCreatePageContainer from '@/domain/wishes/create/container';
import {
  AccountInputWithSavedAccountData,
  CenteredContent,
  ShareWishesLinkModal,
} from '@/domain/wishes/create/service';
import WishesAccountInputForm from '@/domain/wishes/create/wishesAccountInputForm';
import WishesLinkInputForm from '@/domain/wishes/create/wishesLinkInputForm';
import MainLayout from '@/layouts/MainLayout';
import { convertDecode } from '@/utils/common/convert';

const WishesCreateSteps = ['link', 'account', 'preview', 'done'] as const;
export type WishesCreateStepType = (typeof WishesCreateSteps)[number];

export default async function WishesCreatePage({
  searchParams,
}: {
  searchParams: { step: WishesCreateStepType; wishTitle: string };
}) {
  const { step, wishTitle } = searchParams;

  if (step === 'link' && !wishTitle) {
    return <ErrorPage alertMessage="소원제목을 입력해야합니다!" />;
  }

  if (!WishesCreateSteps.includes(step as WishesCreateStepType)) {
    return <ErrorPage alertMessage="잘못된 경로 입니다!" />;
  }

  const decodeWishTitle = wishTitle ? convertDecode(wishTitle) : undefined;

  return (
    <>
      <Header backBtn pathTo="/wishes" />
      <MainLayout>
        <WishesCreatePageContainer step={step} wishTitle={decodeWishTitle}>
          {
            {
              link: (
                <>
                  <WishesCreateTitleText>생일잔치 링크 생성하기</WishesCreateTitleText>
                </>
              ),
              account: (
                <>
                  <WishesCreateTitleText>입금받을 계좌 입력하기</WishesCreateTitleText>
                  <AccountInputWithSavedAccountData />
                </>
              ),
              done: (
                <>
                  <CenteredContent />,
                  <ShareWishesLinkModal />
                </>
              ),
            }[step]
          }
        </WishesCreatePageContainer>
      </MainLayout>
    </>
  );
}
