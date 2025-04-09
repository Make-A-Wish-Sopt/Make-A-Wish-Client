'use client';

import Button from '@/components/Elements/Button';
import { useFunnelContext } from '@/Context/FunnelContext';
import { Step } from '@/components/Modules/Funnel';
import useBoolean from '@/hooks/useBoolean';
import { WishesFunnelStepType } from '@/constant/funnelStep';
import { SelectPayment } from '@/app/_components/Form/wish/SelectPaymentForm';
import { useEffect } from 'react';
import { AccountFormSchemaType } from '@/Schema/wishes.schema';

const SelectPaymentFormStep = () => {
  const { nextStep, PrevButton, getSharedData } = useFunnelContext<WishesFunnelStepType>();
  const selectedAccountToggle = useBoolean();

  const handleNextStep = () => {
    if (selectedAccountToggle.state) {
      nextStep('account');
    } else {
      nextStep('kakaopay');
    }
  };

  useEffect(() => {
    const accountSavedData = getSharedData('account') as AccountFormSchemaType;

    if (accountSavedData) {
      selectedAccountToggle.changeState(!accountSavedData.forPayCode);
      return;
    }
  }, []);

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
        <Button onClick={handleNextStep}>{'다음'}</Button>;
      </Step.ButtonWrapper>
    </>
  );
};

export default SelectPaymentFormStep;
