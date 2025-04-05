'use client';

import React, { PropsWithChildren, ReactElement, ReactNode } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import {
  AccountFormValidator,
  AccountFormValidatorType,
  WishesFormValidator,
  WishesFormValidatorType,
} from '@/validation/wishes.validate';
import { accountFormInitValues, wishesFormInitValues } from '@/constant/init';
import { yupResolver } from '@hookform/resolvers/yup';
import { FunnelProvider, useFunnelContext } from '@/Context/FunnelContext';
import { useSearchParams } from 'next/navigation';
import { Step, StepProps } from '@/components/Modules/Funnel';
import { FunnelStepsType } from '@/hooks/useFunnel';
import { WishesFunnelStepType } from '../page';

export type WishCreateFormMethodsType = {
  wishesFormInput: UseFormReturn<WishesFormValidatorType>;
  accountFormInput: UseFormReturn<AccountFormValidatorType>;
};

export const WishCreateFunnelProvider = ({
  steps,
  children,
}: {
  steps: FunnelStepsType;
} & PropsWithChildren) => {
  const searchParams = useSearchParams();
  const wishTitle = searchParams.get('wishTitle');

  const wishesFormMethods = useForm<WishesFormValidatorType>({
    mode: 'onChange',
    defaultValues: { ...wishesFormInitValues, title: wishTitle },
    resolver: yupResolver(WishesFormValidator),
  });

  const accountFormMethods = useForm<AccountFormValidatorType>({
    mode: 'onChange',
    defaultValues: { ...accountFormInitValues },
    resolver: yupResolver(AccountFormValidator),
  });

  const inputs: WishCreateFormMethodsType = {
    wishesFormInput: wishesFormMethods,
    accountFormInput: accountFormMethods,
  };

  return (
    <FunnelProvider<any, WishCreateFormMethodsType> steps={steps} inputs={inputs}>
      {children}
    </FunnelProvider>
  );
};

export const WishCreateFunnel = ({
  children,
}: {
  children: ReactElement<StepProps, typeof Step>[];
}) => {
  const { Funnel } = useFunnelContext<WishesFunnelStepType, WishCreateFormMethodsType>();

  return <Funnel>{children}</Funnel>;
};
