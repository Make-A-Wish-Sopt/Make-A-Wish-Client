import { getProgressWishLinkData } from '@/api/wishes';
import ErrorPage from '@/app/error';
import Header from '@/components/Elements/Header';
import MainLayout from '@/layouts/MainLayout';
import React from 'react';
import { WishEditForm, WisheEditFormFormProvider } from './_components/client';
import { Step } from '@/components/Modules/Funnel';
import { StepTitle } from '@/components/UI/StepTitle';
import { BackButton } from '@/components/Elements/Button/BackButton';

const page = async () => {
  const progressWishLinkData = await getProgressWishLinkData();

  if (!progressWishLinkData) {
    return <ErrorPage alertMessage="진행중인 소원이 존재하지 않아요!" btnMessage="뒤로 돌아가기" />;
  }

  const { status, ...progressWishesData } = progressWishLinkData;

  return (
    <MainLayout Header={<Header leftMenu={<BackButton routePath="/" />} />}>
      <WisheEditFormFormProvider progressWishData={progressWishesData}>
        <StepTitle title={'생일잔치 링크 수정하기'} />
        <Step.FormSection className="flex flex-col gap-12 mb-24">
          <WishEditForm wishStatus={status} />
        </Step.FormSection>
      </WisheEditFormFormProvider>
    </MainLayout>
  );
};

export default page;
