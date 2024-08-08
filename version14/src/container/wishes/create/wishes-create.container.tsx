'use client';

import { useStepInputContext } from '@/context/stepInputContext';
import Text from '@/components/Common/Text';
import { useForm } from 'react-hook-form';
import WishesCreateStep1Input from './wishes-create-step1';
import WishesCreateStep2Input from './wishes-create-step2';

export interface WishesDataType {
  step1: Step1Type;
  step2: Step2Type;
  step3: Step3Type;
}

export type Step1Type = {
  image: string;
  price: number;
  initial: string;
};

export type Step2Type = {
  title: string;
  hint: string;
  startDate: Date;
  endDate: Date;
};

export type Step3Type = {
  ownerName: string;
  bank: string;
  account: string;
  phone: string;
};

export default function WishesCreateContainer() {
  const { step } = useStepInputContext();

  const methods = useForm<WishesDataType>({
    defaultValues: {
      step1: {
        image: '',
        price: 0,
        initial: '',
      },
      step2: {
        title: '',
        hint: '',
        startDate: new Date(),
        endDate: new Date(),
      },
      step3: {
        ownerName: '',
        bank: '',
        account: '',
        phone: '',
      },
    },
  });

  return (
    <>
      <Text as="h2" color="main_blue" font="headline24_100" style={{ margin: '2.4rem 0 2rem' }}>
        소원 링크 생성하기
      </Text>
      {
        {
          1: <WishesCreateStep1Input methods={methods} />,
          2: <WishesCreateStep2Input methods={methods} />,
        }[step]
      }
    </>
  );
}
