'use client';

import InputText from '@/components/Elements/Input/inputText';
import InputForm from '@/components/UI/InputForm';
import { useFunnelContext } from '@/Context/FunnelContext';
import React, { PropsWithChildren, useEffect } from 'react';
import { presentListArray } from '@/constant/model/present';
import Image from 'next/image';
import Box from '@/components/Elements/Box';
import CheckBox from '@/components/UI/CheckBox';
import useBoolean, { BooleanHookType } from '@/hooks/useBoolean';
import { FormProvider, useForm, useFormContext, useFormState, useWatch } from 'react-hook-form';
import { MAX_TEXTAREA_LENGTH } from '@/constant/input';
import Button from '@/components/Elements/Button';
import { Step } from '@/components/Modules/Funnel';
import { useParams, useSearchParams } from 'next/navigation';
import { presentFormInitValues } from '@/constant/init';
import { yupResolver } from '@hookform/resolvers/yup';
import { presentFormSchema, PresentFormSchemaType } from '@/Schema/present.schema';
import { PresentFunnelStepType } from '@/constant/funnelStep';
import { postPublicCakes } from '@/api/public';
import { toast } from 'sonner';
import { InputTextForm } from '@/components/UI/InputTextForm';
import convertMoneyText from '@/utils/regex';
import { useFetch } from '@/hooks/useFetch';

export function GiverNameInput() {
  const { register } = useFormContext<PresentFormSchemaType>();

  return (
    <InputForm title="본인의 닉네임 작성하기">
      <InputText
        register={register('name')}
        placeholder="당신의 이름이나 별명을 편하게 작성해주세요"
      />
    </InputForm>
  );
}

export function PresentList({
  onlyPresentMessage,
  onSelectItem,
  selectedId,
  children,
}: {
  onlyPresentMessage: boolean;
  onSelectItem: (id: number) => void;
  selectedId?: number;
} & PropsWithChildren) {
  return (
    <>
      <div
        className="grid grid-cols-3 gap-6 w-full duration-200"
        style={{
          transition: '0.5s ease-out, opacity 0.2s ease-out',
          visibility: onlyPresentMessage ? 'hidden' : 'visible',
          opacity: onlyPresentMessage ? 0 : 1,
          height: onlyPresentMessage ? 0 : '236px',
        }}
      >
        {presentListArray.map((item) => {
          const isSelected = selectedId === item.id;

          return (
            <button
              type="button"
              key={item.id}
              onClick={() => onSelectItem(item.id)}
              className={`flex flex-col items-center p-9 rounded-xl font-bitbit text-[14px] ${
                isSelected ? 'bg-main_blue text-black' : 'bg-dark_green text-white'
              }`}
            >
              <Image src={item.image} alt="선물 이미지" width={56} />
              <span>{item.itemName}</span>
              <span>{convertMoneyText(item.price.toString())}원</span>
            </button>
          );
        })}
      </div>
      {children}
    </>
  );
}

export function SelectPresentItem({ onlyMessageToggle }: { onlyMessageToggle: BooleanHookType }) {
  const { setValue, control } = useFormContext<PresentFormSchemaType>();

  const selectedPresentId = useWatch({
    control,
    name: 'giftMenuId',
  });

  const onSelectPresentItem = (id: number) => {
    setValue('giftMenuId', id);
  };

  useEffect(() => {
    if (onlyMessageToggle.state) {
      setValue('giftMenuId', 0);
    }
  }, [onlyMessageToggle.state, setValue]);

  return (
    <InputForm title="선물하고 싶은 항목 선택하기">
      <PresentList
        onlyPresentMessage={onlyMessageToggle.state}
        selectedId={selectedPresentId}
        onSelectItem={onSelectPresentItem}
      />

      <Box bgColor="dark_green" fontColor="gray2" styles={{ marginTop: '0.6rem' }}>
        <CheckBox changeCheckedState={onlyMessageToggle.changeState}>
          <span className="font-galmuri text-[14px] ml-8">편지만 보낼게요</span>
        </CheckBox>
      </Box>
    </InputForm>
  );
}

export function LetterToFriendInput() {
  const { register, control } = useFormContext<PresentFormSchemaType>();

  return (
    <InputForm title="친구에게 편지남기기">
      <InputTextForm
        inputType="textarea"
        register={register('message')}
        control={control}
        placeholder="ex.) 생일을 축하합니다~"
        maxLength={MAX_TEXTAREA_LENGTH}
      />
    </InputForm>
  );
}

function NextButton({
  wantsGift,
  onlyPresentMessage,
}: {
  wantsGift: boolean;
  onlyPresentMessage: boolean;
}) {
  const { nextStep, setSharedData, onMoveStep } = useFunnelContext<PresentFunnelStepType>();
  const { control, getValues } = useFormContext<PresentFormSchemaType>();
  const { isValid } = useFormState({ control });
  const { wishId } = useParams();
  const giftMenuId = useWatch({ control, name: 'giftMenuId' });
  const { status, fetchData } = useFetch(postPublicCakes);

  const handleNextStep = async () => {
    const presentFormData = getValues();
    if (!presentFormData) return;

    if (status === 'loading') return;

    if (onlyPresentMessage || !wantsGift) {
      const response = await fetchData({ ...presentFormData, wishId: wishId as string });
      if (!response) {
        toast.error('선물을 보내는 중 오류가 발생했어요ㅠㅠ');

        return;
      }
      onMoveStep('complete');
      setSharedData((prev) => ({
        ...prev,
        present: { ...presentFormData },
      }));
    } else {
      nextStep();
      setSharedData((prev) => ({
        ...prev,
        present: { ...presentFormData },
      }));
    }
  };

  const checkDisabled = () => {
    if (!isValid) return true;
    if (!wantsGift && isValid) return false;
    if (!onlyPresentMessage && !giftMenuId) return true;

    return false;
  };

  return (
    <Button disabled={checkDisabled()} onClick={handleNextStep}>
      친구생일 축하해주기
    </Button>
  );
}

export default function PresentForm({ wantsGift }: { wantsGift: boolean }) {
  const searchParams = useSearchParams();
  const avatarCakeId = searchParams.get('avatarCakeId');
  const onlyPresentMessageToggle = useBoolean();
  const { getSharedData } = useFunnelContext<PresentFunnelStepType>();

  const presentFormMethods = useForm<PresentFormSchemaType>({
    mode: 'onChange',
    defaultValues: {
      ...presentFormInitValues,
      cakeId: Number(avatarCakeId) || 1,
    },
    resolver: yupResolver(presentFormSchema),
  });

  useEffect(() => {
    const savedData = getSharedData('present') as PresentFormSchemaType;

    if (!savedData) return;

    presentFormMethods.reset(savedData);
  }, []);

  return (
    <FormProvider {...presentFormMethods}>
      <GiverNameInput />
      {wantsGift && <SelectPresentItem onlyMessageToggle={onlyPresentMessageToggle} />}
      <LetterToFriendInput />

      <Step.ButtonWrapper>
        <NextButton wantsGift={wantsGift} onlyPresentMessage={onlyPresentMessageToggle.state} />
      </Step.ButtonWrapper>
    </FormProvider>
  );
}
