'use client';

import { useFunnelContext } from '@/Context/FunnelContext';
import { FormProvider, useForm, useFormContext, useFormState, useWatch } from 'react-hook-form';
import { memo, useEffect } from 'react';
import { getDate } from '@/utils/common/getDate';
import Button from '@/components/Elements/Button';
import { postWishes } from '@/api/wishes';
import { useRouters } from '@/hooks/useRouters';
import {
  BirthdayWeekRangeSetter,
  ImageUploadBox,
  MessageToFriend,
  WantsGiftOption,
} from '@/app/_components/Form/wish/WishDataForm';
import { Step } from '@/components/Modules/Funnel';
import { WishesFormSchema, WishesFormScehmaType } from '@/Schema/wishes.schema';
import InputForm from '@/components/UI/InputForm';
import { WishesFunnelStepType } from '@/constant/funnelStep';
import { wishesFormInitValues } from '@/constant/init';
import { useSearchParams } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFetch } from '@/hooks/useFetch';
import Loading from '@/app/loading';
import { LoadingCake } from '@/components/Elements/Modal/ValidateLoadingModal';

const WishesFormStep = () => {
  const searchParams = useSearchParams();
  const wishTitle = searchParams.get('wishTitle');
  const wishesFormMethods = useForm<WishesFormScehmaType>({
    mode: 'onChange',
    defaultValues: { ...wishesFormInitValues, title: wishTitle },
    resolver: yupResolver(WishesFormSchema),
  });
  const { setValue } = wishesFormMethods;

  const handleChangeDate = (selectedDate: Date) => {
    setValue('startDate', selectedDate);
    setValue('endDate', getDate(selectedDate, 7));
  };

  const handleChangeOption = (state: boolean) => {
    setValue('wantsGift', state);
  };

  const handleSetImage = (imageUrl: string) => {
    setValue('imageUrl', imageUrl, { shouldValidate: true });
  };

  return (
    <FormProvider {...wishesFormMethods}>
      <InputForm title="생일 선물도 받고 싶어요!">
        <WantsGiftOption handleChangeOption={handleChangeOption} />
      </InputForm>

      <InputForm title="링크에 들어온 친구가 보게 될\n재밌는 이미지를 등록해보세요!">
        <ImageUploadBox handleSetImage={handleSetImage} />
      </InputForm>

      <InputForm title="친구에게 남기고 싶은 한마디">
        <MessageToFriend />
      </InputForm>

      <InputForm title="내 생일 주간 설정하기">
        <BirthdayWeekRangeSetter handleChangeDate={handleChangeDate} />
      </InputForm>

      <WishesFormButtons />
    </FormProvider>
  );
};

const WishesFormButtons = memo(() => {
  const { handleDelayRouter, LoadingModal } = useRouters();
  const { PrevButton, setSharedData, nextStep, getSharedData } =
    useFunnelContext<WishesFunnelStepType>();
  const { control, getValues, reset } = useFormContext<WishesFormScehmaType>();
  const { isValid } = useFormState({ control });
  const wantsGift = useWatch({
    control,
    name: 'wantsGift',
  });

  const { fetchData } = useFetch(postWishes);

  useEffect(() => {
    const savedData = getSharedData('wishes') as WishesFormScehmaType;
    if (savedData) {
      reset(savedData);
    }
  }, []);

  // 🎯 생일잔치 데이터를 백엔드에 보내고 완료 페이지로 이동
  const submitWishAndGoToComplete = async (wishFormData: WishesFormScehmaType) => {
    const response = await fetchData(wishFormData);
    if (!response.data.success) return;

    handleDelayRouter('/wishes/create/complete');
  };

  // 🎯 다음 단계로만 이동
  const proceedToNextStep = () => {
    nextStep();
  };

  // 🎯 전체 흐름 처리
  const handleNextFlow = async () => {
    const wishFormData = getValues();

    if (wishFormData.wantsGift) {
      setSharedData((prev) => ({
        ...prev,
        wishes: { ...getValues() },
      }));
      proceedToNextStep();
    } else {
      await submitWishAndGoToComplete(wishFormData);
    }
  };

  return (
    <>
      <Step.ButtonWrapper horizontal className="gap-10 mb-24">
        <PrevButton />
        <Button disabled={!isValid} onClick={handleNextFlow}>
          {wantsGift ? '다음' : '생일잔치 생성'}
        </Button>
      </Step.ButtonWrapper>
      <LoadingModal render={<LoadingCake text="생성 중" />} />
    </>
  );
});

export default WishesFormStep;
