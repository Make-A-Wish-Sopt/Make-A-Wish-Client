'use client';

import Button from '@/components/Elements/Button';
import { useFunnelContext } from '@/Context/FunnelContext';
import { Step } from '@/components/Modules/Funnel';
import useBoolean from '@/hooks/useBoolean';
import { WishesFunnelStepType } from '@/constant/funnelStep';
import SelectPayment from '@/app/_components/Form/wish/SelectPaymentForm';
import { useEffect } from 'react';
import { AccountFormSchemaType } from '@/Schema/wishes.schema';

function SelectPaymentFormStep({ isForPayCode }: { isForPayCode?: boolean }) {
  const { nextStep, prevStep, getSharedData, prevDisabled } =
    useFunnelContext<WishesFunnelStepType>();
  const selectedAccountToggle = useBoolean();

  const handleNextStep = () => {
    if (selectedAccountToggle.state) {
      nextStep('account');
    } else {
      nextStep('kakaopay');
    }
  };

  console.log(isForPayCode);

  useEffect(() => {
    if (!isForPayCode) {
      selectedAccountToggle.changeState(true);
    }

    const savedData = getSharedData('account') as AccountFormSchemaType;

    if (!savedData) return;

    selectedAccountToggle.changeState(!savedData.forPayCode);
  }, []);

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
        <Button bgColor="gray4" fontColor="white" onClick={prevStep} disabled={prevDisabled}>
          이전
        </Button>
        <Button onClick={handleNextStep}>다음</Button>;
      </Step.ButtonWrapper>
    </>
  );
}

export default SelectPaymentFormStep;
