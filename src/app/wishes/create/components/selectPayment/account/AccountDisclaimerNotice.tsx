'use client';

import { useAccountStore } from '@/stores/account';
import DisclaimerNotice from '../DisclaimerNotice';

export default function AccountDisclaimerNotice() {
  const { changeDisclamierState } = useAccountStore();

  return (
    <DisclaimerNotice changeCheckedState={changeDisclamierState}>
      <p>{'※ 잘못된 계좌번호 기재로 발생되는 문제는 책임지지 않아요!ㅠㅠ'}</p>
    </DisclaimerNotice>
  );
}
