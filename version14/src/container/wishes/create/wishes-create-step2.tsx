'use client';

import InputText from '@/components/Common/Input/inputText';
import InputForm from '@/components/UI/InputForm';
import { useStepInputContext } from '@/context/stepInputContext';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { WishesDataType } from './wishes-create.container';
import InputTextarea from '@/components/Common/Input/inputTextarea';

interface WishesCreateStep2InputProps {
  methods: UseFormReturn<WishesDataType, any, undefined>;
}

export default function WishesCreateStep2Input(props: WishesCreateStep2InputProps) {
  const { methods } = props;
  const { changeNextBtnDisabledState } = useStepInputContext();

  useEffect(() => {
    if (true) {
      changeNextBtnDisabledState(false);
    } else {
      changeNextBtnDisabledState(true);
    }
  }, []);

  return (
    <>
      <InputForm title="소원 링크 제목 작성하기">
        <InputText
          placeholder={'ex. ㅇㅇ의생일 축하펀딩'}
          register={methods.register('step2.title', {
            required: 'Title is required',
            maxLength: {
              value: 20,
              message: 'Your password is too short.',
            },
          })}
        />
      </InputForm>

      <InputForm title="선물에 대한 힌트 자유롭게 적어보기">
        <InputTextarea placeholder={'ex. 12,000,000'} register={methods.register('step2.hint')} />
      </InputForm>

      <InputForm title="내 생일주간 설정하기"></InputForm>
    </>
  );
}
