'use client';

import { putProgressWishes } from '@/api/wishes';
import {
  BirthdayWeekRangeSetter,
  ImageUploadBox,
  MessageToFriend,
  WantsGiftOption,
} from '@/app/_components/Form/wish/WishDataForm';
import Button from '@/components/Elements/Button';
import { Step } from '@/components/Modules/Funnel';
import InputForm from '@/components/UI/InputForm';
import { useRouters } from '@/hooks/useRouters';
import { TransferInfoType, WishStatusType } from '@/types/wishesType';
import { WishesFormSchema, WishesFormScehmaType } from '@/Schema/wishes.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { memo, PropsWithChildren } from 'react';
import { FormProvider, useForm, useFormContext, useFormState } from 'react-hook-form';
import { toast } from 'sonner';

export function WisheEditFormFormProvider({
  progressWishesData,

  children,
}: {
  progressWishesData: WishesFormScehmaType;
} & PropsWithChildren) {
  const wishesFormMethods = useForm<WishesFormScehmaType>({
    mode: 'onChange',
    defaultValues: {
      ...progressWishesData,
      startDate: new Date(progressWishesData.startDate),
      endDate: new Date(progressWishesData.endDate),
    },
    resolver: yupResolver(WishesFormSchema),
  });

  return <FormProvider {...wishesFormMethods}>{children}</FormProvider>;
}

const WishesEditFormButton = memo(
  ({ disabled, onNextClick }: { disabled: boolean; onNextClick: () => void }) => {
    return (
      <Step.ButtonWrapper className="mb-24">
        <Button disabled={disabled} onClick={onNextClick}>
          수정 완료
        </Button>
      </Step.ButtonWrapper>
    );
  },
);

export function WishEditForm({
  wishStatus,
  transferInfo,
}: {
  wishStatus: WishStatusType;
  transferInfo: TransferInfoType;
}) {
  const { handleBack } = useRouters();
  const { control, getValues } = useFormContext<WishesFormScehmaType>();
  const { isValid, isDirty } = useFormState({ control });

  const handleEditWisheLink = async () => {
    const editWishFormData = getValues();

    const editFormData = {
      ...editWishFormData,
      transferInfo: {
        ...transferInfo,
      },
    };

    const response = await putProgressWishes(editFormData);

    console.log(response);

    // if (!response) {
    //   toast.error('생일잔치정보를 수정시 오류가 발생했어요ㅠㅠ');
    // } else {
    //   toast.success('생일잔치정보 수정완료!!');
    //   setTimeout(() => {
    //     handleBack();
    //   }, 1000);
    // }
  };

  return (
    <>
      <InputForm title="생일 선물도 받고 싶어요!">
        <WantsGiftOption />
      </InputForm>

      <InputForm title={`링크에 들어온 친구가 보게 될\n재밌는 이미지를 등록해보세요!`}>
        <ImageUploadBox />
      </InputForm>

      <InputForm title="친구에게 남기고 싶은 한마디">
        <MessageToFriend />
      </InputForm>

      <InputForm title="내 생일 주간 설정하기">
        <BirthdayWeekRangeSetter disabled={wishStatus === 'WHILE' || wishStatus === 'END'} />
      </InputForm>

      <WishesEditFormButton
        disabled={!isValid || !isDirty}
        onNextClick={() => handleEditWisheLink()}
      />
    </>
  );
}
