'use client';

import { wishesAccountInputInit } from '@/constant/init';
import {
  wishesAccountDataResolver,
  WishesAccountDataResolverType,
  WishesLinkDataResolverType,
} from '@/validation/wishes.validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { PropsWithChildren, useEffect } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useFunnelContext } from '@/Context/FunnelContext';
import useToggle from '@/hooks/common/useToggle';

export default function AccountContainer({ children }: PropsWithChildren) {
  const wishesAccountInputMethods = useForm<WishesAccountDataResolverType>({
    mode: 'onChange',
    defaultValues: {
      ...wishesAccountInputInit,
      forPayCode: false,
    },
    resolver: yupResolver(wishesAccountDataResolver),
  });

  return (
    <FormProvider {...wishesAccountInputMethods}>
      <WishesAccountObserver>{children}</WishesAccountObserver>
    </FormProvider>
  );
}

function WishesAccountObserver({ children }: PropsWithChildren) {
  const { setValue, formState, watch } = useFormContext<WishesLinkDataResolverType>();
  const { onNextStep, onMoveStep } = useFunnelContext();
  const giftOption = watch('wantsGift');
  const nextButtonLabel = giftOption ? '다음' : '소원생성';
  const nextButtonDisalbed = useToggle();

  return <>{children}</>;
}
