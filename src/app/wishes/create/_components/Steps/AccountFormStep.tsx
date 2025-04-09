'use client';

import { Step } from '@/components/Modules/Funnel';
import useBoolean from '@/hooks/useBoolean';
import {
  AccountForm,
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

const AccountFormStep = ({ isEdit }: { isEdit?: boolean }) => {
  const { setSharedData, getSharedData } = useFunnelContext<WishesFunnelStepType>();

  const defaultValues = useMemo(() => {
    const saved = getSharedData('account') as AccountFormSchemaType;
    return saved ? { ...saved, forPayCode: true } : { ...accountFormInitValues, forPayCode: true };
  }, [getSharedData]);

  const accountFormMethods = useForm<AccountFormSchemaType>({
    mode: 'onChange',
    defaultValues: { ...defaultValues },
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
          // 📌 Yup 유효성 검사 실행
          const accountValidator = AccountFormSchema.pick(['accountInfo']);

          await accountValidator.validate({ accountInfo: response.transferInfo.accountInfo });
          isAccountValidToggle.changeState(true);

          // ✅ 유효성 검사를 통과하면 reset 실행
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
        <PrevButton />
        <NextButton
          isAccountValid={isAccountValidToggle.state}
          noticeAgree={noticeAgreeToggle.state}
          isEdit={isEdit}
        />
      </Step.ButtonWrapper>
    </FormProvider>
  );
};

const PrevButton = () => {
  const { PrevButton, prevStep, setSharedData, getSharedData } =
    useFunnelContext<WishesFunnelStepType>();
  const { getValues, reset } = useFormContext<AccountFormSchemaType>();

  useEffect(() => {
    const savedData = getSharedData('account') as AccountFormSchemaType;
    if (savedData) {
      reset({ ...savedData, forPayCode: false });
    }
  }, []);

  const handlePrevStep = () => {
    setSharedData((prev) => ({
      ...prev,
      account: { ...getValues(), forPayCode: false },
    }));
    prevStep();
  };

  return <PrevButton onClick={handlePrevStep} />;
};

const NextButton = ({
  isAccountValid,
  noticeAgree,
  isEdit,
}: {
  isAccountValid: boolean;
  noticeAgree: boolean;
  isEdit?: boolean;
}) => {
  const { getSharedData } = useFunnelContext<WishesFunnelStepType>();
  const { handleRouter } = useRouters();
  const { control, getValues, reset } = useFormContext<AccountFormSchemaType>();
  const { errors } = useFormState({ control, name: ['accountInfo'] });

  useEffect(() => {
    const savedData = getSharedData('account') as AccountFormSchemaType;
    if (savedData) {
      reset(savedData);
    }
  }, []);

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
      {isEdit ? '수정 완료' : '소원생성!'}
    </Button>
  );
};

export default AccountFormStep;
