'use client';

import { wishesLinkInputInit } from '@/constant/init';
import { ImageContextProvider, useImageContext } from '@/Context/imageContext';
import { wishesLinkDataResolver, WishesLinkDataResolverType } from '@/validation/wishes.validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { PropsWithChildren, useEffect } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import FunnelStepButton from '../../../../components/Modules/FunnelStepButton';
import { useFunnelContext } from '@/Context/FunnelContext';
import useToggle from '@/hooks/common/useToggle';
import { postWishes } from '@/api/wishes';

export default function WishesLinkContainer({
  wishTitle,
  children,
}: { wishTitle?: string } & PropsWithChildren) {
  const methods = useForm<WishesLinkDataResolverType>({
    mode: 'onChange',
    defaultValues: {
      ...wishesLinkInputInit,
      title: 'wishTitle',
    },
    resolver: yupResolver(wishesLinkDataResolver),
  });

  return (
    <FormProvider {...methods}>
      <ImageContextProvider>
        <WishesLinkObserver>{children}</WishesLinkObserver>
      </ImageContextProvider>
    </FormProvider>
  );
}

function WishesLinkObserver({ children }: PropsWithChildren) {
  const { imageUrl } = useImageContext();
  const { setValue, formState, watch } = useFormContext<WishesLinkDataResolverType>();
  const { onNextStep, onMoveStep } = useFunnelContext();
  const giftOption = watch('wantsGift');
  const nextButtonLabel = giftOption ? '다음' : '소원생성';
  const nextButtonDisalbed = useToggle();

  async function handleClickNext() {
    if (giftOption) {
      return onNextStep();
    } else {
      await createOnlyLettersWishes();
    }
  }

  async function createOnlyLettersWishes() {
    const wishesData = watch();
    onMoveStep('done');

    // postWishes(wishesData).then((response) => {
    //   response.data.success && onMoveStep('done');
    // });
  }

  useEffect(() => {
    setValue('imageUrl', imageUrl, { shouldDirty: true, shouldValidate: true });
  }, [imageUrl, setValue]);

  useEffect(() => {
    formState.isValid
      ? nextButtonDisalbed.changeState(false)
      : nextButtonDisalbed.changeState(true);
  }, [formState.isValid]);

  return (
    <>
      {children}
      <FunnelStepButton
        nextButtonProps={{
          onNextStep: handleClickNext,
          label: nextButtonLabel,
          disabled: nextButtonDisalbed.state,
        }}
        prevButtonProps={{ disabled: true }}
      />
    </>
  );
}
