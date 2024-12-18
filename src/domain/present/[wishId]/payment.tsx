'use client';

import Image from 'next/image';
import { MainCakeImg } from '../../../../public/assets/images';
import SelectPayment from './selectPayment';

import { convertMoneyText } from '@/utils/common/convert';
import { AccountCopySpeechBubbleIcon } from '@/components/Common/Icon/MessageAlarmIcon';

export default function Payment({
  wishMakerName,
  presentPrice,
  account,
  isSelected,
  handleSelectOne,
}: {
  wishMakerName: string;
  presentPrice: string;
  account?: string;
  isSelected: (id: number) => boolean;
  handleSelectOne: (id: number) => void;
}) {
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
        <span className="text-main_blue text-[50px] leading-none">{`${convertMoneyText(presentPrice)}원`}</span>
        <span className="text-[24px] ">{`송금하기`}</span>
        <div className="relative mt-62">
          <AccountCopySpeechBubbleIcon />
          <Image
            className="duration-300 transition-all "
            src={MainCakeImg}
            alt="계좌번호 복사하기 이미지"
            width={128}
            onClick={handleAccountCopy}
            style={{
              animation: 'growShrink 1s ease-out infinite',
            }}
          />
          <style jsx>{`
            @keyframes growShrink {
              0% {
                transform: scale(1);
              }

              50% {
                transform: scale(1.1);
              }
              100% {
                transform: scale(1);
              }
            }
          `}</style>
        </div>

        <SelectPayment
          isSelected={isSelected}
          handleSelectOne={handleSelectOne}
        />
      </section>
    </>
  );
}
