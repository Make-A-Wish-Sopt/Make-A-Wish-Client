'use client';

import InputText from '@/components/Common/Input/inputText';
import InputTextarea from '@/components/Common/Input/inputTextarea';
import InputForm from '@/components/UI/InputForm';
import { UploadImageBox } from '@/components/UI/UploadImageBox';
import { useGetPublicWishes } from '@/hooks/queries/public';
import { PresentDatType } from '@/types/input';
import { useForm } from 'react-hook-form';
import PresentList from '@/components/UI/PresentList';
import Box from '@/components/Common/Box';
import CheckBox from '@/components/UI/CheckBox';
import useToggle from '@/hooks/common/useToggle';
import { colors } from '@/styles/styles';
import Button from '@/components/Common/Button';
import { useStepInputContext } from '@/context/stepInputContext';
import { convertMoneyText } from '@/utils/common/convertMoneyText';
import RadioSelect from '@/components/UI/RadioSelect';
import { PAY_LIST } from '@/constant/bankList';
import { Suspense, useState } from 'react';
import { presentList } from '@/constant/presentList';
import Image from 'next/image';
import Loading from '@/app/loading';

function Payment({ presentId }: { presentId: number }) {
  const [selectedId, setSelectedId] = useState(0);

  function handleClick(id: number) {
    setSelectedId(id);
  }

  function isSelected(id: number) {
    return selectedId === id;
  }
  return (
    <>
      {/* Client */}

      <InputForm title="결제수단 선택">
        <ul className="flex flex-col gap-12 font-galmuri text-white">
          {PAY_LIST.map((payment) => (
            <li
              className="flex items-center gap-8 w-full h-50 text-[14px] bg-dark_green round-xl px-10 py-14 rounded-xl"
              onClick={() => {
                handleClick(payment.id);
              }}
              key={payment.name}
            >
              <RadioSelect isSelect={isSelected(payment.id)} />
              {payment.name}
            </li>
          ))}
        </ul>
      </InputForm>
    </>
  );
}

export default function PresentContainer() {
  // const wishesId = '205';
  // const router = useRouter();

  // const { publicWishesData } = useGetPublicWishes(wishesId);
  const { step, nextStep } = useStepInputContext();

  const publicWishesData: any = {
    accountNumber: '3521010484343',
    bank: '농협은행',
    name: '홍명헌',
    dayCount: 5,
    title: '안녕하세요',
    hint: '힌트',
    wishesType: true,
  };

  const methods = useForm<PresentDatType>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      message: '',
    },
  });

  function handleClickPresent() {
    if (publicWishesData.wishesType) {
      nextStep();
    } else {
      nextStep();
    }
  }

  const test = methods.register('name');

  return (
    <>
      {/* {
        {
          1: <Payment presentId={1} />,
        }[step]
      } */}

      {/* Server */}
      {/* 스켈레톤도 해보자 */}
      <Suspense fallback={<Loading />}>
        <h3 className="font-bitbit text-main_blue text-[24px] mt-33 whitespace-pre-line">
          {publicWishesData?.title}
        </h3>

        <Box
          bgColor="background"
          fontColor="gray1"
          font="galmuri"
          styles={{
            height: 'auto',
            minHeight: '5rem',
            padding: '1.2rem',
            margin: '2rem 0',
            border: `1px solid ${colors.dark_green}`,
          }}
        >
          <span className="text-[14px] text-gray1">{publicWishesData?.hint}</span>
        </Box>

        {/* 이미지값 넣어줘야해요! */}
        <div className="mb-30">
          <UploadImageBox preSignedImageUrl={''} />
        </div>
      </Suspense>

      <InputForm title="본인의 닉네임 작성하기">
        <InputText
          register={methods.register('name')}
          placeholder="당신의 이름이나 별명을 편하게 작성해주세요"
        ></InputText>
      </InputForm>

      {/* <InputForm title="선물하고 싶은 항목 선택하기">
        <PresentList />
        <Box bgColor="dark_green" fontColor="gray2" styles={{ marginTop: '0.6rem' }}>
          <CheckBox
            checkBoxState={toggleState}
            checkBoxText="편지만 보낼게요"
            handleClickFn={handleToggle}
          />
        </Box>
      </InputForm> */}

      {/* <InputForm title="친구에게 편지 남기기">
        <InputTextarea register={methods.register('message')}>
          <span className="font-galmuri text-[12px] text-gray2">{`${
            methods.watch('message').toString().length
          }/${MAX_HINT_LENGHT}`}</span>
        </InputTextarea>
      </InputForm> */}

      <Button
        bgColor="main_blue"
        fontColor="white"
        styles={{ marginBottom: '5.8rem' }}
        onClick={handleClickPresent}
      >
        친구 생일 축하해주기
      </Button>
    </>
  );
}
