'use client';

import InputForm from '@/components/UI/InputForm';
import { PaymentDataType, paymentListArray } from '@/constant/bankList';
import Image from 'next/image';

export default function SelectPayment() {
  const handleDeepLink = (payment: PaymentDataType) => {
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
          {paymentListArray.map((paymentItem) => (
            <li
              className="flex flex-col gap-10  items-center justify-center w-full h-92 rounded-xl bg-dark_green"
              key={paymentItem.paymentId}
              onClick={() => {
                handleDeepLink(paymentItem);
              }}
            >
              <Image src={paymentItem.bankIconImg} alt="은행 로고 이미지" />
              <span className="font-galmuri text-[14px] text-white">{paymentItem.name}</span>
            </li>
          ))}
        </ul>
      </InputForm>
    </div>
  );
}
