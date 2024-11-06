import { postWishes } from '@/api/wishes';
import Button from '@/components/Common/Button';
import Calendar from '@/components/Common/Calendar/Calendar';
import DropDwonBox from '@/components/UI/DropDwonBox';
import InputForm from '@/components/UI/InputForm';
import InputTextForm from '@/components/UI/InputTextForm';
import RadioSelect from '@/components/UI/RadioSelect';
import { UploadImageBox } from '@/components/UI/UploadImageBox';
import { MAX_TEXTAREA_LENGTH } from '@/constant/input';
import { useRouters } from '@/hooks/common/useRouters';
import useToggle from '@/hooks/common/useToggle';
import { useUploadItemInfo } from '@/hooks/wishes/useUploadItemInfo';
import { convertEncode } from '@/utils/common/convert';
import { getDate } from '@/utils/common/getDate';
import { WishesLinkResolverType } from '@/validation/wishes.validate';
import { useEffect } from 'react';
import { FormProvider, useFormContext, UseFormReturn, useWatch } from 'react-hook-form';
import { DropDownContent } from './component';

export default function WishesLinkInputForm({
  methods,
}: {
  methods: UseFormReturn<WishesLinkResolverType, any, undefined>;
}) {
  const { control, handleSubmit } = methods;

  const wantsGiftWatch = useWatch({
    control,
    name: 'wantsGift',
  }) as boolean;

  function handleChangeImageUrl(imageUrl: string) {
    methods.setValue('imageUrl', imageUrl);
  }

  //달력 최적화 해보자~
  const [startDateWatch, endDateWatch] = useWatch({
    control,
    name: ['startDate', 'endDate'],
  });

  function handleChangeDate(selectedDate: Date) {
    methods.setValue('startDate', selectedDate);
    methods.setValue('endDate', getDate(selectedDate, 7));
  }

  const { handleRouter } = useRouters();

  function handleNextStep() {
    if (wantsGiftWatch) {
      handleRouter(
        `/wishes/create?step=account&wishTitle=${convertEncode(
          process.env.NEXT_PUBLIC_WISHES_CREATE_ACCOUNT_KEY,
        )}`,
      );
    } else {
      createOnlyLettersWishes();
    }
  }

  function createOnlyLettersWishes() {
    try {
      postWishes(methods).then((response) => {
        if (response.data.success) {
          handleRouter('/wishes/share');
        }
      });
    } catch (error) {}
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleNextStep)}>
        <ImageToBeShownToGiver handleChangeImageUrl={handleChangeImageUrl} />

        <>
          <InputForm title="내 생일 주간 설정하기">
            {/* 캘린더 안되는거 수정해야됨 */}
            <div className="flex justify-between gap-10">
              <Calendar date={startDateWatch} handleChangeDate={handleChangeDate} />
              <Calendar date={endDateWatch} readOnly />
            </div>
          </InputForm>
        </>

        <HintMessageToGiver />
        <WantsGiftOption />
        <WishesLinkSubmitButton />
      </form>
    </FormProvider>
  );
}

function ImageToBeShownToGiver({
  handleChangeImageUrl,
}: {
  handleChangeImageUrl: (imageUrl: string) => void;
}) {
  const { imageUrl, uploadImageFile } = useUploadItemInfo();

  useEffect(() => {
    if (imageUrl) {
      handleChangeImageUrl(imageUrl);
    }
  }, [imageUrl]);

  return (
    <InputForm title={`링크에 들어온 친구가 보게 될\n 재밌는 이미지를 등록해보세요!`}>
      <UploadImageBox imageUrl={imageUrl} handleUploadImageFile={uploadImageFile} />;
    </InputForm>
  );
}

function HintMessageToGiver() {
  const { register, control } = useFormContext<WishesLinkResolverType>();

  return (
    <InputForm title="친구에게 남기고 싶은 한마디">
      <InputTextForm<WishesLinkResolverType>
        inputType="textarea"
        register={register('hint')}
        control={control}
        placeholder="ex.) 생일을 축하합니다~"
        maxLength={MAX_TEXTAREA_LENGTH}
      />
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

  const { control, setValue } = useFormContext<WishesLinkResolverType>();

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
          className="w-full bg-dark_green rounded-xl"
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
  const { control, formState } = useFormContext<WishesLinkResolverType>();

  const wantsGiftWatch = useWatch({
    control,
    name: 'wantsGift',
  }) as boolean;

  return (
    <div className="flex justify-between gap-10">
      {wantsGiftWatch && (
        <Button fontColor="white" disabled>
          이전
        </Button>
      )}

      <Button type="submit" fontColor="white" disabled={!formState.isValid}>
        {wantsGiftWatch ? '다음으로' : '소원링크 생성'}
      </Button>
    </div>
  );
}
