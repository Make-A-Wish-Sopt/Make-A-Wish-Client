import Image from 'next/image';
import { WishesFormPresentIc } from '../../../../public/assets/icons';
import { ReactNode } from 'react';
import { getUserAccount } from '@/api/user';
import { WishesAccountInput } from './client';

export async function WishesAccountInputForm() {
  const userAccountData = await getUserAccount();

  return (
    <>
      <WishesAccountInput
        accountData={userAccountData?.accountInfo}
        phone={userAccountData?.phone}
      />
    </>
  );
}

export function WishesCreateStepTitle({
  stepTitle,
  children,
}: {
  stepTitle: string;
  children?: ReactNode;
}) {
  return (
    <>
      <div className="flex items-center gap-10 mt-26 mb-20">
        <Image src={WishesFormPresentIc} alt="선물 아이콘 이미지"></Image>
        <h1 className="font-bitbit text-main_blue text-[24px]">{stepTitle}</h1>
      </div>
      {children}
    </>
  );
}
