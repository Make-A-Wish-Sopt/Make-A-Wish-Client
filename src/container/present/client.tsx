'use client';

import { ReactNode } from 'react';
import { useStepInputContext } from '@/context/stepInputContext';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { PresentDatType } from '@/types/input';
import useToggle from '@/hooks/common/useToggle';
import InputForm from '@/components/UI/InputForm';
import InputTextForm, { TextCount } from '@/components/UI/InputTextForm';
import PresentList from '@/components/UI/PresentList';
import Box from '@/components/Common/Box';
import CheckBox from '@/components/UI/CheckBox';
import { MAX_TEXTAREA_LENGTH } from '@/constant/input';
import Button from '@/components/Common/Button';
import { BANK_LIST, PAY_LIST } from '@/constant/bankList';
import useSelectItem from '@/hooks/common/useSelectItem';
import RadioSelect from '@/components/UI/RadioSelect';
import { CheckPresentItem, MessageFromWisheMaker } from './server';
import { presentList } from '@/constant/presentList';
import { BankListType } from '@/types/bankListType';

export default function PresentForm({ children }: { children?: ReactNode }) {
  const { step } = useStepInputContext();

  return (
    <>
      {
        {
          2: (
            <>
              <MessageFromWisheMaker />
              <GiverInfoInputForm />
            </>
          ),
          1: (
            <>
              <CheckPresentItem item={presentList[1]} />
              <SelectPayment />
            </>
          ),
        }[step]
      }
    </>
  );
}

function GiverInfoInputForm() {
  const methods = useForm<PresentDatType>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      message: '',
    },
  });

  // const { register, handleSubmit } = useForm<PresentDatType>({
  //   mode: 'onChange',
  //   defaultValues: {
  //     name: '',
  //     message: '',
  //   },
  // });

  const { toggleState, handleToggle } = useToggle();
  const { nextBtnDisabled } = useStepInputContext();

  function onSubmit() {
    // if (publicWishesData.wishesType) {
    //   nextStep();
    // } else {
    //   nextStep();
    // }
  }

  const control = methods.control;

  const messageCount = useWatch({
    control,
    name: 'message',
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <InputTextForm<PresentDatType>
          inputType="text"
          inputTitle="본인의 닉네임 작성하기"
          registerName="name"
          placeholder="당신의 이름이나 별명을 편하게 작성해주세요"
        />

        <InputForm title="선물하고 싶은 항목 선택하기">
          <PresentList />
          <Box bgColor="dark_green" fontColor="gray2" styles={{ marginTop: '0.6rem' }}>
            <CheckBox
              checkBoxState={toggleState}
              checkBoxText="편지만 보낼게요"
              handleClickFn={handleToggle}
            />
          </Box>
        </InputForm>

        <InputTextForm<PresentDatType>
          inputType="textarea"
          inputTitle="친구에게 편지 남기기"
          registerName="message"
          placeholder="ex.) 생일을 축하합니다~"
        >
          <TextCount textLength={messageCount.length} maxLength={MAX_TEXTAREA_LENGTH} />
        </InputTextForm>

        <Button
          type="submit"
          bgColor="main_blue"
          fontColor="white"
          styles={{ marginBottom: '5.8rem' }}
          disabled={nextBtnDisabled}
        >
          친구 생일 축하해주기
        </Button>
      </form>
    </FormProvider>
  );
}

function SelectPayment() {
  const { selectedId, isSelected, handleSelectOne } = useSelectItem();

  const handleDeepLink = (payment: BankListType | undefined) => {
    const ua = navigator.userAgent.toLowerCase();

    // if (!selectedPayment) {
    //   alert('결제수단을 선택해주세요!');
    //   return;
    // }

    if (window.confirm(`${payment?.name}(으)로 이동할까요?`)) {
      if (payment?.name === '토스뱅크') {
        // window.open(
        //   ua.indexOf('android') > -1
        //     ? 'https://play.google.com/store/apps/details?id=viva.republica.toss'
        //     : 'https://apps.apple.com/app/id839333328',
        // );
        window.open('toss://');
      }

      if (payment?.name === '카카오뱅크') {
        // window.open(
        //   ua.indexOf('android') > -1
        //     ? 'https://play.google.com/store/apps/details?id=com.kakaobank.channel'
        //     : 'https://apps.apple.com/app/id1258016944',
        // );
        window.open('kakaobank://');
      }
    }
  };

  return (
    <>
      <InputForm title="결제수단 선택">
        <ul className="flex flex-col gap-12 font-galmuri text-white">
          {PAY_LIST.map((payment) => (
            <li
              className="flex items-center gap-8 w-full h-50 text-[14px] bg-dark_green round-xl px-10 py-14 rounded-xl"
              onClick={() => {
                handleSelectOne(payment.id);
              }}
              key={payment.name}
            >
              <RadioSelect isSelect={isSelected(payment.id)} />
              {payment.name}
            </li>
          ))}
        </ul>
      </InputForm>
      <Button onClick={() => handleDeepLink(BANK_LIST[5])}>친구 계좌로 선물하기</Button>
    </>
  );
}
