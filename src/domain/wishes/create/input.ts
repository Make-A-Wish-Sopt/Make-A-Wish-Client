'use client';

import { wishesLinkInputInit } from '@/constant/init';
import { wishesLinkDataResolver, WishesLinkDataResolverType } from '@/validation/wishes.validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export const wishesLinkInputDataFormMethods = useForm<WishesLinkDataResolverType>({
  defaultValues: {
    ...wishesLinkInputInit,
  },
  resolver: yupResolver(wishesLinkDataResolver),
});
