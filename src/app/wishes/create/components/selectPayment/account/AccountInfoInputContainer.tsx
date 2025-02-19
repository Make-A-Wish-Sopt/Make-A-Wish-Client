'use client';

import { getUserAccount } from '@/api/user';
import ValidateLoadingModal from '@/components/Common/Modal/ValidateLoadingModal';
import FunnelStepButton from '@/components/Modules/FunnelStepButton';
import { wishesAccountInputInit } from '@/constant/init';
import useToggle from '@/hooks/common/useToggle';
import { useAccountStore } from '@/stores/account';
import {
  wishesAccountDataResolver,
  WishesAccountDataResolverType,
} from '@/validation/wishes.validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { PropsWithChildren, useEffect } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

export interface AccountContainerStateType {
  accountVerifyBtnState: boolean;
  isInitialApiCall: boolean;
  disclaimerAgree: boolean;
  isAccountValid: boolean;
}

export default function AccountInfoInputContainer({ children }: PropsWithChildren) {
  const methods = useForm<WishesAccountDataResolverType>({
    mode: 'onChange',
    defaultValues: {
      ...wishesAccountInputInit,
      forPayCode: false,
    },
    resolver: yupResolver(wishesAccountDataResolver),
  });

  return (
    <FormProvider {...methods}>
      <AccountSubmitObserver>{children}</AccountSubmitObserver>
    </FormProvider>
  );
}

function AccountSubmitObserver({ children }: PropsWithChildren) {
  const { reset, formState } = useFormContext<WishesAccountDataResolverType>();
  const {
    verifyBtnState,
    disclamierState,
    isAccountValid,
    isLoading,
    changeVerifyBtnState,
    changeIsAccountValid,
    changeIsLoading,
  } = useAccountStore();
  const { errors } = formState;

  const nextButtonLabel = '생성 완료!';
  const nextButtonDisalbed = useToggle();

  async function handleClickNext() {}

  useEffect(() => {
    const fetchData = async () => {
      changeIsLoading(true);

      try {
        const response = await getUserAccount();
        if (response.transferInfo) {
          // 📌 Yup 유효성 검사 실행
          const accountValidator = wishesAccountDataResolver.pick(['accountInfo']);

          await accountValidator.validate({ accountInfo: response.transferInfo.accountInfo });
          changeIsAccountValid(true);
          changeVerifyBtnState(false);

          // ✅ 유효성 검사를 통과하면 reset 실행
          reset({ ...response.transferInfo });
        }
      } catch (error) {
        changeIsAccountValid(false);
      } finally {
        setTimeout(() => {
          changeIsLoading(false);
        }, 2000);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!errors.accountInfo && !verifyBtnState && disclamierState && isAccountValid) {
      nextButtonDisalbed.changeState(true);
    } else {
      nextButtonDisalbed.changeState(false);
    }
  }, [errors.accountInfo, verifyBtnState, disclamierState, isAccountValid]);

  return (
    <>
      {children}
      <FunnelStepButton
        prevButtonProps={{ disabled: true }}
        nextButtonProps={{
          onNextStep: handleClickNext,
          label: nextButtonLabel,
          disabled: !nextButtonDisalbed.state,
        }}
      />
      <ValidateLoadingModal isOpen={isLoading} success={isAccountValid} />
    </>
  );
}
