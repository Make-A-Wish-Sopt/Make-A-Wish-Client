import Box from '@/components/Common/Box';
import { colors } from '@/styles/styles';
import { UploadImageBox } from '@/components/UI/UploadImageBox';
import PresentForm from './client';
import { PresentItemType } from '@/constant/presentList';
import { convertMoneyText } from '@/utils/common/convertMoneyText';
import Image from 'next/image';

export default function PresentContainer() {
  return <PresentForm />;
}

export function MessageFromWisheMaker() {
  // const { publicWishesData } = useGetPublicWishes(wishesId);

  const publicWishesData: any = {
    accountNumber: '3521010484343',
    bank: '농협은행',
    name: '홍명헌',
    dayCount: 5,
    title: '안녕하세요',
    hint: '힌트',
    wishesType: true,
  };

  return (
    <>
      <h3 className="font-bitbit text-main_blue text-[24px] mt-33 whitespace-pre-line">
        {publicWishesData?.title}
      </h3>

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

export function CheckPresentItem({ item }: { item: PresentItemType }) {
  return (
    <div className="flex flex-col items-center">
      <h3 className="font-bitbit text-main_blue text-[24px] mt-33 whitespace-pre-line">
        주문 확인 내역
      </h3>

      <span className="font-bitbit text-center text-white text-[24px] mt-33 whitespace-pre-line">
        {`${item.itemName} ${convertMoneyText(item.price.toString())}원을\n선물하시겠어요?`}
      </span>

      <div>
        <Image src={item.image} alt="선택한 선물 이미지" />
      </div>
    </div>
  );
}
