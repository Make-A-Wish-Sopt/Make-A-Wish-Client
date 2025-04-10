import { presentListArray } from '@/constant/model/present';
import Image from 'next/image';
import convertMoneyText from '@/utils/regex';

export function PresentList() {
  return (
    <div className="grid grid-cols-3 gap-6 w-full">
      {presentListArray.map((item) => (
        <div
          className={`flex flex-col items-center p-9 font-bitbit rounded-xl text-[12px] `}
          style={{ backgroundColor: '#08232B' }}
          key={item.id}
        >
          <Image src={item.image} alt="선물 이미지" width={56} />
          <span className="opacity-70">{item.itemName}</span>
          <span className="opacity-70">{convertMoneyText(item.price.toString())}원</span>
        </div>
      ))}
    </div>
  );
}

export default function DropDownPresentList() {
  return (
    <div className="w-full px-10 pb-12">
      <div className="w-full  bg-background  px-12 py-14 rounded-xl">
        <span className="font-galmuri text-gray2 text-[14px]">
          현금으로 선물 받을 수 있는 항목이에요
        </span>
        <div className="w-full my-10 p-10 font-galmuri text-gray2 text-[12px] rounded-xl border border-dark_green">
          ※ 친구가 보게 될 화면이에요!
          <br />
          6개 중 하나를 선택해 선물할 수 있어요
        </div>

        <PresentList />
      </div>
    </div>
  );
}
