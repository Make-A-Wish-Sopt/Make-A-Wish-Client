'use client';

import { WishesCreateStepType } from '@/app/wishes/create/page';
import { wishesAccountInputInit, wishesLinkInputInit } from '@/constant/init';
import {
  wishesAccountDataResolver,
  WishesAccountDataResolverType,
  wishesLinkDataResolver,
  WishesLinkResolverType,
} from '@/validation/wishes.validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { WishesCreateTitleText } from './component';
import WishesAccountInputForm from './wishesAccountInputForm';
import { PropsWithChildren } from 'react';
import WishesLinkInputForm from './wishesLinkInputForm';

export default function WishesCreatePageContainer({
  createStep,
  wishTitle,
}: {
  createStep: WishesCreateStepType;
  wishTitle: string;
} & PropsWithChildren) {
  const wishesLinkInputMethods = useForm<WishesLinkResolverType>({
    mode: 'onChange',
    defaultValues: {
      ...wishesLinkInputInit,
      title: wishTitle,
    },
    resolver: yupResolver(wishesLinkDataResolver),
  });

  const wishesAccountInputMethods = useForm<WishesAccountDataResolverType>({
    mode: 'onChange',
    defaultValues: {
      ...wishesAccountInputInit,
    },
    resolver: yupResolver(wishesAccountDataResolver),
  });

  return (
    <>
      {
        {
          link: (
            <>
              <WishesCreateTitleText>생일잔치 링크 생성하기</WishesCreateTitleText>
              <WishesLinkInputForm methods={wishesLinkInputMethods} />
            </>
          ),
          account: (
            <>
              <WishesCreateTitleText>입금받을 계좌 입력하기</WishesCreateTitleText>
              <WishesAccountInputForm methods={wishesAccountInputMethods} />
            </>
          ),
        }[createStep]
      }
    </>
  );
}
