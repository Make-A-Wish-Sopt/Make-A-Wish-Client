'use client';

import InputTextarea from '@/components/Common/Input/inputTextarea';
import { TextCount } from '@/components/UI/InputTextForm';
import { MAX_TEXTAREA_LENGTH } from '@/constant/input';
import { WishesLinkDataResolverType } from '@/validation/wishes.validate';
import { useFormContext, useWatch } from 'react-hook-form';

export default function MessageToGiver() {
  const { register, control } = useFormContext<WishesLinkDataResolverType>();

  const enteredText = useWatch({
    control,
    name: 'hint',
  }) as string;

  return (
    <InputTextarea
      register={register('hint')}
      placeholder={`너네 편지 안받아본지가...10년째\n편지 좀 작성해주겠니?`}
    >
      <TextCount textLength={enteredText.length} maxLength={MAX_TEXTAREA_LENGTH} />
    </InputTextarea>
  );
}
