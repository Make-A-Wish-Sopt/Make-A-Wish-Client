'use client';

import Box from '@/components/Elements/Box';
import InputForm from '@/components/UI/InputForm';
import SelectBox from '@/components/UI/SelectBox';
import { BooleanType } from '@/hooks/useBoolean';

export default function SelectPaymentForm({ selectAccount }: { selectAccount: BooleanType }) {
  // 변경예정 : ForPayCode라는 변수는 확장성에 열려있지 않음 서버와 논의 후 변경

  return (
    <InputForm title="입금 방식 선택하기">
      <div className="flex flex-col gap-12">
        <Box
          onClick={() => {
            selectAccount.changeState(false);
          }}
        >
          <SelectBox selectState={!selectAccount.state} text={'카카오 송금하기로 받기'} />
        </Box>

        <Box
          onClick={() => {
            selectAccount.changeState(true);
          }}
        >
          <SelectBox selectState={selectAccount.state} text={'은행 계좌로 받기'} />
        </Box>
      </div>
    </InputForm>
  );
}
