'use client';

import Image from 'next/image';
import { BANK_LIST } from '@/constant/bankList';

interface BankModalProps {
  handleState: () => void;
  changeBank: (input: string) => void;
}

export default function BankModal(props: BankModalProps) {
  const { handleState, changeBank } = props;

  const handleChangeBank = (input: string) => {
    changeBank(input);
    handleState();
  };

  return (
    <section className="w-331 h-608 p-22 pb-0 border border-dark_green bg-background rounded-3xl overflow-scroll">
      <h2 className="font-galmuri text-[16px] text-white">은행을 선택해주세요.</h2>
      <ul
        id="bankList"
        className="h-[91.4%] overflow-scroll scrollbar-hide mt-8 grid grid-cols-3 gap-8"
      >
        {BANK_LIST.map((bank) => (
          <li key={bank.name} className="w-90 h-66">
            <button
              type="button"
              onClick={() => handleChangeBank(bank.name)}
              className="w-full h-full py-10 bg-dark_green rounded-xl cursor-pointer"
            >
              <div className="flex flex-col w-full h-full items-center">
                <div className="flex justify-center items-center w-26 h-26 mx-auto">
                  <Image src={bank.logo} alt={`${bank.name} 로고`} />
                </div>
                <span className="font-galmuri text-white text-[12px] text-center mt-6">
                  {bank.name}
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
