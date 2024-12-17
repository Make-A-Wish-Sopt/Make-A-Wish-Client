'use client';

import { ReceivedCakeTreeMessageDataType } from '@/constant/model/cakesTreeData';
import { CakeTree, SaveCakeMessageModal } from '@/domain/wishes/component';
import useToggle from '@/hooks/common/useToggle';
import { WishesHistoryType } from '@/types/api/response';
import { defineCakeTree } from '@/utils/common/defineCakeTree';
import { convertDateToString } from '@/utils/common/getDate';
import { useEffect, useState } from 'react';

export default function WishesHistoryMessageTreePageContainer({
  wishesHistory,
  nickname,
}: {
  wishesHistory: WishesHistoryType;
  nickname: string;
}) {
  const { startAt, endAt } = wishesHistory;
  const len = 1;

  const defineCake = defineCakeTree([]);

  const [cakePresentMessageData, setCakePresentMessageData] =
    useState<ReceivedCakeTreeMessageDataType | null>(null);

  const { state: cakeMessageModalState, handleState: handleChangeCakeMessageModalState } =
    useToggle();

  const { state: isLoading, changeState: changeIsLoading } = useToggle();

  useEffect(() => {
    setTimeout(() => {
      changeIsLoading(false);
    }, 500);
  }, [cakePresentMessageData]);

  function handleSelectCake(cake: ReceivedCakeTreeMessageDataType) {
    changeIsLoading(true);
    setCakePresentMessageData({
      ...cake,
    });
    handleChangeCakeMessageModalState();
  }

  return (
    <section className="flex flex-col items-center ">
      <span className="mt-30 font-galmuri text-[16px] text-gray1">{`${startAt.split('T')[0]} ~ ${endAt.split('T')[0]}`}</span>
      <span className="font-bitbit text-[24px] text-white mt-10 whitespace-pre-line text-center">{`${nickname}님의 생일잔치에\n도착했던 케이크들이에요!`}</span>

      <CakeTree cakeList={defineCake} handleSelectCake={handleSelectCake} />

      {cakePresentMessageData && (
        <SaveCakeMessageModal
          modalState={cakeMessageModalState}
          handleModalState={handleChangeCakeMessageModalState}
          receivedCakeMessageData={cakePresentMessageData}
          nickName={nickname}
          isLoading={isLoading}
        />
      )}
    </section>
  );
}
