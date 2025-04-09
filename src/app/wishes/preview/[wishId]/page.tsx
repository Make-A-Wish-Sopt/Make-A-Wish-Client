import { getProgressWishLinkData } from '@/api/wishes';
import { FunnelContainer } from '@/app/_components/FunnelContainer';
import ErrorPage from '@/app/error';
import { WishInfoForGiver } from '@/app/present/[wishId]/components/PresentForm.Server';
import { BackButton } from '@/components/Elements/Button/BackButton';
import Header, { IconRouteButton } from '@/components/Elements/Header';
import { Step } from '@/components/Modules/Funnel';
import { PreviewFunnelStep } from '@/constant/funnelStep';
import MainLayout from '@/layouts/MainLayout';
import { getLoginUserCookiesData } from '@/utils/common/cookies';
import React from 'react';
import { PreviewPresentForm } from './_components/client';
import CompleteForm from '@/app/present/[wishId]/components/CompleteForm';
import { ShareWishesButton } from '../../_components/ShareWishesButtonWithModal';
import Image from 'next/image';
import { CloseBlueIc } from '@public/assets/icons';

const page = async ({ params }: { params: { wishId: string } }) => {
  const progressWishesData = await getProgressWishLinkData();

  const { nickName } = await getLoginUserCookiesData();
  if (!progressWishesData) {
    return <ErrorPage alertMessage="진행중인 생일잔치이 없어요!" errorText={'OPPS...'} />;
  }

  return (
    <FunnelContainer steps={PreviewFunnelStep}>
      <Step name="present">
        <MainLayout Header={<Header leftMenu={<BackButton />} />}>
          <WishInfoForGiver
            생일잔치제목={'생일잔치 미리 체험하기'}
            친구가남긴이미지={progressWishesData?.imageUrl}
            친구가남긴메세지={progressWishesData?.hint}
          />
          <Step.FormSection className="flex flex-col mb-24">
            <PreviewPresentForm />
          </Step.FormSection>
        </MainLayout>
      </Step>

      <Step name="complete">
        <MainLayout
          Header={
            <Header
              rightMenu={
                <IconRouteButton
                  routePath="/wishes"
                  Icon={<Image src={CloseBlueIc} alt="아이콘 이미지" />}
                />
              }
            />
          }
        >
          <Step.FormSection>
            <CompleteForm nickName={nickName} />
          </Step.FormSection>

          <Step.ButtonWrapper fixedBottom className="z-30">
            <ShareWishesButton
              wishId={params.wishId}
              nickName={nickName}
              buttonText={'생일잔치 링크 미리 저장하기'}
            />
          </Step.ButtonWrapper>
        </MainLayout>
      </Step>
    </FunnelContainer>
  );
};

export default page;
