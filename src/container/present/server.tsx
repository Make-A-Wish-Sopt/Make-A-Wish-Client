'use client';

import Box from '@/components/Common/Box';
import { colors } from '@/styles/styles';
import { UploadImageBox } from '@/components/UI/UploadImageBox';
import { PresentItemType } from '@/constant/presentList';
import { convertMoneyText } from '@/utils/common/convertMoneyText';
import Image from 'next/image';
import { useGetPublicWishes } from '@/hooks/queries/public';
import { useRouter } from 'next/navigation';

export function MessageFromWisheMaker() {
  const { publicWishesData } = useGetPublicWishes();

  //

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
        <UploadImageBox preSignedImageUrl={''} />
      </div>
    </>
  );
}

export function CheckPresentItem({ item }: { item?: PresentItemType }) {
  return (
    <div className="flex flex-col items-center">
      <h3 className="font-bitbit text-main_blue text-[24px] mt-33 whitespace-pre-line">
        주문 확인 내역
      </h3>

      {/* <span className="font-bitbit text-center text-white text-[24px] mt-33 whitespace-pre-line">
        {`${item.itemName} ${convertMoneyText(item.price.toString())}원을\n선물하시겠어요?`}
      </span>

      <div>
        <Image src={item.image} alt="선택한 선물 이미지" />
      </div> */}
    </div>
  );
}
