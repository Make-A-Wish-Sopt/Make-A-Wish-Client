import { WishesCreateStepType } from '@/app/wishes/create/page';
import WishesCreatePageStateContainer from './client';
import Image from 'next/image';
import { WishesFormPresentIc } from '../../../../public/assets/icons';
import { getUserAccount } from '@/api/user';
import { checkComp } from '@/utils/common/checkComponent';

export default async function WishesCreatePageContainer({
  createStep,
  wishTitle,
}: {
  createStep: WishesCreateStepType;
  wishTitle: string;
}) {
  const userAccountData = await getUserAccount();

  return (
    <WishesCreatePageStateContainer
      createStep={createStep}
      wishTitle={wishTitle}
      userAccountData={userAccountData}
    >
      <div className="flex items-center gap-10 mt-26 mb-20">
        <Image src={WishesFormPresentIc} alt="선물 아이콘 이미지" />
        <h1 className="font-bitbit text-main_blue text-[24px]">
          {createStep === 'link' ? '생일잔치 링크 생성하기' : '생일선물함 생성하기'}
        </h1>
      </div>
    </WishesCreatePageStateContainer>
  );
}
