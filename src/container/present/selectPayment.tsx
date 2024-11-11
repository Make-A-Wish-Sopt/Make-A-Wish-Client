'use client';

import Box from '@/components/Common/Box';
import Button from '@/components/Common/Button';
import CloseIconInModal from '@/components/Common/Modal/CloseIconInModal';
import CheckBox from '@/components/UI/CheckBox';
import InputForm from '@/components/UI/InputForm';
import { BANK_LIST, PAY_LIST } from '@/constant/bankList';
import { useRouters } from '@/hooks/common/useRouters';
import useToggle from '@/hooks/common/useToggle';
import Image from 'next/image';

export default function SelectPayment({
  handleCheckSendMoneyModalState,
}: {
  handleCheckSendMoneyModalState: () => void;
}) {
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
              className="flex flex-col gap-10  items-center justify-center w-full h-92 rounded-xl bg-dark_green"
              key={payment.name}
              onClick={() => {
                handleDeepLink(payment);
                handleCheckSendMoneyModalState();
              }}
            >
              <Image src={BANK_LIST[payment.id].logo} alt="은행 로고 이미지"></Image>
              <span className="font-galmuri text-[14px] text-white">{payment.name}</span>
            </li>
          ))}
        </ul>
        <Box bgColor="dark_green" fontColor="gray2" styles={{ marginTop: '0.6rem' }}>
          <CheckBox checkBoxText="직접 송금할게요!" changeCheckedState={() => {}} />
        </Box>
      </InputForm>
    </div>
  );
}
