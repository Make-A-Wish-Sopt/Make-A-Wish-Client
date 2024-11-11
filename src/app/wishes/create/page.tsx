import { getMainProgressWishesData } from '@/api/wishes';
import ErrorPage from '@/app/error';
import Header from '@/components/Common/Hedaer';
import WishesCreatePageContainer from '@/domain/wishes/create/container';
import { CenteredContent } from '@/domain/wishes/create/service';
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
        <WishesCreatePageContainer createStep={searchParams.step} wishTitle={decodeWishTitle}>
          {
            {
              done: <CenteredContent />,
            }[step]
          }
        </WishesCreatePageContainer>
      </MainLayout>
    </>
  );
}
