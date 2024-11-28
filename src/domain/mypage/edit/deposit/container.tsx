'use client';

import { WishesDepositEditStepsType } from '@/app/mypage/edit/deposit/page';
import { WishesEditAccountSubmitButton } from '@/domain/wishes/create/container';
import SelectDeposit, { WishesDepositSubmitButton } from '@/domain/wishes/create/selectDeposit';
import WishesKakaopayInputForm from '@/domain/wishes/create/wishesKakaopayInputForm';
import { useRouters } from '@/hooks/common/useRouters';
import useToggle from '@/hooks/common/useToggle';
import { PropsWithChildren } from 'react';

export default function WisheDepositEditPageContainer({
  step,
  children,
}: { step: WishesDepositEditStepsType } & PropsWithChildren) {
  const { state: selectAccount, changeState: changeSelectAccount } = useToggle();
  const { state: noticeAgree, changeState: changeNoticeAgreeState } = useToggle();
  const { state: isKakaoPayCodeValid, changeState: changeIsKakaoPayCodeValid } = useToggle();

  const { handleRouter } = useRouters();

  function handleNextStep() {
    if (selectAccount) {
      handleRouter('/mypage/edit/deposit?step=account');
    } else {
      handleRouter('/mypage/edit/deposit?step=kakaopay');
    }
  }

  return (
    <>
      {children}
      {
        {
          select: (
            <>
              <SelectDeposit
                selectAccount={selectAccount}
                changeSelectAccount={changeSelectAccount}
              >
                <WishesDepositSubmitButton handleNextStep={handleNextStep} />
              </SelectDeposit>
            </>
          ),
          kakaopay: (
            <>
              <WishesKakaopayInputForm
                changeNoticeAgreeState={changeNoticeAgreeState}
                changeIsKakaoPayCodeValid={changeIsKakaoPayCodeValid}
              >
                <WishesEditAccountSubmitButton isValid={isKakaoPayCodeValid && noticeAgree} />
              </WishesKakaopayInputForm>
            </>
          ),
          account: <></>,
        }[step]
      }
    </>
  );
}
