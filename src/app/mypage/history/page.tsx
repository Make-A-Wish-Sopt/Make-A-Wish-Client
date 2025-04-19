import React from 'react';
import { getWishes } from '@/api/wishes';
import Header from '@/components/Elements/Header';
import StepTitle from '@/components/UI/StepTitle';
import MainLayout from '@/layouts/MainLayout';
import BackButton from '@/components/Elements/Button/BackButton';
import { WishesHistoryList } from './_components/clinet';
import Image from 'next/image';
import { EmptyWishesCakeImg } from '@public/assets/images';
import Button from '@/components/Elements/Button';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const wishesHistory = await getWishes();

  if (!wishesHistory || wishesHistory.length === 0) {
    return (
      <MainLayout Header={<Header leftMenu={<BackButton routePath="/mypage" />} />}>
        <StepTitle title="지난 생일잔치 링크 모음" />
        <div className="flex flex-col items-center">
          <Image
            className="mt-91"
            src={EmptyWishesCakeImg}
            alt="생일잔치정보가 존재하지 않을 경우 케이크 이미지"
            width={293}
          />
          <Link href="/wishes">
            <Button>생일잔치 링크 생성하기</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return <WishesHistoryList wishesHistory={wishesHistory} />;
}
