import ErrorPage from '@/app/error';
import Header from '@/components/Common/Hedaer';
import { WishesCreateTitleText } from '@/domain/wishes/create/component';
import WishesCreatePageContainer from '@/domain/wishes/create/container';
import { AccountInputWithSavedAccountData, WishesCreateSuccess } from '@/domain/wishes/create/service';
import MainLayout from '@/layouts/MainLayout';
import { convertDecode } from '@/utils/common/convert';
import { getLoginUserCookiesData } from '@/utils/common/cookies';

const WishesCreateSteps = ['link', 'select', 'kakaopay', 'account', 'preview', 'done'] as const;
export type WishesCreateStepType = (typeof WishesCreateSteps)[number];

export default async function WishesCreatePage({
  searchParams,
}: {
  searchParams: { step: WishesCreateStepType; wishTitle: string };
}) {
  const { step, wishTitle } = searchParams;
  const loginUserData = await getLoginUserCookiesData();

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
      <MainLayout checkLoggedIn>
        <WishesCreatePageContainer step={step} wishTitle={decodeWishTitle}>
          {
            {
              link: (
                <>
                  <WishesCreateTitleText>생일잔치 링크 생성하기</WishesCreateTitleText>
                </>
              ),
              select: (
                <>
                  <WishesCreateTitleText>현금 입금 방식 선택하기</WishesCreateTitleText>
                </>
              ),
              kakaopay: (
                <>
                  <WishesCreateTitleText>카카오페이 송금코드 가져오기</WishesCreateTitleText>
                </>
              ),
              preview: (
                <>
                  <h1 className="font-bitbit text-main_blue text-center text-[24px] mt-26 mb-20">{`${loginUserData.nickName}님의 생일잔치`}</h1>
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
                  <WishesCreateSuccess />,
                </>
              ),
            }[step]
          }
        </WishesCreatePageContainer>
      </MainLayout>
    </>
  );
}
