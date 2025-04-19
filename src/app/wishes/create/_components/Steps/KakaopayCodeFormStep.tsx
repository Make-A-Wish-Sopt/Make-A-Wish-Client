'use client';

import { useFunnelContext } from '@/Context/FunnelContext';
import useBoolean from '@/hooks/useBoolean';
import { FormProvider, useForm, useFormState } from 'react-hook-form';
import Button from '@/components/Elements/Button';
import { useRouters } from '@/hooks/useRouters';
import { WishesFunnelStepType } from '@/constant/funnelStep';
import {
  KakaopayCodeInput,
  KakaopayCodeGuideImage,
  AccountAgreementCheckbox,
} from '@/app/_components/Form/wish/KakaopayCodeForm';
import { AccountFormSchema, AccountFormSchemaType } from '@/Schema/wishes.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Step } from '@/components/Modules/Funnel';
import { useEffect } from 'react';
import { createAccountWithWishData, updateAccount } from '@/app/_components/Form/wish/AccountForm';

export function PrevButtonWithSaveData({
  formData,
  resetData,
}: {
  formData: AccountFormSchemaType;
  resetData: () => void;
}) {
  const { prevStep, setSharedData, getSharedData, prevDisabled } =
    useFunnelContext<WishesFunnelStepType>();

  useEffect(() => {
    const savedData = getSharedData('account') as AccountFormSchemaType;
    if (!savedData) return;

    resetData();
  }, []);

  const saveSharedData = async () => {
    setSharedData((prev) => ({
      ...prev,
      account: { ...formData },
    }));
  };

  const handlePrevStep = async () => {
    await saveSharedData();
    prevStep();
  };

  return (
    <Button
      bgColor="gray4"
      fontColor="white"
      onClick={() => handlePrevStep()}
      disabled={prevDisabled}
    >
      이전
    </Button>
  );
}

function KakaopayCodeFormStep({
  isEdit,
  defaultFormValues,
}: {
  isEdit?: boolean;
  defaultFormValues: AccountFormSchemaType;
}) {
  const { getSharedData } = useFunnelContext<WishesFunnelStepType>();

  const kakaopayCodeForm = useForm<AccountFormSchemaType>({
    mode: 'onChange',
    defaultValues: { ...defaultFormValues, forPayCode: true },
    resolver: yupResolver(AccountFormSchema),
  });
  const isKakaoPayCodeValidToggle = useBoolean();
  const noticeAgreeToggle = useBoolean();

  const { getValues, control, reset } = kakaopayCodeForm;
  const { errors } = useFormState({ control, name: ['kakaoPayCode'] });

  const { handleRouter } = useRouters();

  const checkDisabled = () => {
    if (!isKakaoPayCodeValidToggle.state) return true;
    if (!noticeAgreeToggle.state) return true;
    if (errors.kakaoPayCode) return true;

    return false;
  };

  return (
    <FormProvider {...kakaopayCodeForm}>
      <Step.FormSection className="flex flex-col gap-12 mb-24">
        <KakaopayCodeGuideImage />
        <KakaopayCodeInput
          isKakaoPayCodeValid={isKakaoPayCodeValidToggle.state}
          changeValidState={isKakaoPayCodeValidToggle.changeState}
        />
        <AccountAgreementCheckbox onCheck={noticeAgreeToggle.changeState} />
      </Step.FormSection>

      <Step.ButtonWrapper horizontal className="gap-10">
        <PrevButtonWithSaveData formData={getValues()} resetData={() => reset(getValues())} />
        {isEdit ? (
          <Button
            onClick={() => updateAccount(getValues(), () => handleRouter('/mypage'))}
            disabled={checkDisabled()}
          >
            수정 완료
          </Button>
        ) : (
          <Button
            onClick={() => {
              createAccountWithWishData(getValues(), getSharedData('wishes'), () =>
                handleRouter('/wishes/create/complete'),
              );
            }}
            disabled={checkDisabled()}
          >
            생성 완료!
          </Button>
        )}
      </Step.ButtonWrapper>
    </FormProvider>
  );
}

export default KakaopayCodeFormStep;
