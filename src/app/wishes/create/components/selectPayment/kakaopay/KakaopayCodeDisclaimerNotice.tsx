'use client';

import { useKakaopayCodeStore } from '@/stores/account';
import DisclaimerNotice from '../DisclaimerNotice';

export default function KakaopayCodeDisclaimerNotice() {
  const { changeDisclamierState } = useKakaopayCodeStore();
  return (
    <DisclaimerNotice changeCheckedState={changeDisclamierState}>
      <p>{'※ 잘못된 송금코드 링크 기재로 발생되는 문제는 책임지지 않아요!ㅠㅠ'}</p>
    </DisclaimerNotice>
  );
}
