'use client';

import { PresentDataResolverType } from '@/validation/present.validate';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import { AccountCopyCakeImg } from '../../../../public/assets/images';
import SelectPayment from './selectPayment';
import { CheckPresentItem } from './component';
import { convertMoneyText } from '@/utils/common/convert';

export default function Payment({
  wishMakerName,
  presentPrice,
  account,
}: {
  wishMakerName: string;
  presentPrice: string;
  account?: string;
}) {
  const { watch } = useFormContext<PresentDataResolverType>();

  async function handleAccountCopy() {
    try {
      await navigator.clipboard.writeText(account);
      alert('계좌번호가 복사됐어요!');
    } catch (error) {}
  }

  return (
    <>
      <section className="flex flex-col items-center w-full text-white font-bitbit">
        <span className="text-[24px] mt-54 ">{`${wishMakerName}님에게`}</span>
        <span className="text-[50px] leading-none">{`${convertMoneyText(presentPrice)}원`}</span>
        <span className="text-[24px] ">{`송금하기`}</span>
        {/* <CheckPresentItem presentId={Number(watch('giftMenuId'))} giverName={watch('name')} /> */}
        <Image
          src={AccountCopyCakeImg}
          alt="계좌번호 복사하기 이미지"
          width={250}
          className="my-24"
          onClick={handleAccountCopy}
        />

        <SelectPayment />
      </section>
    </>
  );
}
