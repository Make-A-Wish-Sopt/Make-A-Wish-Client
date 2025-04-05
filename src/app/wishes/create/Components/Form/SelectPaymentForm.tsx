'use client';

import Button from '@/components/Elements/Button';
import { useFunnelContext } from '@/Context/FunnelContext';
import { Step } from '@/components/Modules/Funnel';
import { WishCreateFormMethodsType } from '../FunnelContainer';
import InputForm from '@/components/UI/InputForm';
import Box from '@/components/Elements/Box';
import SelectBox from '@/components/UI/SelectBox';
import useBoolean from '@/hooks/useBoolean';
import { useWatch } from 'react-hook-form';
import { WishesFunnelStepType } from '../../page';

const SelectPaymentForm = () => {
  const selectedAccountToggle = useBoolean();

  console.log(selectedAccountToggle.state);
  return (
    <>
      <Step.FormSection>
        <SelectPayment
          selectedAccount={selectedAccountToggle.state}
          changeSelectOption={selectedAccountToggle.changeState}
        />
      </Step.FormSection>

      <Step.ButtonWrapper fixedBottom className="flex gap-10 justify-between pb-58">
        <PrevButton />
        <NextButton selectedAccount={selectedAccountToggle.state} />
      </Step.ButtonWrapper>
    </>
  );
};

const SelectPayment = ({
  selectedAccount,
  changeSelectOption,
}: {
  selectedAccount: boolean;
  changeSelectOption: (state: boolean) => void;
}) => {
  return (
    <>
      <InputForm title="입금 방식 선택하기">
        <div className="flex flex-col gap-12">
          <Box
            onClick={() => {
              changeSelectOption(false);
            }}
          >
            <SelectBox selectState={!selectedAccount} text={'카카오 송금하기로 받기'} />
          </Box>

          <Box
            onClick={() => {
              changeSelectOption(true);
            }}
          >
            <SelectBox selectState={selectedAccount} text={'은행 계좌로 받기'} />
          </Box>
        </div>
      </InputForm>
    </>
  );
};

const PrevButton = () => {
  const { PrevButton } = useFunnelContext<WishesFunnelStepType, WishCreateFormMethodsType>();

  return <PrevButton />;
};

const NextButton = ({ selectedAccount }: { selectedAccount: boolean }) => {
  const { inputs, nextStep } = useFunnelContext<WishesFunnelStepType, WishCreateFormMethodsType>();
  const accountFormInput = inputs.accountFormInput;
  const { setValue } = accountFormInput;

  const handleNextStep = () => {
    if (selectedAccount) {
      nextStep('account');
      setValue('forPayCode', false);
    } else {
      nextStep('kakaopay');
      setValue('forPayCode', true);
    }
  };
  return <Button onClick={handleNextStep}>{'다음'}</Button>;
};

export default SelectPaymentForm;
