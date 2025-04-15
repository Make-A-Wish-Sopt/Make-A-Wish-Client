import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProgressWishLinkData } from '@/api/wishes';
import Header from '@/components/Elements/Header';
import BackButton from '@/components/Elements/Button/BackButton';
import MainLayout from '@/layouts/MainLayout';
import { getLoginUserCookiesData } from '@/utils/cookies';
import { MypageDefaultCakeImg } from '@public/assets/images';
import {
  CloseWishMenu,
  CSLinkMenu,
  EditSelectPaymnetMenu,
  EditWishMenu,
  MypageAuthButtons,
  MypageMenuContainer,
  PrevWishesData,
  ServiceGuideMenu,
} from './_components/client';

export default async function page() {
  const loginUserData = await getLoginUserCookiesData();

  if (!loginUserData) {
    return (
      <MainLayout Header={<Header leftMenu={<BackButton routePath="/" />} />}>
        <MypageUserName nickName="조물주" />
        <MypageMenuContainer>
          <ServiceGuideMenu />
          <CSLinkMenu />
        </MypageMenuContainer>
        <MypageAuthButtons isLoggedIn={false} />
      </MainLayout>
    );
  }

  const { nickName } = loginUserData;
  const progressWishes = await getProgressWishLinkData();

  const EditWishDisabled = !progressWishes || (progressWishes && progressWishes.status === 'END');
  const EditSelectPaymentMenuDisabled = progressWishes ? !progressWishes.wantsGift : false;

  return (
    <MainLayout Header={<Header leftMenu={<BackButton routePath="/wishes" />} />}>
      <MypageUserName nickName={nickName} />
      <MypageMenuContainer>
        <Link href="/mypage/edit/wish">
          <EditWishMenu disabled={EditWishDisabled} />
        </Link>
        <EditSelectPaymnetMenu disabled={EditSelectPaymentMenuDisabled} />
        <CloseWishMenu disabled={EditWishDisabled} />
        <Link href="/mypage/history">
          <PrevWishesData />
        </Link>
        <ServiceGuideMenu />
        <CSLinkMenu />
      </MypageMenuContainer>
      <MypageAuthButtons isLoggedIn />
    </MainLayout>
  );
}

function MypageUserName({ nickName }: { nickName: string }) {
  return (
    <div className="flex gap-10 items-center mt-11 mb-20">
      <Image
        src={MypageDefaultCakeImg}
        alt="마이페이지 기본 케이크 이미지"
        width={50}
        height={50}
      />
      <span className="font-bitbit text-[24px] text-white">{nickName}님</span>
    </div>
  );
}
