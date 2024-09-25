'use client';

import MoreBox from '@/components/UI/MoreBox';
import { usePatchProgressWishes } from '@/hooks/queries/wishes';

export function MypageMenuButtons() {
  const test = () => {};

  const { handlePatchProgressWishes } = usePatchProgressWishes();

  return (
    <ul className="flex flex-col gap-12">
      <MoreBox text="진행 중인 생일잔치 정보 수정하기" handleClick={test}></MoreBox>
      <MoreBox text="진행 중인 생일잔치 중단하기" handleClick={handlePatchProgressWishes}></MoreBox>
      <MoreBox text="지난 생일잔치 링크모음" handleClick={test}></MoreBox>
      <MoreBox text="사용설명서 보기" handleClick={test}></MoreBox>
      <MoreBox text="고객센터 문의하기" handleClick={test}></MoreBox>
    </ul>
  );
}

export function MypageAuthButtons() {
  return (
    <ul className="flex flex-col gap-4 mt-30">
      <li className="font-bitbit text-[18px] text-main_blue underline cursor-pointer">로그아웃</li>
      <li className="font-bitbit text-[18px] text-main_blue underline cursor-pointer">회원가입</li>
    </ul>
  );
}
