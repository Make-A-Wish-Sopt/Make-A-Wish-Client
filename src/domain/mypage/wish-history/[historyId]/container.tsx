'use client';

import { getCakePresentMessage } from '@/api/cakes';
import { ReceivedCakeTreeMessageDataType } from '@/constant/model/cakesTreeData';
import { CakeTree, SaveCakeMessageModal } from '@/domain/wishes/(main)/component';
import useToggle from '@/hooks/common/useToggle';
import { WishesHistoryType } from '@/types/api/response';
import { useEffect, useState } from 'react';

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

  const [cakePresentMessageData, setCakePresentMessageData] =
    useState<ReceivedCakeTreeMessageDataType | null>(null);

  const [receivedCakeMessageData, setReceivedCakeMessageData] =
    useState<ReceivedCakeTreeMessageDataType>(null);

  const cakeMessageModalState = useToggle();
  const isLoading = useToggle();

  useEffect(() => {
    if (cakePresentMessageData) {
      const { presentId, cakeImg } = cakePresentMessageData;

      isLoading.changeState(true);

      if (presentId > 0) {
        getCakePresentMessage(historyId, presentId)
          .then((response) => {
            setReceivedCakeMessageData({
              ...response,
              cakeImg: cakeImg,
              isAdminMessage: false,
              presentId: presentId,
            });
          })
          .finally(() => {
            setTimeout(() => {
              isLoading.changeState(false);
            }, 800);
          });
      } else {
        setReceivedCakeMessageData({ ...cakePresentMessageData });
        setTimeout(() => {
          isLoading.changeState(false);
        }, 800);
      }
    }
  }, [cakePresentMessageData]);

  function handleSelectCake(cake: ReceivedCakeTreeMessageDataType) {
    isLoading.changeState(true);

    setCakePresentMessageData({
      ...cake,
    });
    cakeMessageModalState.handleState();
  }

  return (
    <section className="flex flex-col items-center ">
      <span className="mt-30 font-galmuri text-[16px] text-gray1">{`${startAt.split('T')[0]} ~ ${endAt.split('T')[0]}`}</span>
      <span className="font-bitbit text-[24px] text-white mt-10 whitespace-pre-line text-center">{`${nickname}님의 생일잔치에\n도착했던 케이크들이에요!`}</span>

      <CakeTree cakeList={cakeList} handleSelectCake={handleSelectCake} />

      {receivedCakeMessageData && (
        <SaveCakeMessageModal
          modalState={cakeMessageModalState.state}
          handleModalState={cakeMessageModalState.handleState}
          receivedCakeMessageData={receivedCakeMessageData}
          nickName={nickname}
          isLoading={isLoading.state}
        />
      )}
    </section>
  );
}
