'use client';

import { getDate } from '@/utils/common/getDate';
import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { WishesAccountDataType, WishesLinkDataType } from '@/types/input';
import { WishesCreateStepType } from '@/app/wishes/create/page';
import { UserAccountDataType } from '@/types/api/response';
import { WishesLinkInputForm } from './createInputForm';
import { useForm } from 'react-hook-form';

const WishesAccountInput = dynamic(() => import('./createInputForm'));

export default function WishesCreatePageStateContainer({
  createStep,
  wishTitle,
  userAccountData,
  children,
}: {
  createStep: WishesCreateStepType;
  wishTitle: string;
  userAccountData: UserAccountDataType;
  children: ReactNode;
}) {
  const wishesLinkInputMethods = useForm<WishesLinkDataType>({
    mode: 'onChange',
    defaultValues: {
      imageUrl: '',
      title: wishTitle,
      hint: '',
      startDate: new Date(),
      endDate: getDate(new Date(), 7),
      wantsGift: false,
    },
  });

  const wishesAccountInputMethods = useForm<WishesAccountDataType>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      account: '',
      bank: '',
      phone: '',
      noticeAgree: false,
    },
  });

  return (
    <>
      {children}
      {
        {
          link: <WishesLinkInputForm methods={wishesLinkInputMethods} />,
          account: (
            <WishesAccountInput
              accountData={userAccountData?.accountInfo}
              phone={userAccountData?.phone}
              methods={wishesAccountInputMethods}
            />
          ),
        }[createStep]
      }
    </>
  );
}
