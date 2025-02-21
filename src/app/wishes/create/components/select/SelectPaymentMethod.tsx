'use client';

import Box from '@/components/Common/Box';
import InputForm from '@/components/UI/InputForm';
import SelectBox from '@/components/UI/SelectBox';
import { useFunnelContext } from '@/Context/FunnelContext';
import useToggle from '@/hooks/common/useToggle';

import { selectPaymenet } from '../container';
import FunnelStepButton from '@/components/Modules/FunnelStepButton';
import { FixedBottomButtonWrapper } from '@/components/Common/Button/FixedBottomButton';

export default function SelectPaymentMethod() {
  const selectAccount = useToggle();
  const { onNextStep, onPrevStep } = useFunnelContext();

  function handleNextStep() {
    if (selectAccount.state) {
      return onNextStep<typeof selectPaymenet>({ selectPaymenet: 'account' });
    } else {
      return onNextStep<typeof selectPaymenet>({ selectPaymenet: 'kakaopay' });
    }
  }
  return (
    <>
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

      <FixedBottomButtonWrapper>
        <FunnelStepButton
          nextButtonProps={{ onNextStep: handleNextStep }}
          prevButtonProps={{ onPrevStep: onPrevStep, bgColor: 'gray4' }}
        />
      </FixedBottomButtonWrapper>
    </>
  );
}
