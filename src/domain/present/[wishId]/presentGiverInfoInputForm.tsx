'use client';

import InputText from '@/components/Common/Input/inputText';
import InputForm from '@/components/UI/InputForm';
import InputTextForm from '@/components/UI/InputTextForm';
import { MAX_TEXTAREA_LENGTH } from '@/constant/input';
import { PresentDataResolverType } from '@/validation/present.validate';
import { PropsWithChildren } from 'react';
import { useFormContext } from 'react-hook-form';

export default function PresentGiverInfoInputForm({ children }: PropsWithChildren) {
  const { register, control } = useFormContext<PresentDataResolverType>();

  return (
    <>
      <InputForm title="본인의 닉네임 작성하기">
        <InputText
          register={register('name')}
          placeholder="당신의 이름이나 별명을 편하게 작성해주세요"
        />
      </InputForm>
      {children}

      <InputForm title="친구에게 편지남기기">
        <InputTextForm
          inputType="textarea"
          register={register('message')}
          control={control}
          placeholder="ex.) 생일을 축하합니다~"
          maxLength={MAX_TEXTAREA_LENGTH}
        />
      </InputForm>
    </>
  );
}
