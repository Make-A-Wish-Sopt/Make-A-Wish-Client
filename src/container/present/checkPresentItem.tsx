import { PresentItemType, presentList } from '@/constant/model/present';
import { convertMoneyText } from '@/utils/common/convert';
import Image from 'next/image';

export default function CheckPresentItem({ presentId }: { presentId: number }) {
  return (
    <div className="flex flex-col items-center">
      <h3 className="font-bitbit text-main_blue text-[24px] mt-33 whitespace-pre-line">
        주문 확인 내역
      </h3>

      <span className="font-bitbit text-center text-white text-[24px] mt-33 whitespace-pre-line">
        {`${presentList[presentId].itemName} ${convertMoneyText(
          presentList[presentId].price.toString(),
        )}원을\n선물하시겠어요?`}
      </span>

      <div>
        <Image src={presentList[presentId].image} alt="선택한 선물 이미지" />
      </div>
    </div>
  );
}
