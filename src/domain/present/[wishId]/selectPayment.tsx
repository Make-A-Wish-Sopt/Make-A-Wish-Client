'use client';

import InputForm from '@/components/UI/InputForm';
import { paymentListArray } from '@/constant/bankList';
import Image from 'next/image';

export default function SelectPayment({
  isSelected,
  handleSelectOne,
}: {
  isSelected: (id: number) => boolean;
  handleSelectOne: (id: number) => void;
}) {
  return (
    <div className="w-full">
      <InputForm title="결제수단 선택" textCenter>
        <ul className="flex gap-8">
          {paymentListArray.map((paymentItem) => (
            <li
              className={`flex flex-col gap-10  items-center justify-center w-full h-92 rounded-xl bg-dark_green ${
                isSelected(paymentItem.paymentId)
                  ? 'bg-main_blue text-black'
                  : 'bg-dark_green text-white'
              }`}
              key={paymentItem.paymentId}
              onClick={() => {
                handleSelectOne(paymentItem.paymentId);
              }}
            >
              <Image src={paymentItem.bankIconImg} alt="은행 로고 이미지" />
              <span className="font-galmuri text-[14px] ">
                {paymentItem.name}
              </span>
            </li>
          ))}
        </ul>
      </InputForm>
    </div>
  );
}
