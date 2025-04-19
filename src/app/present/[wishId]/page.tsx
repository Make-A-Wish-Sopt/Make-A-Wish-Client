import { getPublicWishes } from '@/api/public';
import ErrorPage from '@/app/error';
import { Step } from '@/components/Modules/Funnel';
import MainLayout from '@/layouts/MainLayout';
import { PresentFunnelStep } from '@/constant/funnelStep';
import FunnelContainer from '@/app/_components/FunnelContainer';
import Header from '@/components/Elements/Header';
import dynamic from 'next/dynamic';
import { DefaultResponseType, PublicWishesDataType } from '@/types/api/response';
import BackButton from '@/components/Elements/Button/BackButton';
import AlimTalkMessageButton from '@/app/wishes/_components/AlimTalckButton';
import { CloseBlueIc } from '@public/assets/icons';
import Link from 'next/link';
import Image from 'next/image';
import WishInfoForGiver from './components/PresentForm.Server';
import PresentForm from './components/PresentForm';

const DynamicPaymentForm = dynamic(() => import('./components/PaymentForm'));
const DynamicCompleteForm = dynamic(() => import('./components/CompleteForm'));

export default async function GivePresentPage({ params }: { params: { wishId: string } }) {
  const publicProgressWishes = await getPublicWishes(params.wishId);

  if (!publicProgressWishes.success) {
    const errorResonse = publicProgressWishes.data as DefaultResponseType;
    return <ErrorPage alertMessage={`${errorResonse.message}`} />;
  }

  const publicWishesData = publicProgressWishes?.data as PublicWishesDataType;

  const { title, presentImageUrl, hint, transferInfo, nickname, wantsGift } = publicWishesData;

  return (
    <FunnelContainer steps={PresentFunnelStep}>
      <Step name="present">
        <MainLayout Header={<Header leftMenu={<BackButton />} />}>
          <WishInfoForGiver
            생일잔치제목={title}
            친구가남긴이미지={presentImageUrl}
            친구가남긴메세지={hint}
          />
          <Step.FormSection className="flex flex-col mb-24">
            <PresentForm wantsGift={wantsGift} />
          </Step.FormSection>
        </MainLayout>
      </Step>

      <Step name="payment">
        <MainLayout>
          <Step.FormSection className="flex flex-col mb-24">
            <DynamicPaymentForm transferInfo={transferInfo} nickname={nickname} />
          </Step.FormSection>
        </MainLayout>
      </Step>

      <Step name="complete">
        <MainLayout
          Header={
            <Header
              rightMenu={
                <button type="button">
                  <Link href="/">
                    <Image src={CloseBlueIc} alt="홈으로 돌아가기" />
                  </Link>
                </button>
              }
            />
          }
        >
          <Step.FormSection>
            <DynamicCompleteForm nickName={nickname} />
          </Step.FormSection>

          <Step.ButtonWrapper fixedBottom className="z-30">
            <AlimTalkMessageButton
              buttonText="제 생일에도 써볼래요!"
              buttonColor="main_blue"
              fontColor="black"
            />
          </Step.ButtonWrapper>
        </MainLayout>
      </Step>
    </FunnelContainer>
  );
}
