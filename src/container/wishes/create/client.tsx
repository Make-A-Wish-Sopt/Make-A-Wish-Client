'use client';

import { getDate } from '@/utils/common/getDate';
import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { WishesAccountDataType, WishesLinkDataType } from '@/types/input';
import { WishesCreateStepType } from '@/app/wishes/create/page';
import { UserAccountDataType } from '@/types/api/response';
import { useForm } from 'react-hook-form';
import { wishesAccountInputInit, wishesLinkInputInit } from '@/constant/init';
import WishesLinkInputForm from './wishesLinkInputForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { wishesLinkDataResolver, WishesLinkResolverType } from '@/validation/wishes.validate';

const WishesAccountInputForm = dynamic(() => import('./WishesAccountInputForm'));

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
  const wishesLinkInputMethods = useForm<WishesLinkResolverType>({
    mode: 'onChange',
    defaultValues: {
      ...wishesLinkInputInit,
      title: wishTitle,
    },
    resolver: yupResolver(wishesLinkDataResolver),
  });

  const wishesAccountInputMethods = useForm<WishesAccountDataType>({
    mode: 'onChange',
    defaultValues: {
      ...wishesAccountInputInit,
    },
  });

  return (
    <>
      {children}
      {
        {
          link: <WishesLinkInputForm methods={wishesLinkInputMethods} />,
          account: (
            <WishesAccountInputForm
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
