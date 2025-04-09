'use client';

import { useFunnelContext } from '@/Context/FunnelContext';
import React from 'react';
import useBoolean, { BooleanHookType } from '@/hooks/useBoolean';
import { FormProvider, useForm, useFormContext, useFormState } from 'react-hook-form';
import Button from '@/components/Elements/Button';
import { Step } from '@/components/Modules/Funnel';
import { presentFormInitValues } from '@/constant/init';
import { yupResolver } from '@hookform/resolvers/yup';
import { presentFormSchema, PresentFormSchemaType } from '@/Schema/present.schema';
import { PresentFunnelStepType } from '@/constant/funnelStep';
import {
  GiverNameInput,
  LetterToFriendInput,
  SelectPresentItem,
} from '@/app/present/[wishId]/components/PresentForm';

export const PreviewPresentForm = () => {
  const onlyPresentMessageToggle = useBoolean();

  const previewPresentFormMethods = useForm<PresentFormSchemaType>({
    mode: 'onChange',
    defaultValues: {
      ...presentFormInitValues,
      cakeId: 1,
    },
    resolver: yupResolver(presentFormSchema),
  });

  return (
    <FormProvider {...previewPresentFormMethods}>
      <GiverNameInput />
      <SelectPresentItem onlyMessageToggle={onlyPresentMessageToggle} />
      <LetterToFriendInput />

      <Step.ButtonWrapper>
        <NextButton />
      </Step.ButtonWrapper>
    </FormProvider>
  );
};

const NextButton = () => {
  const { nextStep, setSharedData } = useFunnelContext<PresentFunnelStepType>();
  const { control, getValues } = useFormContext<PresentFormSchemaType>();
  const { isValid } = useFormState({ control });

  const handleNextStep = async () => {
    const presentFormData = getValues();
    nextStep();
    setSharedData((prev) => ({
      ...prev,
      present: { ...presentFormData },
    }));
  };

  return (
    <Button disabled={!isValid} onClick={handleNextStep}>
      {'친구생일 축하해주기'}
    </Button>
  );
};
