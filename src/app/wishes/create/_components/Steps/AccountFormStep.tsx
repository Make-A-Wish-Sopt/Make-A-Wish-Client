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
import Button from '@/components/Elements/Button';
import { FormProvider, useForm, useFormState } from 'react-hook-form';
import { AccountFormSchema, AccountFormSchemaType } from '@/Schema/wishes.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { PrevButtonWithSaveData } from './KakaopayCodeFormStep';

export default function AccountFormStep({
  isEdit,
  defaultFormValues,
}: {
  isEdit?: boolean;
  defaultFormValues: AccountFormSchemaType;
}) {
  const { getSharedData } = useFunnelContext<WishesFunnelStepType>();
  const { handleRouter } = useRouters();
  const accountFormMethods = useForm<AccountFormSchemaType>({
    mode: 'onChange',
    defaultValues: { ...defaultFormValues, forPayCode: false },
    resolver: yupResolver(AccountFormSchema),
  });
  const isAccountValidToggle = useBoolean();
  const noticeAgreeToggle = useBoolean();

  const { getValues, control, reset } = accountFormMethods;
  const { errors } = useFormState({ control, name: ['accountInfo'] });

  const checkDisabled = () => {
    if (!isAccountValidToggle.state) return true;
    if (!noticeAgreeToggle.state) return true;
    if (errors.accountInfo) return true;

    return false;
  };

  return (
    <FormProvider {...accountFormMethods}>
      <AccountForm
        accountFormMethods={accountFormMethods}
        isAccountValidToggle={isAccountValidToggle}
        noticeAgreeToggle={noticeAgreeToggle}
      />

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
