'use client';

import InputText from '@/components/Common/Input/inputText';
import InputForm from '@/components/UI/InputForm';
import { useStepInputContext } from '@/context/stepInputContext';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { WishesDataType } from './wishes-create.container';
import InputTextarea from '@/components/Common/Input/inputTextarea';
import Text from '@/components/Common/Text';
import { MAX_HINT_LENGHT, MAX_PRICE_LENGHT, MAX_TITLE_LENGHT } from '@/constant/input';

interface WishesCreateStep2InputProps {
  methods: UseFormReturn<WishesDataType, any, undefined>;
}

export default function WishesCreateStep2Input(props: WishesCreateStep2InputProps) {
  const { methods } = props;
  const { changeNextBtnDisabledState } = useStepInputContext();

  useEffect(() => {
    if (
      methods.watch('step2.title') &&
      methods.watch('step2.hint') &&
      methods.watch('step2.startDate') &&
      methods.watch('step2.endDate')
    ) {
      changeNextBtnDisabledState(false);
    } else {
      changeNextBtnDisabledState(true);
    }
  }, [
    methods.watch('step2.title'),
    methods.watch('step2.hint'),
    methods.watch('step2.startDate'),
    methods.watch('step2.endDate'),
  ]);

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
        >
          <Text color="gray1" font="body14">{`${
            methods.watch('step2.title').toString().length
          }/${MAX_TITLE_LENGHT}`}</Text>
        </InputText>
      </InputForm>

      <InputForm title="선물에 대한 힌트 자유롭게 적어보기">
        <InputTextarea placeholder={'ex. 12,000,000'} register={methods.register('step2.hint')}>
          <Text color="gray1" font="body14" style={{ alignItems: 'right' }}>{`${
            methods.watch('step2.hint').toString().length
          }/${MAX_HINT_LENGHT}`}</Text>
        </InputTextarea>
      </InputForm>

      <InputForm title="내 생일주간 설정하기"></InputForm>
    </>
  );
}
