'use client';

import Box from '@/components/Common/Box';
import { colors } from '@/styles/styles';
import { UploadImageBox } from '@/components/UI/UploadImageBox';
import { useGetPublicWishes } from '@/hooks/queries/public';

export function MessageFromWisheMaker({ wishId }: { wishId: string }) {
  const { publicWishesData } = useGetPublicWishes(wishId);

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

      <Box
        bgColor="background"
        fontColor="gray1"
        font="galmuri"
        styles={{
          height: 'auto',
          minHeight: '5rem',
          padding: '1.2rem',
          margin: '2rem 0',
          border: `1px solid ${colors.dark_green}`,
        }}
      >
        <span className="text-[14px] text-gray1">{publicWishesData?.hint}</span>
      </Box>

      {/* 이미지값 넣어줘야해요! */}
      <div className="mb-30">
        <UploadImageBox imageURL={''} />
      </div>
    </>
  );
}
