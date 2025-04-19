import React from 'react';
import { getCakesResult } from '@/api/cakes';
import { getSingleWishInfo } from '@/api/wishes';
import { CakePresentList } from '@/app/wishes/_components/CakePresentList';
import Header, { MypageButton } from '@/components/Elements/Header';
import MainLayout from '@/layouts/MainLayout';
import { getLoginUserCookiesData } from '@/utils/cookies';
import defineCakeTree from '@/utils/defineCakeTree';

export default async function Page({ params }: { params: { historyId: string } }) {
  const { historyId } = params;

  const wishesHistory = await getSingleWishInfo(historyId);
  const loginUserData = await getLoginUserCookiesData();
  const receivedCakeList = await getCakesResult(historyId);
  const cakeList = defineCakeTree(receivedCakeList);

  const { startAt, endAt } = wishesHistory;

  return (
    <MainLayout Header={<Header rightMenu={<MypageButton />} />}>
      <section className="flex flex-col items-center ">
        <span className="mt-30 font-galmuri text-[16px] text-gray1">{`${startAt.split('T')[0]} ~ ${endAt.split('T')[0]}`}</span>
        <span className="font-bitbit text-[24px] text-white mt-10 whitespace-pre-line text-center">{`${loginUserData.nickName}님의 생일잔치에\n도착했던 케이크들이에요!`}</span>
        <CakePresentList cakeList={cakeList} nickName={loginUserData.nickName} wishId={historyId} />
      </section>
    </MainLayout>
  );
}
