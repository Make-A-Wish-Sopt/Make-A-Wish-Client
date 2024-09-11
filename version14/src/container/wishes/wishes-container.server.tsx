import { WishesCreateBeforeCakesList, WishesCreateButton } from './wishes-continaer.client';

function WishesCreateBefore() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-right">
        <span className="text-[20px] font-bitbit text-main_blue">D-?</span>
      </div>
      <h1 className="text-[24px] font-bitbit text-white mt-10 mb-20">
        ㅇㅇ님, 친구들을 초대해
        <br /> 케이크 접시를 꾸며봐요!
      </h1>
      <WishesCreateBeforeCakesList />
      <WishesCreateButton />
    </div>
  );
}

export default function WishesContainer() {
  // 데이터 불러오기

  return (
    <>
      <WishesCreateBefore />
    </>
  );
}
