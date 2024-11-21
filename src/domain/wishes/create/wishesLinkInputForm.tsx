'use client';

import Button from '@/components/Common/Button';
import Calendar from '@/components/Common/Calendar/Calendar';
import DropDwonBox from '@/components/UI/DropDwonBox';
import InputForm from '@/components/UI/InputForm';
import { TextCount } from '@/components/UI/InputTextForm';
import RadioSelect from '@/components/UI/RadioSelect';
import { UploadImageBox } from '@/components/UI/UploadImageBox';
import { MAX_TEXTAREA_LENGTH } from '@/constant/input';
import { useRouters } from '@/hooks/common/useRouters';
import useToggle from '@/hooks/common/useToggle';
import { useUploadItemInfo } from '@/hooks/common/useUploadItemInfo';
import { getDate } from '@/utils/common/getDate';
import { wishesLinkDataResolver, WishesLinkDataResolverType } from '@/validation/wishes.validate';
import { useEffect } from 'react';
import { FormProvider, useForm, useFormContext, useWatch } from 'react-hook-form';
import { DropDownContent } from './component';
import InputTextarea from '@/components/Common/Input/inputTextarea';
import { wishesLinkInputInit } from '@/constant/init';
import { yupResolver } from '@hookform/resolvers/yup';

export default function WishesLinkInputForm({ wishTitle }: { wishTitle?: string }) {
  const savedWishesLinkDataMethods = useFormContext<WishesLinkDataResolverType>();
  const { formState } = savedWishesLinkDataMethods;
  const isValid = formState.isValid;
  const savedWishesLinkData = savedWishesLinkDataMethods.watch();

  return (
    <WishesLinkInputs wishTitle={wishTitle} progressWishesData={isValid && savedWishesLinkData} />
  );
}

export function WishesLinkInputs({
  wishTitle,
  progressWishesData,
}: {
  wishTitle: string;
  progressWishesData?: WishesLinkDataResolverType;
}) {
  const methods = useForm<WishesLinkDataResolverType>({
    mode: 'onChange',
    defaultValues: {
      ...wishesLinkInputInit,
      title: wishTitle,
    },
    resolver: yupResolver(wishesLinkDataResolver),
  });

  useEffect(() => {
    if (wishTitle) {
      methods.setValue('title', wishTitle);
    }
  }, [wishTitle]);

  const { reset, handleSubmit, watch } = methods;

  const { handleRouter } = useRouters();

  const parentContextMethods = useFormContext<WishesLinkDataResolverType>();

  useEffect(() => {
    const isEdit = !methods.formState.isDirty;

    if (progressWishesData && isEdit) {
      reset({ ...progressWishesData });
    }
  }, [progressWishesData]);

  function handleNextStep() {
    parentContextMethods.reset({
      ...watch(),
    });

    if (methods.watch('wantsGift')) {
      handleRouter('/wishes/create?step=account');
    } else {
      createOnlyLettersWishes();
    }
  }

  function createOnlyLettersWishes() {
    handleRouter('/wishes/create?step=preview');
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleNextStep)}>
        <ImageToBeShownToGiver />

        <InputForm title="내 생일 주간 설정하기">
          {/* 캘린더 안되는거 수정해야됨 */}
          <div className="flex justify-between gap-10">
            <WishesPeriod />
          </div>
        </InputForm>

        <HintMessageToGiver />
        <WantsGiftOption />
        <WishesLinkSubmitButton />
      </form>
    </FormProvider>
  );
}

function WishesPeriod() {
  const { control, setValue } = useFormContext<WishesLinkDataResolverType>();
  const [startDateWatch, endDateWatch] = useWatch({
    control,
    name: ['startDate', 'endDate'],
  });

  function handleChangeDate(selectedDate: Date) {
    setValue('startDate', selectedDate);
    setValue('endDate', getDate(selectedDate, 7));
  }

  return (
    <>
      <Calendar date={startDateWatch} handleChangeDate={handleChangeDate} />
      <Calendar date={endDateWatch} readOnly />
    </>
  );
}

export function ImageToBeShownToGiver() {
  const { imageUrl, uploadImageFile } = useUploadItemInfo();

  const { control, setValue } = useFormContext<WishesLinkDataResolverType>();

  function handleChangeImageUrl(imageUrl: string) {
    setValue('imageUrl', imageUrl);
  }

  const image = useWatch({
    control,
    name: 'imageUrl',
  });
  const {} = useFormContext<WishesLinkDataResolverType>();

  useEffect(() => {
    if (imageUrl) {
      handleChangeImageUrl(imageUrl);
    }
  }, [imageUrl]);

  return (
    <InputForm title={`링크에 들어온 친구가 보게 될\n 재밌는 이미지를 등록해보세요!`}>
      {/* refactor : 이미지 사이즈 찌그러지는거 변경해야됩니다! */}
      <UploadImageBox imageUrl={image} handleUploadImageFile={uploadImageFile} />;
    </InputForm>
  );
}

function HintMessageToGiver() {
  const { register, control } = useFormContext<WishesLinkDataResolverType>();

  const enteredText = useWatch({
    control,
    name: 'hint',
  }) as string;

  return (
    <InputForm title="친구에게 남기고 싶은 한마디">
      <InputTextarea register={register('hint')} placeholder="ex.) 생일을 축하합니다~">
        <TextCount textLength={enteredText.length} maxLength={MAX_TEXTAREA_LENGTH}></TextCount>
      </InputTextarea>
    </InputForm>
  );
}

function WantsGiftOption() {
  return (
    <InputForm title="생일 선물도 받고 싶어요!">
      <SelectWantsGiftOption />
    </InputForm>
  );
}

function SelectWantsGiftOption() {
  const {
    state: dropDownState,
    handleState: handleDropBoxState,
    changeState: changeDropBoxState,
  } = useToggle();

  const { control, setValue } = useFormContext<WishesLinkDataResolverType>();

  const selectOption = useWatch({
    control,
    name: 'wantsGift',
  }) as boolean;

  function handleChangeWantsGiftState(state: boolean) {
    setValue('wantsGift', state);
  }

  return (
    <>
      <ul className="flex flex-col gap-12 font-galmuri text-white">
        <li
          className={`w-full ${dropDownState && 'px-10 py-12'} bg-dark_green rounded-xl`}
          onClick={() => handleChangeWantsGiftState(true)}
        >
          <DropDwonBox isOpen={dropDownState} handleState={handleDropBoxState}>
            <RadioSelect isSelect={selectOption} />
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
          <RadioSelect isSelect={!selectOption} />
          아니요. 편지만 받을래요!
        </li>
      </ul>
    </>
  );
}

function WishesLinkSubmitButton() {
  const { formState } = useFormContext<WishesLinkDataResolverType>();

  return (
    <div className="flex justify-between gap-10">
      <Button fontColor="white" disabled>
        이전
      </Button>

      <Button type="submit" disabled={!formState.isValid}>
        다음
      </Button>
    </div>
  );
}
