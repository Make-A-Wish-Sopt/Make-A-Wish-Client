'use client';

import InputText from '@/components/Common/Input/inputText';
import InputForm from '@/components/UI/InputForm';
import { useStepInputContext } from '@/context/stepInputContext';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { WishesDataType } from './wishes-create.container';

interface WishesCreateStep1InputProps {
  methods: UseFormReturn<WishesDataType, any, undefined>;
}

export default function WishesCreateStep1Input(props: WishesCreateStep1InputProps) {
  const { methods } = props;
  const { changeNextBtnDisabledState } = useStepInputContext();

  useEffect(() => {
    if (
      methods.watch('step1.image') &&
      methods.watch('step1.initial') &&
      methods.watch('step1.price')
    ) {
      changeNextBtnDisabledState(false);
    } else {
      changeNextBtnDisabledState(true);
    }
  }, [methods.watch('step1.image'), methods.watch('step1.initial'), methods.watch('step1.price')]);

  return (
    <>
      <InputForm title="갖고 싶은 선물 이미지 등록하기">
        <InputText placeholder={'ex. 12,000,000'} register={methods.register('step1.image')} />
      </InputForm>

      <InputForm title="선물 가격 입력하기">
        <InputText placeholder={'ex. 12,000,000'} register={methods.register('step1.price')} />
      </InputForm>

      <InputForm title="선물의 초성 입력하기">
        <InputText
          placeholder={'ex. 애플워치 >> ㅇㅍㅇㅊ'}
          register={methods.register('step1.initial')}
        />
      </InputForm>
    </>
  );
}
