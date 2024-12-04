import ErrorPage from '@/app/error';
import Header from '@/components/Common/Hedaer';
import WisheDepositEditPageContainer from '@/domain/mypage/edit/deposit/container';
import { WishesCreateTitleText } from '@/domain/wishes/create/component';
import MainLayout from '@/layouts/MainLayout';

const WishesDepositEditSteps = ['select', 'kakaopay', 'account'] as const;
export type WishesDepositEditStepsType = (typeof WishesDepositEditSteps)[number];

export default async function WisheDepositEditPage({
  searchParams,
}: {
  searchParams: { step: WishesDepositEditStepsType };
}) {
  if (!WishesDepositEditSteps.includes(searchParams.step)) {
    return (
      <ErrorPage
        alertMessage="잘못된 경로로 접근했어요!"
        btnMessage="뒤로가기"
        routePath="/mypage"
      />
    );
  }

  return (
    <>
      <Header backBtn />
      <MainLayout checkLoggedIn>
        <WisheDepositEditPageContainer step={searchParams.step}>
          {
            {
              select: <WishesCreateTitleText>현금 입금 방식 변경하기</WishesCreateTitleText>,
              kakaopay: (
                <>
                  <WishesCreateTitleText>카카오페이 송금코드 가져오기</WishesCreateTitleText>,
                </>
              ),
              account: <></>,
            }[searchParams.step]
          }
        </WisheDepositEditPageContainer>
      </MainLayout>
    </>
  );
}
