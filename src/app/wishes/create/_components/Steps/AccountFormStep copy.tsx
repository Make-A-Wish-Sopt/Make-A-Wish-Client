'use client';

import { Step } from '@/components/Modules/Funnel';
import useBoolean from '@/hooks/useBoolean';
import AccountForm, {
  createAccountWithWishData,
  updateAccount,
} from '@/app/_components/Form/wish/AccountForm';
import { useFunnelContext } from '@/Context/FunnelContext';
import { WishesFunnelStepType } from '@/constant/funnelStep';
import { useRouters } from '@/hooks/useRouters';
import { getUserAccount } from '@/api/user';
import Button from '@/components/Elements/Button';
import { FormProvider, useForm, useFormContext, useFormState } from 'react-hook-form';
import {
  AccountFormSchema,
  AccountFormSchemaType,
  WishesFormScehmaType,
} from '@/Schema/wishes.schema';
import { accountFormInitValues } from '@/constant/init';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';

function AccountFormPrevButton() {
  const { prevStep, setSharedData, getSharedData, prevDisabled } =
    useFunnelContext<WishesFunnelStepType>();
  const { getValues, reset } = useFormContext<AccountFormSchemaType>();

  useEffect(() => {
    const savedData = getSharedData('account') as AccountFormSchemaType;
    if (savedData) {
      reset({ ...savedData, forPayCode: false });
    }
  }, [getSharedData, reset]);

  const handlePrevStep = () => {
    setSharedData((prev) => ({
      ...prev,
      account: { ...getValues(), forPayCode: false },
    }));
    prevStep();
  };

  return (
    <Button bgColor="gray4" fontColor="white" onClick={handlePrevStep} disabled={prevDisabled}>
      이전
    </Button>
  );
}

function NextButton({
  isAccountValid,
  noticeAgree,
  isEdit,
}: {
  isAccountValid: boolean;
  noticeAgree: boolean;
  isEdit?: boolean;
}) {
  const { getSharedData } = useFunnelContext<WishesFunnelStepType>();
  const { handleRouter } = useRouters();
  const { control, getValues, reset } = useFormContext<AccountFormSchemaType>();
  const { errors } = useFormState({ control, name: ['accountInfo'] });

  useEffect(() => {
    const savedData = getSharedData('account') as AccountFormSchemaType;
    if (savedData) {
      reset(savedData);
    }
  }, [getSharedData, reset]);

  const handleNextStep = async () => {
    const accountData = getValues();
    if (isEdit) {
      updateAccount(accountData, () => handleRouter('/mypage'));
    } else {
      const wishFormData = getSharedData('wishes') as WishesFormScehmaType;
      createAccountWithWishData(accountData, wishFormData, () =>
        handleRouter('/wishes/create/complete'),
      );
    }
  };

  return (
    <Button
      disabled={!!errors.accountInfo || !isAccountValid || !noticeAgree}
      onClick={handleNextStep}
    >
      {isEdit ? '수정 완료' : '생성 완료!'}
    </Button>
  );
}

function AccountFormStep({ isEdit }: { isEdit?: boolean }) {
  const { setSharedData, getSharedData } = useFunnelContext<WishesFunnelStepType>();

  const defaultValues = useMemo(() => {
    const saved = getSharedData('account') as AccountFormSchemaType;
    return saved
      ? { ...saved, forPayCode: false }
      : { ...accountFormInitValues, forPayCode: false };
  }, [getSharedData]);

  const accountFormMethods = useForm<AccountFormSchemaType>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(AccountFormSchema),
  });

  const isAccountValidToggle = useBoolean();
  const noticeAgreeToggle = useBoolean();

  useEffect(() => {
    const savedAccountFormData = getSharedData('account');

    if (savedAccountFormData) return;

    const fetchData = async () => {
      try {
        const response = await getUserAccount();
        if (response.transferInfo) {
          const accountValidator = AccountFormSchema.pick(['accountInfo']);
          await accountValidator.validate({ accountInfo: response.transferInfo.accountInfo });
          isAccountValidToggle.changeState(true);

          accountFormMethods.reset({ ...response.transferInfo });
          setSharedData((prev) => ({
            ...prev,
            account: { ...response.transferInfo },
          }));
        }
      } catch (error) {
        isAccountValidToggle.changeState(false);
      }
    };

    fetchData();
  }, []);

  return (
    <FormProvider {...accountFormMethods}>
      <AccountForm
        accountFormMethods={accountFormMethods}
        isAccountValidToggle={isAccountValidToggle}
        noticeAgreeToggle={noticeAgreeToggle}
      />

      <Step.ButtonWrapper horizontal className="gap-10">
        <AccountFormPrevButton />
        <NextButton
          isAccountValid={isAccountValidToggle.state}
          noticeAgree={noticeAgreeToggle.state}
          isEdit={isEdit}
        />
      </Step.ButtonWrapper>
    </FormProvider>
  );
}

export default AccountFormStep;
