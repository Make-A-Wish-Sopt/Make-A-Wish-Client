import { getProgressWishLinkData } from '@/api/wishes';
import ErrorPage from '@/app/error';
import Header from '@/components/Elements/Header';
import MainLayout from '@/layouts/MainLayout';
import React from 'react';
import { Step } from '@/components/Modules/Funnel';
import StepTitle from '@/components/UI/StepTitle';
import BackButton from '@/components/Elements/Button/BackButton';
import { WishEditForm, WisheEditFormFormProvider } from './_components/client';

export default async function Page() {
  const progressWishLinkData = await getProgressWishLinkData();

  if (!progressWishLinkData) {
    return (
      <ErrorPage alertMessage="진행중인 생일잔치가 존재하지 않아요!" btnMessage="뒤로 돌아가기" />
    );
  }

  const { status, transferInfo, ...progressWishesData } = progressWishLinkData;

  return (
    <MainLayout Header={<Header leftMenu={<BackButton routePath="/mypage" />} />}>
      <WisheEditFormFormProvider progressWishesData={progressWishesData}>
        <StepTitle title="생일잔치 링크 수정하기" />
        <Step.FormSection className="flex flex-col gap-12 mb-24">
          <WishEditForm wishStatus={status} transferInfo={transferInfo} />
        </Step.FormSection>
      </WisheEditFormFormProvider>
    </MainLayout>
  );
}
