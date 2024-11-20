'use client';

import CheckPresentItem from '@/container/present/checkPresentItem';
import { PresentDataResolverType } from '@/validation/present.validate';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import { AccountCopyCakeImg } from '../../../../public/assets/images';
import SelectPayment from '@/container/present/selectPayment';

export default function Payment({ account }: { account: string }) {
  const { watch } = useFormContext<PresentDataResolverType>();

  async function handleAccountCopy() {
    try {
      await navigator.clipboard.writeText(account);
      alert('계좌번호가 복사됐어요!');
    } catch (error) {}
  }

  return (
    <>
      <section className="flex flex-col items-center w-full">
        <CheckPresentItem presentId={Number(watch('giftMenuId'))} giverName={watch('name')} />
        <Image
          src={AccountCopyCakeImg}
          alt="계좌번호 복사하기 이미지"
          className="my-24"
          onClick={handleAccountCopy}
        />

        <SelectPayment />
      </section>
    </>
  );
}
