'use client';

import { CakePresentList } from '@/app/wishes/_components/CakePresentList';
import { ReceivedCakeTreeMessageDataType } from '@/constant/model/cakesTreeData';
import { WishesHistoryType } from '@/types/api/response';

export default function WishesHistoryMessageTreePageContainer({
  wishesHistory,
  nickname,
  cakeList,
  historyId,
}: {
  wishesHistory: WishesHistoryType;
  nickname: string;
  cakeList: ReceivedCakeTreeMessageDataType[];
  historyId: string;
}) {
  const { startAt, endAt } = wishesHistory;

  return (
    <section className="flex flex-col items-center ">
      <span className="mt-30 font-galmuri text-[16px] text-gray1">{`${startAt.split('T')[0]} ~ ${endAt.split('T')[0]}`}</span>
      <span className="font-bitbit text-[24px] text-white mt-10 whitespace-pre-line text-center">{`${nickname}님의 생일잔치에\n도착했던 케이크들이에요!`}</span>

      <CakePresentList cakeList={cakeList} nickName={nickname} wishId={historyId} />
    </section>
  );
}
