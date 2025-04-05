'use client';

import InputText from '@/components/Elements/Input/inputText';
import InputForm from '@/components/UI/InputForm';
import { useFunnelContext } from '@/Context/FunnelContext';
import React, { PropsWithChildren } from 'react';
import { PresentFunnelStepType } from '../page';
import { PresentFormMethodsType } from './FunnelContainer';
import { presentListArray } from '@/constant/model/present';
import Image from 'next/image';
import { convertMoneyText } from '@/utils/common/convert';
import Box from '@/components/Elements/Box';
import CheckBox from '@/components/UI/CheckBox';
import useBoolean from '@/hooks/useBoolean';
import { useFormState, useWatch } from 'react-hook-form';
import InputTextForm from '@/components/UI/InputTextForm';
import { MAX_TEXTAREA_LENGTH } from '@/constant/input';
import Button from '@/components/Elements/Button';
import { Step } from '@/components/Modules/Funnel';

const PresentForm = () => {
  return (
    <>
      <GiverNameInput />
      <SelectPresentItem />
      <LetterToFriendInput />

      <Step.ButtonWrapper>
        <NextButton />
      </Step.ButtonWrapper>
    </>
  );
};

const GiverNameInput = () => {
  const { inputs } = useFunnelContext<PresentFunnelStepType, PresentFormMethodsType>();
  const { register } = inputs.presentFormMethods;

  return (
    <InputForm title="본인의 닉네임 작성하기">
      <InputText
        register={register('name')}
        placeholder="당신의 이름이나 별명을 편하게 작성해주세요"
      />
    </InputForm>
  );
};

const SelectPresentItem = () => {
  const { inputs } = useFunnelContext<PresentFunnelStepType, PresentFormMethodsType>();
  const { setValue, control } = inputs.presentFormMethods;
  const onlyPresentMessageToggle = useBoolean();

  const selectedPresentId = useWatch({
    control,
    name: 'giftMenuId',
  });

  const onSelectPresentItem = (id: number) => {
    setValue('giftMenuId', id);
  };

  return (
    <InputForm title="선물하고 싶은 항목 선택하기">
      <PresentList
        onlyPresentMessage={onlyPresentMessageToggle.state}
        selectedId={selectedPresentId}
        onSelectItem={onSelectPresentItem}
      />

      <Box bgColor="dark_green" fontColor="gray2" styles={{ marginTop: '0.6rem' }}>
        <CheckBox changeCheckedState={onlyPresentMessageToggle.changeState}>
          <span className="font-galmuri text-[14px] ml-8">{'편지만 보낼게요'}</span>
        </CheckBox>
      </Box>
    </InputForm>
  );
};

const LetterToFriendInput = () => {
  const { inputs } = useFunnelContext<PresentFunnelStepType, PresentFormMethodsType>();
  const { register, control } = inputs.presentFormMethods;

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
};

const PresentList = ({
  onlyPresentMessage,
  onSelectItem,
  selectedId,
  children,
}: {
  onlyPresentMessage: boolean;
  onSelectItem: (id: number) => void;
  selectedId?: number;
} & PropsWithChildren) => {
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
};

const NextButton = () => {
  const { nextStep, inputs } = useFunnelContext<PresentFunnelStepType, PresentFormMethodsType>();
  const { control, getValues } = inputs.presentFormMethods;
  const { isValid } = useFormState({ control });

  const handleNextStep = async () => {
    nextStep();
  };

  return (
    <Button disabled={!isValid} onClick={handleNextStep}>
      {'친구생일 축하해주기'}
    </Button>
  );
};

export default PresentForm;
