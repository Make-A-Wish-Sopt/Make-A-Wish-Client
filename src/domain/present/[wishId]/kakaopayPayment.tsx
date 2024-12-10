import Image from 'next/image';
import { BeefCakeImg } from '../../../../public/assets/images';
import { PropsWithChildren } from 'react';
import { convertMoneyText } from '@/utils/common/convert';

export default function KakaopayPayment({
  wishMakerName,
  presentPrice = '0',
  children,
}: { wishMakerName: string; presentPrice: string } & PropsWithChildren) {
  return (
    <section className="flex flex-col items-center w-full font-bitbit text-white ">
      <Image src={BeefCakeImg} alt="케이크 이미지" width={121} className="mt-60" />
      <span className="text-[24px] ">{`${wishMakerName}님에게`}</span>
      <span className="text-[50px] leading-none">{`${convertMoneyText(presentPrice)}원`}</span>
      <span className="text-[24px] ">{`송금하기`}</span>
      {children}
    </section>
  );
}
