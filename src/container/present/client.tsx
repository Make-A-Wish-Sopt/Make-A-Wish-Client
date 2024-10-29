'use client';

import { useForm, UseFormReturn } from 'react-hook-form';
import { PresentDataType } from '@/types/input';
import InputForm from '@/components/UI/InputForm';
import InputTextForm from '@/components/UI/InputTextForm';
import PresentList from '@/components/UI/PresentList';
import Box from '@/components/Common/Box';
import CheckBox from '@/components/UI/CheckBox';
import { MAX_TEXTAREA_LENGTH } from '@/constant/input';
import Button from '@/components/Common/Button';
import { BANK_LIST, PAY_LIST } from '@/constant/bankList';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import InputText from '@/components/Common/Input/inputText';
import useToggle from '@/hooks/common/useToggle';
import { PresentStepType } from '@/app/present/[id]/page';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AccountCopyCakeImg } from '../../../public/assets/images';

const CheckPresentItem = dynamic(() => import('./checkPresentItem'));

export default function GivePresentPageStateContainer({
  wishId,
  avatarCakeId,
  wantsGift,
  presentStep,
  presentId,
  children,
  account,
}: {
  wishId: string;
  avatarCakeId: string;
  wantsGift: boolean;
  presentStep: PresentStepType;
  presentId: string;
  children: ReactNode;
  account: string;
}) {
  const methods = useForm<PresentDataType>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      message: '',
      messageOnly: false,
      avatarCakeId: Number(avatarCakeId),
      presentId: 0,
    },
  });

  const router = useRouter();

  function handleSubmit() {
    if (presentStep === 'present') {
      handleNextToPaymentStep();
    }
  }

  function handleNextToPaymentStep() {
    const presentId = methods.getValues('presentId');

    router.push(`/present/${wishId}?presentStep=payment&presentId=${presentId}`);
  }

  async function handleAccountCopy() {
    try {
      await navigator.clipboard.writeText(account);
      console.log(account);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {children}
      {
        {
          present: <PresentGiverInfoInputForm methods={methods} wantsGift={wantsGift} />,
          payment: (
            <section className="flex flex-col items-center w-full">
              <CheckPresentItem
                presentId={Number(presentId)}
                giverName={methods.getValues('name')}
              />
              <Image
                src={AccountCopyCakeImg}
                alt="계좌번호 복사하기 이미지"
                className="my-24"
                onClick={handleAccountCopy}
              />

              <SelectPayment />
            </section>
          ),
        }[presentStep]
      }
      <Button
        onClick={handleSubmit}
        bgColor="main_blue"
        fontColor="white"
        styles={{ marginBottom: '5.8rem' }}
      >
        {presentStep === 'present' ? '친구 생일 축하해주기' : '선물하러 가기'}
      </Button>
    </>
  );
}

export function PresentGiverInfoInputForm({
  methods,
  wantsGift,
}: {
  methods: UseFormReturn<PresentDataType, any, undefined>;
  wantsGift?: boolean;
}) {
  const { toggleState: messageOnlyOption, changeToggleState: changeMessageOnlyOption } =
    useToggle();

  function changePresentId(id: number) {
    methods.setValue('presentId', id);
  }

  function changeCheckedState(state: boolean) {
    changeMessageOnlyOption(state);
    methods.setValue('messageOnly', state);
  }

  return (
    <>
      <InputForm title="본인의 닉네임 작성하기">
        <InputText
          register={methods.register('name')}
          placeholder="당신의 이름이나 별명을 편하게 작성해주세요"
        />
      </InputForm>

      {!wantsGift && (
        <InputForm title="선물하고 싶은 항목 선택하기">
          {!messageOnlyOption && <PresentList changePresentId={changePresentId} />}
          <Box bgColor="dark_green" fontColor="gray2" styles={{ marginTop: '0.6rem' }}>
            <CheckBox<PresentDataType>
              checkBoxText="편지만 보낼게요"
              changeCheckedState={changeCheckedState}
            />
          </Box>
        </InputForm>
      )}

      <InputForm title="친구에게 편지남기기">
        <InputTextForm
          inputType="textarea"
          register={methods.register('message')}
          control={methods.control}
          placeholder="ex.) 생일을 축하합니다~"
          maxLength={MAX_TEXTAREA_LENGTH}
        />
      </InputForm>
    </>
  );
}

function SelectPayment() {
  const handleDeepLink = (payment: { id: number; name: string }) => {
    const ua = navigator.userAgent.toLowerCase();

    if (payment.name === '토스뱅크') {
      window.open('supertoss://toss/pay');

      setTimeout(() => {
        window.open(
          ua.indexOf('android') > -1
            ? 'https://play.google.com/store/apps/details?id=viva.republica.toss'
            : 'https://apps.apple.com/app/id839333328',
        );
      }, 2000);
    }

    if (payment.name === '카카오뱅크') {
      window.open('kakaobank://');
      window.open('kakaopay://');

      setTimeout(() => {
        window.open(
          ua.indexOf('android') > -1
            ? 'https://play.google.com/store/apps/details?id=com.kakaobank.channel'
            : 'https://apps.apple.com/app/id1258016944',
        );
      }, 2000);
    }
  };

  return (
    <div className="w-full">
      <InputForm title="결제수단 선택">
        <ul className="flex gap-8">
          {PAY_LIST.map((payment) => (
            <li
              className="flex flex-col  items-center justify-center w-full h-92 rounded-xl bg-dark_green"
              key={payment.name}
              onClick={() => handleDeepLink(payment)}
            >
              <Image src={BANK_LIST[payment.id].logo} alt="은행 로고 이미지"></Image>
              <span className="font-galmuri text-[14px] text-white">{payment.name}</span>
            </li>
          ))}
        </ul>
      </InputForm>
    </div>
  );
}
