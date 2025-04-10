'use client';

import InputForm from '@/components/UI/InputForm';
import Box from '@/components/Elements/Box';
import SelectBox from '@/components/UI/SelectBox';

export default function SelectPayment({
  selectedAccount,
  changeSelectOption,
}: {
  selectedAccount: boolean;
  changeSelectOption: (state: boolean) => void;
}) {
  return (
    <InputForm title="입금 방식 선택하기">
      <div className="flex flex-col gap-12">
        <Box
          onClick={() => {
            changeSelectOption(false);
          }}
        >
          <SelectBox selectState={!selectedAccount} text="카카오 송금하기로 받기" />
        </Box>

        <Box
          onClick={() => {
            changeSelectOption(true);
          }}
        >
          <SelectBox selectState={selectedAccount} text="은행 계좌로 받기" />
        </Box>
      </div>
    </InputForm>
  );
}
