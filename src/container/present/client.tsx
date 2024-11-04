'use client';

import { useForm } from 'react-hook-form';
import Button from '@/components/Common/Button';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import useToggle from '@/hooks/common/useToggle';
import { PresentStepType } from '@/app/present/[id]/page';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AccountCopyCakeImg } from '../../../public/assets/images';
import { presentDataResolver, PresentDataResolverType } from '@/validation/present.validate';
import { presentDataInputInit } from '@/constant/init';
import { yupResolver } from '@hookform/resolvers/yup';
import { postPublicCakes } from '@/api/public';
import PresentGiverInfoInputForm from './presentGiverInfoInputForm';
import SelectPayment from './selectPayment';

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
  const methods = useForm<PresentDataResolverType>({
    mode: 'onChange',
    defaultValues: {
      ...presentDataInputInit,
      cakeId: Number(avatarCakeId),
    },
    resolver: yupResolver(presentDataResolver),
  });

  const isValid = methods.formState.isValid;

  const router = useRouter();

  const { toggleState: messageOnlyOption, changeToggleState: changeMessageOnlyOption } =
    useToggle();

  function handleGivePresent() {
    if (!wantsGift || messageOnlyOption) {
      GivePresentMessageOnly();
      return;
    }

    handleNextToPaymentStep();
  }

  function GivePresentMessageOnly() {
    try {
      const data = methods.getValues();
      postPublicCakes({ ...data, wishId: wishId });
    } catch (error) {}
  }

  function handleNextToPaymentStep() {
    const giftMenuId = methods.getValues('giftMenuId');

    router.push(`/present/${wishId}?presentStep=payment&presentId=${giftMenuId}`);
  }

  async function handleAccountCopy() {
    try {
      await navigator.clipboard.writeText(account);
      alert('계좌번호가 복사됐어요!');
    } catch (error) {}
  }

  console.log(isValid);

  return (
    <>
      {children}
      {
        {
          present: (
            <PresentGiverInfoInputForm
              methods={methods}
              wantsGift={wantsGift}
              messageOnlyOption={messageOnlyOption}
              changeMessageOnlyOption={changeMessageOnlyOption}
            />
          ),
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
      {presentStep === 'present' && (
        <PresentMessageButton handleClick={handleGivePresent} disabled={!isValid} />
      )}

      {presentStep === 'payment' && (
        <Button
          onClick={handleGivePresent}
          bgColor="main_blue"
          fontColor="white"
          styles={{ marginBottom: '5.8rem' }}
          disabled={isValid}
        >
          {'선물하러 가기'}
        </Button>
      )}
    </>
  );
}

function PresentMessageButton({
  handleClick,
  disabled,
}: {
  handleClick: () => void;
  disabled: boolean;
}) {
  return (
    <Button
      onClick={handleClick}
      fontColor="white"
      styles={{ marginBottom: '5.8rem' }}
      disabled={disabled}
    >
      {'친구 생일 축하해주기'}
    </Button>
  );
}
