import ErrorPage from '@/app/error';
import Header from '@/components/Common/Hedaer';
import { WishesCreateTitleText } from '@/domain/wishes/create/component';
import WishesCreatePageContainer from '@/domain/wishes/create/container';
import {
  AccountInputWithSavedAccountData,
  CenteredContent,
  ShareWishesLinkModal,
} from '@/domain/wishes/create/service';
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

  if (
    (step === 'link' && !wishTitle) ||
    !WishesCreateSteps.includes(step as WishesCreateStepType)
  ) {
    return (
      <ErrorPage
        alertMessage="잘못된 소원생성 접근이에요!"
        routePath="/wishes"
        btnMessage="소원 생성하러가기"
      />
    );
  }

  const decodeWishTitle = wishTitle ? convertDecode(wishTitle) : undefined;

  return (
    <>
      <Header backBtn routePath="/wishes" />
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
