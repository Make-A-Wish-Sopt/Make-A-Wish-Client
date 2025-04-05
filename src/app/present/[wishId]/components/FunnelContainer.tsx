'use client';

import { Step, StepProps } from '@/components/Modules/Funnel';
import { FunnelProvider, useFunnelContext } from '@/Context/FunnelContext';
import { FunnelStepsType } from '@/hooks/useFunnel';
import { useSearchParams } from 'next/navigation';
import { PropsWithChildren, ReactElement } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { presentDataResolver, PresentDataResolverType } from '@/validation/present.validate';
import { presentDataInputInit } from '@/constant/init';
import { yupResolver } from '@hookform/resolvers/yup';
import { PresentFunnelStepType } from '../page';

export type PresentFormMethodsType = {
  presentFormMethods: UseFormReturn<PresentDataResolverType>;
};

export const PresentFunnelProvider = ({
  steps,
  children,
}: {
  steps: FunnelStepsType;
} & PropsWithChildren) => {
  const searchParams = useSearchParams();
  const avatarCakeId = searchParams.get('avatarCakeId');

  const presentFormMethods = useForm<PresentDataResolverType>({
    mode: 'onChange',
    defaultValues: {
      ...presentDataInputInit,
      cakeId: Number(avatarCakeId),
    },
    resolver: yupResolver(presentDataResolver),
  });

  const inputs: PresentFormMethodsType = {
    presentFormMethods: presentFormMethods,
  };

  return (
    <FunnelProvider<any, PresentFormMethodsType> steps={steps} inputs={inputs}>
      {children}
    </FunnelProvider>
  );
};

export const PresentFunnel = ({
  children,
}: {
  children: ReactElement<StepProps, typeof Step>[];
}) => {
  const { Funnel } = useFunnelContext<PresentFunnelStepType, PresentFormMethodsType>();

  return <Funnel>{children}</Funnel>;
};
