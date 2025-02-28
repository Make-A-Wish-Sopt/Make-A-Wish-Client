import Box from '@/components/Common/Box';
import { colors } from '@/styles/styles';
import { UploadImageBox } from '@/components/UI/UploadImageBox';
import { getPublicWishes } from '@/api/public';
import ErrorPage from '@/app/error';
import { DefaultResponseType, PublicWishesDataType } from '@/types/api/response';

export async function MessageFromWisheMaker({ wishId }: { wishId: string }) {
  const publicProgressWishes = await getPublicWishes(wishId);

  if (!publicProgressWishes.success) {
    const errorResonse = publicProgressWishes.data as DefaultResponseType;
    return <ErrorPage alertMessage={`${errorResonse.message}`} />;
  }

  const publicWishesData = publicProgressWishes.data as PublicWishesDataType;

  return (
    <>
      <div className="flex justify-between mt-33 mb-20">
        <h3 className="font-bitbit text-main_blue text-[24px]  whitespace-pre-line">
          {publicWishesData?.title}
        </h3>

        <span className="font-bitbit text-main_blue text-[20px]  whitespace-pre-line">
          {`D-${publicWishesData?.dayCount}`}
        </span>
      </div>

      {/* 이미지값 넣어줘야해요! */}
      <div className="flex flex-col w-full gap-10 mb-30">
        <UploadImageBox imageUrl={publicWishesData.presentImageUrl} />

        <Box
          bgColor="background"
          fontColor="gray1"
          font="galmuri"
          styles={{
            height: 'auto',
            minHeight: '5rem',
            padding: '1.2rem',
            border: `1px solid ${colors.dark_green}`,
          }}
        >
          <span className="text-[14px] text-gray1">{publicWishesData?.hint}</span>
        </Box>
      </div>
    </>
  );
}
