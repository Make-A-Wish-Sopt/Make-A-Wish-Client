import Box from '@/components/Elements/Box';
import { UploadImageBox } from '@/components/UI/UploadImageBox';
import { colors } from '@/styles/styles';
import React from 'react';

export const WishInfoForGiver = ({
  생일잔치제목,
  친구가남긴이미지,
  친구가남긴메세지,
}: {
  생일잔치제목: string;
  친구가남긴이미지: string;
  친구가남긴메세지: string;
}) => {
  return (
    <>
      <div className="flex justify-between mt-33 mb-20">
        <h3 className="font-bitbit text-main_blue text-[24px]  whitespace-pre-line">
          {생일잔치제목}
        </h3>

        {/* <span className="font-bitbit text-main_blue text-[20px]  whitespace-pre-wrap">
          {`D-${publicWishesData.dayCount}`}
        </span> */}
      </div>

      {/* 이미지값 넣어줘야해요! */}
      <div className="flex flex-col w-full gap-10 mb-30">
        <UploadImageBox imageUrl={친구가남긴이미지} />

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
          <span className="text-[14px] text-gray1">{친구가남긴메세지}</span>
        </Box>
      </div>
    </>
  );
};
