'use client';

import { WishesDepositEditStepsType } from '@/app/mypage/edit/deposit/page';
import { WishesEditAccountSubmitButton } from '@/domain/wishes/create/container';
import SelectDeposit, { WishesDepositSubmitButton } from '@/domain/wishes/create/selectDeposit';
import WishesAccountInputForm from '@/domain/wishes/create/wishesAccountInputForm';
import WishesKakaopayInputForm from '@/domain/wishes/create/wishesKakaopayInputForm';
import { useRouters } from '@/hooks/useRouters';
import useBoolean from '@/hooks/useBoolean';
import { PropsWithChildren, useEffect } from 'react';

export default function WisheDepositEditPageContainer({
  step,
  forPayCode,
  children,
}: {
  step: WishesDepositEditStepsType;
  forPayCode: boolean;
} & PropsWithChildren) {
  const isKakaoPayCodeValid = useBoolean();
  const noticeAgree = useBoolean();
  const submitBtnActiveState = useBoolean();
  const accountVerifyBtnState = useBoolean();
  const isLoading = useBoolean();
  const isAccountValid = useBoolean(true);
  const selectAccount = useBoolean();

  const { handleRouter } = useRouters();

  function handleNextStep() {
    if (selectAccount.state) {
      handleRouter('/mypage/edit/deposit?step=account');
    } else {
      handleRouter('/mypage/edit/deposit?step=kakaopay');
    }
  }

  useEffect(() => {
    selectAccount.changeState(!forPayCode);
  }, [forPayCode]);

  return (
    <>
      {children}
      {
        {
          select: (
            <>
              <SelectDeposit selectAccount={selectAccount}>
                <WishesDepositSubmitButton handleNextStep={handleNextStep} isEdit />
              </SelectDeposit>
            </>
          ),
          kakaopay: (
            <>
              <WishesKakaopayInputForm
                isKakaoPayCodeValid={isKakaoPayCodeValid}
                noticeAgree={noticeAgree}
                submitBtnActiveState={submitBtnActiveState}
                isLoading={isLoading}
              >
                <WishesEditAccountSubmitButton
                  disabled={!submitBtnActiveState.state}
                  forPayCode={true}
                />
              </WishesKakaopayInputForm>
            </>
          ),
          account: (
            <>
              <WishesAccountInputForm
                accountVerifyBtnState={accountVerifyBtnState}
                isAccountValid={isAccountValid}
                isLoading={isLoading}
                submitBtnActiveState={submitBtnActiveState}
                noticeAgree={noticeAgree}
              >
                <WishesEditAccountSubmitButton
                  disabled={!submitBtnActiveState.state}
                  forPayCode={false}
                />
              </WishesAccountInputForm>
            </>
          ),
        }[step]
      }
    </>
  );
}
