'use client';

import Button from '@/components/Common/Button';
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
import { PropsWithChildren, useEffect } from 'react';
import { FormProvider, useForm, useFormContext, UseFormReturn, useWatch } from 'react-hook-form';
import { DropDownContent } from './component';
import InputTextarea from '@/components/Common/Input/inputTextarea';
import { wishesLinkInputInit } from '@/constant/init';
import { yupResolver } from '@hookform/resolvers/yup';
import { putProgressWishes } from '@/api/wishes';
import CalendarInput from '@/components/Common/Calendar/CalendarInput';

export default function WishesLinkInputForm({ wishTitle }: { wishTitle?: string }) {
  const savedWishesLinkDataMethods = useFormContext<WishesLinkDataResolverType>();
  const { formState } = savedWishesLinkDataMethods;
  const isValid = formState.isValid;
  const savedWishesLinkData = savedWishesLinkDataMethods.watch();

  return (
    <WishesLinkInputs wishTitle={wishTitle} progressWishesData={isValid && savedWishesLinkData}>
      <WishesLinkSubmitButton savedWishesLinkDataMethods={savedWishesLinkDataMethods} />
    </WishesLinkInputs>
  );
}

export function WishesLinkInputs({
  wishTitle,
  progressWishesData,
  children,
}: {
  wishTitle: string;
  progressWishesData?: WishesLinkDataResolverType;
} & PropsWithChildren) {
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

  const { reset } = methods;

  useEffect(() => {
    const isEdit = !methods.formState.isDirty;

    if (progressWishesData && isEdit) {
      reset({
        ...progressWishesData,
        startDate: new Date(progressWishesData.startDate),
        endDate: new Date(progressWishesData.endDate),
      });
    }
  }, [progressWishesData]);

  return (
    <FormProvider {...methods}>
      <ImageToBeShownToGiver />

      <InputForm title="내 생일 주간 설정하기">
        <div className="flex justify-between gap-10">
          <WishesPeriod />
        </div>
      </InputForm>

      <HintMessageToGiver />
      <WantsGiftOption />

      {children}
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
      <CalendarInput date={startDateWatch} handleChangeDate={handleChangeDate} />
      <CalendarInput date={endDateWatch} readonly />
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
          className={`flex flex-col w-full bg-dark_green rounded-xl duration-300`}
          onClick={() => handleChangeWantsGiftState(true)}
          style={{
            maxHeight: dropDownState ? '415px' : '50px',
            transition: 'max-height 0.5s ease-out, opacity 0.3s ease-out',
          }}
        >
          <div>
            <DropDwonBox isOpen={dropDownState} handleState={handleDropBoxState}>
              <RadioSelect isSelect={selectOption} />
              <span className="w-full">네! 생일 선물도 받아볼래요</span>
            </DropDwonBox>
          </div>
          <div
            className="duration-300"
            style={{
              opacity: dropDownState ? 1 : 0,
              visibility: dropDownState ? 'visible' : 'hidden',
            }}
          >
            <DropDownContent />
          </div>
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

function WishesLinkSubmitButton({
  savedWishesLinkDataMethods,
}: {
  savedWishesLinkDataMethods: UseFormReturn<WishesLinkDataResolverType>;
}) {
  const { formState, watch } = useFormContext<WishesLinkDataResolverType>();
  const { handleRouter } = useRouters();

  function handleClickNext() {
    savedWishesLinkDataMethods.reset({
      ...watch(),
    });

    if (watch('wantsGift')) {
      handleRouter('/wishes/create?step=preview');
    } else {
      createOnlyLettersWishes();
    }
  }

  function createOnlyLettersWishes() {
    handleRouter('/wishes/create?step=preview');
  }

  return (
    <div className="flex justify-between gap-10 pb-58">
      <Button fontColor="white" disabled>
        이전
      </Button>

      <Button onClick={handleClickNext} disabled={!formState.isValid}>
        다음
      </Button>
    </div>
  );
}

export function WishesLinkEditSubmitButton() {
  const { formState, watch } = useFormContext<WishesLinkDataResolverType>();
  const editWishesLinkData = watch();
  const { handleBack } = useRouters();

  function handleEditWisheLink() {
    putProgressWishes(editWishesLinkData).then((response) => {
      response.success && alert('소원정보 수정완료!');
      handleBack();
    });
  }

  return (
    <div className="pb-58">
      <Button onClick={handleEditWisheLink} disabled={!formState.isValid}>
        수정 완료
      </Button>
    </div>
  );
}
