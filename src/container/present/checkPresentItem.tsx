import { presentListArray } from '@/constant/model/present';
import { convertMoneyText } from '@/utils/common/convert';

export default function CheckPresentItem({
  giverName,
  presentId,
}: {
  giverName: string;
  presentId: number;
}) {
  return (
    <>
      <h3 className="font-bitbit text-main_blue text-[24px] mt-24 whitespace-pre-line">
        주문 확인 내역
      </h3>

      <span className="font-bitbit text-center text-white text-[24px] mt-10 whitespace-pre-line">
        {`${giverName}님\n${presentListArray[presentId].itemName} ${convertMoneyText(
          presentListArray[presentId].price.toString(),
        )}원을\n선물하시겠어요?`}
      </span>
    </>
  );
}
