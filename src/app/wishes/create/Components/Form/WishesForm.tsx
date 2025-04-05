'use client';

import { Step } from '@/components/Modules/Funnel';
import { useFunnelContext } from '@/Context/FunnelContext';
import { WishCreateFormMethodsType } from '../FunnelContainer';
import { Controller, useFormState, useWatch } from 'react-hook-form';
import useBoolean from '@/hooks/useBoolean';
import InputForm from '@/components/UI/InputForm';
import DropDwonBox from '@/components/UI/DropDwonBox';
import RadioSelect from '@/components/UI/RadioSelect';
import DropDownPresentList from '@/components/UI/DropDownPresentList';
import { memo, useEffect } from 'react';
import { UploadImageBox } from '@/components/UI/UploadImageBox';
import useUploadItemInfo from '@/hooks/useUploadItemInfo';
import InputTextarea from '@/components/Elements/Input/inputTextarea';
import { TextCount } from '@/components/UI/InputTextForm';
import { MAX_TEXTAREA_LENGTH } from '@/constant/input';
import CalendarButton from '@/components/Elements/Calendar/CalendarButton';
import { getDate } from '@/utils/common/getDate';
import Button from '@/components/Elements/Button';
import { WishesFunnelStepType } from '../../page';
import { postWishes } from '@/api/wishes';

const WishesForm = () => {
  return (
    <>
      <WantsGiftOption />
      <ImageUploadBox />
      <친구에게한마디 />
      <생일주간설정 />

      <Step.ButtonWrapper horizontal className="gap-10">
        <PrevButton />
        <NextButton />
      </Step.ButtonWrapper>
    </>
  );
};

const WantsGiftOption = memo(() => {
  const guideOepn = useBoolean();
  const selectedOption = useBoolean(true);
  const { inputs } = useFunnelContext<WishesFunnelStepType, WishCreateFormMethodsType>();
  const wishesFormInput = inputs.wishesFormInput;
  const { setValue } = wishesFormInput;

  useEffect(() => {
    setValue('wantsGift', selectedOption.state);
  }, [selectedOption.state]);

  return (
    <InputForm title="생일 선물도 받고 싶어요!">
      <ul className="flex flex-col gap-12 font-galmuri text-white">
        <li
          className={`flex flex-col w-full bg-dark_green rounded-xl duration-300 cursor-pointer`}
          onClick={() => {
            selectedOption.changeState(true);
          }}
          style={{
            maxHeight: guideOepn.state ? '415px' : '50px',
            transition: 'max-height 0.3s ease-out, opacity 0.3s ease-out',
          }}
        >
          <div>
            <DropDwonBox isOpen={guideOepn.state} changeOpenState={guideOepn.handleState}>
              <RadioSelect isSelect={selectedOption.state} />
              <span className="w-full">네! 생일 선물도 받아볼래요</span>
            </DropDwonBox>
          </div>
          <div
            className="duration-300"
            style={{
              opacity: guideOepn.state ? 1 : 0,
              visibility: guideOepn.state ? 'visible' : 'hidden',
            }}
          >
            {selectedOption.state && <DropDownPresentList />}
          </div>
        </li>

        <li
          className="flex items-center gap-8 w-full h-50 text-[14px] bg-dark_green round-xl px-10 py-14 rounded-xl cursor-pointer"
          onClick={() => {
            selectedOption.changeState(false);

            guideOepn.changeState(false);
          }}
        >
          <RadioSelect isSelect={!selectedOption.state} />
          아니요. 편지만 받을래요!
        </li>
      </ul>
    </InputForm>
  );
});

const ImageUploadBox = memo(() => {
  const { inputs } = useFunnelContext<WishesFunnelStepType, WishCreateFormMethodsType>();
  const wishesFormInput = inputs.wishesFormInput;
  const { setValue, control } = wishesFormInput;
  const { imageUrl, preview, uploadImageFile } = useUploadItemInfo();

  const image = useWatch({
    control,
    name: 'imageUrl',
  });

  useEffect(() => {
    if (!imageUrl) return;

    setValue('imageUrl', imageUrl, { shouldValidate: true });
  }, [imageUrl]);
  const getPreviewImage = () => {
    return image ? image : preview;
  };

  return (
    <InputForm title={`링크에 들어온 친구가 보게 될\n 재밌는 이미지를 등록해보세요!`}>
      <UploadImageBox imageUrl={getPreviewImage()} handleUploadImageFile={uploadImageFile} />
    </InputForm>
  );
});

const 친구에게한마디 = memo(() => {
  const { inputs } = useFunnelContext<WishesFunnelStepType, WishCreateFormMethodsType>();
  const wishesFormInput = inputs.wishesFormInput;
  const { control } = wishesFormInput;

  return (
    <InputForm title="친구에게 남기고 싶은 한마디">
      <Controller
        name="hint"
        control={control}
        render={({ field }) => (
          <InputTextarea
            value={field.value || ''}
            onChange={field.onChange}
            placeholder={`너네 편지 안받아본지가...10년째\n편지 좀 작성해주겠니?`}
          >
            <TextCount textLength={field.value?.length || 0} maxLength={MAX_TEXTAREA_LENGTH} />
          </InputTextarea>
        )}
      />
    </InputForm>
  );
});

const 생일주간설정 = memo(({ disabled }: { disabled?: boolean }) => {
  const { inputs } = useFunnelContext<WishesFunnelStepType, WishCreateFormMethodsType>();
  const wishesFormInput = inputs.wishesFormInput;
  const { control, setValue } = wishesFormInput;

  const [startDate, endDate] = useWatch({
    control,
    name: ['startDate', 'endDate'],
  });

  function handleChangeDate(selectedDate: Date) {
    setValue('startDate', selectedDate);
    setValue('endDate', getDate(selectedDate, 7));
  }

  return (
    <InputForm title="내 생일 주간 설정하기">
      <div className="flex justify-between gap-10">
        <CalendarButton date={startDate} handleChangeDate={handleChangeDate} readonly={disabled} />
        <CalendarButton date={endDate} readonly />
      </div>
    </InputForm>
  );
});

const PrevButton = () => {
  const { PrevButton } = useFunnelContext<WishesFunnelStepType, WishCreateFormMethodsType>();

  return <PrevButton />;
};

const NextButton = () => {
  const { nextStep, inputs } = useFunnelContext<WishesFunnelStepType, WishCreateFormMethodsType>();
  const wishesFormInput = inputs.wishesFormInput;
  const { control, getValues } = wishesFormInput;
  const { isValid } = useFormState({ control });
  const wantsGift = useWatch({
    control,
    name: 'wantsGift',
  });

  const handleNextStep = async () => {
    if (wantsGift) {
      nextStep();
    } else {
      // const 생일잔치게시 = await postWishes(getValues());
      // const 생일잔치게시성공 = 생일잔치게시.data.success;

      // if (!생일잔치게시성공) return;

      nextStep('complete');
    }
  };

  return (
    <Button disabled={!isValid} onClick={handleNextStep}>
      {wantsGift ? '다음' : '소원생성'}
    </Button>
  );
};

export default WishesForm;
