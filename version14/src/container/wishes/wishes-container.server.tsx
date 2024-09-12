import {
  WishesCreateBeforeCakesList,
  WishesCreateBeforeCakesMessage,
  WishesCreateButton,
} from './wishes-continaer.client';

function WishesCreateBefore() {
  return (
    <>
      <div className="w-full text-right px-5 mt-8">
        <span className="text-[20px] font-bitbit text-main_blue">D-?</span>
      </div>
      <div className="flex flex-col items-center">
        <WishesCreateBeforeCakesMessage />
        <WishesCreateBeforeCakesList />
        <WishesCreateButton />
        <div className="fixed bottom-0 w-full h-170 bg-[linear-gradient(180deg,_rgba(4,6,31,0)_0%,_rgba(4,6,31,1)_100%)]"></div>
        <div className="w-full h-300 bg-[linear-gradient(180deg,_rgba(4,6,31,0)_0%,_rgba(4,6,31,1)_100%)]"></div>
      </div>
    </>
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
