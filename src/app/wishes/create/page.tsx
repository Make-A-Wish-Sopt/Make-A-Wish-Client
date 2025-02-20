import ErrorPage from '@/app/error';
import Header from '@/components/Common/Hedaer';
import { WishesCreateTitleText } from '@/domain/wishes/create/component';
import WishesCreatePageContainer from '@/domain/wishes/create/container';
import { WishesCreateSuccess } from '@/domain/wishes/create/service';
import MainLayout from '@/layouts/MainLayout';

const WishesCreateSteps = ['link', 'select', 'kakaopay', 'account', 'done', 'try'] as const;
export type WishesCreateStepType = (typeof WishesCreateSteps)[number];

export default async function WishesCreatePage({
  searchParams,
}: {
  searchParams: { step: WishesCreateStepType; wishTitle: string; wishId: string };
}) {
  const { step, wishTitle, wishId } = searchParams;

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

  return (
    <>
      <Header backBtn={step !== 'done'} routePath="/wishes" />
      <MainLayout checkLoggedIn>
        <WishesCreatePageContainer step={step} wishTitle={wishTitle} wishId={wishId}>
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
                  <WishesCreateTitleText>카카오톡 송금코드 가져오기</WishesCreateTitleText>
                </>
              ),
              account: (
                <>
                  <WishesCreateTitleText>입금받을 계좌 입력하기</WishesCreateTitleText>
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
