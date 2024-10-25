'use client';

import { useForm, UseFormReturn, useWatch } from 'react-hook-form';
import InputForm from '@/components/UI/InputForm';
import Calendar from '@/components/Common/Calendar/Calendar';
import { useEffect, useState } from 'react';
import React from 'react';
import { useUploadItemInfo } from '@/hooks/wishes/useUploadItemInfo';
import { UploadImageBox } from '@/components/UI/UploadImageBox';
import Button from '@/components/Common/Button';
import RadioSelect from '@/components/UI/RadioSelect';
import DropDwonBox from '@/components/UI/DropDwonBox';
import useToggle from '@/hooks/common/useToggle';
import dynamic from 'next/dynamic';
import { WishesLinkDataType } from '@/types/input';
import { MAX_TEXTAREA_LENGTH } from '@/constant/input';
import InputTextForm from '@/components/UI/InputTextForm';
import { useRouter } from 'next/navigation';
import { WishesLinkResolverType } from '@/validation/wishes.validate';
import { getDate } from '@/utils/common/getDate';

const DropDownContent = dynamic(() => import('./dropdownContent'));

export default function WishesLinkInputForm({
  methods,
}: {
  methods?: UseFormReturn<WishesLinkResolverType, any, undefined>;
}) {
  const router = useRouter();
  const { toggleState: wantsGiftWatch, changeOpenState: changeWantsGiftWatchState } = useToggle();

  function handleNextStep() {
    const wishTitle = methods.getValues('title');

    if (wantsGiftWatch) {
      router.push(`/wishes/create?step=account&wishTitle=${wishTitle}`);
    } else {
      createOnlyLettersWishes();
    }
  }

  function handleSetImageUrl(imageUrl: string) {
    methods.setValue('imageUrl', imageUrl);
  }

  function createOnlyLettersWishes() {
    // try {
    //   postWishes(methods).then((response) => {
    //     if (response.data.success) {
    //       router.push('/wishes/share');
    //     }
    //   });
    // } catch (error) {}
  }

  function handleChangeDate(selectedDate: Date) {
    methods.setValue('startDate', selectedDate);
    methods.setValue('endDate', getDate(selectedDate, 7));
  }

  return (
    <>
      <form onSubmit={methods.handleSubmit(() => {})}>
        <ImageToShowToGiver handleSetImageUrl={handleSetImageUrl} />

        <InputTextForm<WishesLinkDataType>
          inputType="textarea"
          inputTitle="친구에게 남기고 싶은 한마디"
          register={methods.register('hint')}
          placeholder="ex.) 생일을 축하합니다~"
          maxLength={MAX_TEXTAREA_LENGTH}
        />

        <InputForm title="내 생일 주간 설정하기">
          <div className="flex justify-between gap-10">
            {/* <Calendar date={startDateWatch} handleChangeDate={handleChangeDate} />
            <Calendar date={endDateWatch} readOnly /> */}
          </div>
        </InputForm>

        <InputForm title="생일 선물도 받고 싶어요!">
          <SelectWantsGiftOption
            wantsGiftWatch={wantsGiftWatch}
            changeWantsGiftWatchState={changeWantsGiftWatchState}
          />
        </InputForm>

        <WishesLinkSubmitButton
          wantsGiftWatch={wantsGiftWatch}
          handleNextStep={handleNextStep}
          disabled={methods.formState.isValid}
        />
      </form>
    </>
  );
}

function WishesLinkSubmitButton({
  wantsGiftWatch,
  handleNextStep,
  disabled,
}: {
  wantsGiftWatch: boolean;
  handleNextStep: () => void;
  disabled: boolean;
}) {
  return (
    <div className="flex justify-between gap-10">
      {wantsGiftWatch && (
        <Button
          type="submit"
          bgColor="main_blue"
          fontColor="white"
          onClick={handleNextStep}
          disabled={true}
          styles={{ marginBottom: '5.8rem' }}
        >
          이전
        </Button>
      )}

      <Button
        type="submit"
        bgColor="main_blue"
        fontColor="white"
        onClick={handleNextStep}
        styles={{ marginBottom: '5.8rem' }}
        disabled={disabled}
      >
        {wantsGiftWatch ? '다음으로' : '소원링크 생성'}
      </Button>
    </div>
  );
}

const SelectWantsGiftOption = React.memo(function SelectWantsGiftOption({
  wantsGiftWatch,
  changeWantsGiftWatchState,
}: {
  wantsGiftWatch: boolean;
  changeWantsGiftWatchState: (state: boolean) => void;
}) {
  const {
    toggleState: dropDownState,
    handleToggle: handleDropBoxState,
    changeOpenState: changeDropBoxState,
  } = useToggle();

  function handleChangeWantsGiftState(state: boolean) {
    changeWantsGiftWatchState(state);
  }

  return (
    <ul className="flex flex-col gap-12 font-galmuri text-white">
      <li
        className="w-full bg-dark_green px-12 py-14 rounded-xl"
        onClick={() => handleChangeWantsGiftState(true)}
      >
        <DropDwonBox isOpen={dropDownState} handleToggle={handleDropBoxState}>
          <RadioSelect isSelect={wantsGiftWatch} />
          <span className="w-full">네! 생일 선물도 받아볼래요</span>
        </DropDwonBox>
        {dropDownState && <DropDownContent />}
      </li>

      <li
        className="flex items-center gap-8 w-full h-50 text-[14px] bg-dark_green round-xl px-10 py-14 rounded-xl"
        onClick={() => {
          handleChangeWantsGiftState(false);
          changeDropBoxState(false);
        }}
      >
        <RadioSelect isSelect={!wantsGiftWatch} />
        아니요. 편지만 받을래요!
      </li>
    </ul>
  );
});

function ImageToShowToGiver({
  handleSetImageUrl,
}: {
  handleSetImageUrl: (imageUrl: string) => void;
}) {
  const { imageUrl, uploadImageFile } = useUploadItemInfo();

  useEffect(() => {
    if (imageUrl) {
      handleSetImageUrl(imageUrl);
    }
  }, [imageUrl]);

  return (
    <InputForm title={`링크에 들어온 친구가 보게 될\n 재밌는 이미지를 등록해보세요!`}>
      <UploadImageBox imageUrl={imageUrl} handleUploadImageFile={uploadImageFile} />
    </InputForm>
  );
}
