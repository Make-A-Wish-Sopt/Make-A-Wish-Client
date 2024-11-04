import { getPublicWishes } from '@/api/public';
import GivePresentPageStateContainer from './client';
import Box from '@/components/Common/Box';
import { colors } from '@/styles/styles';
import { UploadImageBox } from '@/components/UI/UploadImageBox';
import { PublicWishesDataType } from '@/types/api/response';
import { PresentStepType } from '@/app/present/[id]/page';

export default async function GivePresentPageContainer({
  wishId,
  avatarCakeId,
  presentId,
  presentStep,
}: {
  wishId: string;
  avatarCakeId?: string;
  presentId?: string;
  presentStep: PresentStepType;
}) {
  const publicWishesData = await getPublicWishes(wishId);

  const account = `${publicWishesData.accountNumber} ${publicWishesData.bank}`;

  return (
    <GivePresentPageStateContainer
      wishId={wishId}
      avatarCakeId={avatarCakeId}
      wantsGift={publicWishesData.wantsGift}
      presentId={presentId}
      presentStep={presentStep}
      account={account}
    >
      {presentStep === 'present' && <MessageFromWisheMaker publicWishesData={publicWishesData} />}
    </GivePresentPageStateContainer>
  );
}

function MessageFromWisheMaker({ publicWishesData }: { publicWishesData: PublicWishesDataType }) {
  return (
    <>
      <div className="flex justify-between mt-33">
        <h3 className="font-bitbit text-main_blue text-[24px]  whitespace-pre-line">
          {publicWishesData?.title}
        </h3>

        <span className="font-bitbit text-main_blue text-[20px]  whitespace-pre-line">
          {`D-${publicWishesData?.dayCount}`}
        </span>
      </div>

      {/* 이미지값 넣어줘야해요! */}
      <div className="mt-20 mb-10">
        <UploadImageBox imageUrl={''} />
      </div>

      <Box
        bgColor="background"
        fontColor="gray1"
        font="galmuri"
        styles={{
          height: 'auto',
          minHeight: '5rem',
          padding: '1.2rem',
          marginBottom: '2rem',
          border: `1px solid ${colors.dark_green}`,
        }}
      >
        <span className="text-[14px] text-gray1">{publicWishesData?.hint}</span>
      </Box>
    </>
  );
}
