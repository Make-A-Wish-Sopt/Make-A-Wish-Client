import WishesCreate, { WishesAccountCreateInput } from './client';
import { UseFormReturn } from 'react-hook-form';

import { useGetUserAccount } from '@/hooks/queries/user';
import Image from 'next/image';
import { WishesFormPresentIc } from '../../../../public/assets/icons';
import { WishesAccountDataType } from '@/types/input';

export default function WishesCreateContainer() {
  return (
    <>
      <div className="flex items-center gap-10 mt-26 mb-20">
        <Image src={WishesFormPresentIc} alt="선물 아이콘 이미지"></Image>
        <h1 className="font-bitbit text-main_blue text-[24px]">생일잔치 링크 생성하기</h1>
      </div>

      <WishesCreate />
    </>
  );
}

export function WishesAccountCreate({
  methods,
}: {
  methods: UseFormReturn<WishesAccountDataType, any, undefined>;
}) {
  const { userAccountData } = useGetUserAccount();

  return (
    <>
      <h1>생일선물함 생성하기</h1>
      <WishesAccountCreateInput
        methods={methods}
        accountData={userAccountData?.accountInfo}
        phone={userAccountData?.phone}
      />
    </>
  );
}
