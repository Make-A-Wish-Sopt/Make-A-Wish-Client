'use client';

import Box from '@/components/Common/Box';
import Button from '@/components/Common/Button';
import { FixedBottomButtonWrapper } from '@/components/Common/Button/FixedBottomButton';
import InputForm from '@/components/UI/InputForm';
import SelectBox from '@/components/UI/SelectBox';
import { useRouters } from '@/hooks/common/useRouters';
import { PropsWithChildren } from 'react';

export default function SelectDeposit({
  selectAccount,
  changeSelectAccount,
  children,
}: { selectAccount: boolean; changeSelectAccount: (state: boolean) => void } & PropsWithChildren) {
  return (
    <>
      <InputForm title="입금 방식 선택하기">
        <div className="flex flex-col gap-12">
          <Box
            onClick={() => {
              changeSelectAccount(false);
            }}
          >
            <SelectBox selectState={!selectAccount} text={'카카오 송금하기로 받기'} />
          </Box>

          <Box
            onClick={() => {
              changeSelectAccount(true);
            }}
          >
            <SelectBox selectState={selectAccount} text={'은행 계좌로 받기'} />
          </Box>
        </div>
      </InputForm>

      {children}
    </>
  );
}

export function WishesDepositSubmitButton({ handleNextStep }: { handleNextStep: () => void }) {
  const { handleBack } = useRouters();

  return (
    <FixedBottomButtonWrapper>
      <div className="flex justify-between gap-10">
        <Button bgColor="gray4" fontColor="white" onClick={handleBack}>
          이전
        </Button>

        <Button onClick={handleNextStep}>다음</Button>
      </div>
    </FixedBottomButtonWrapper>
  );
}
