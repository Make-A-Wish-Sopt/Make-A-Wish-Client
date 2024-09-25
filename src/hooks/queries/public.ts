'use client';

import { getPublicWishes, postPublicCakes } from '@/api/public';
import { PostPublicCakesRequestType } from '@/types/api/request';
import { useMutation, useQuery } from 'react-query';

export function useGetPublicWishes(wishId: string) {
  const { data: publicWishesData, ...rest } = useQuery(
    'publicWishes',
    () => getPublicWishes(wishId),
    { enabled: wishId !== '' },
  );

  return { publicWishesData, ...rest };
}

export function usePostPublicCakes(parameter: PostPublicCakesRequestType) {
  const {
    mutate: postPublicCakesData,
    data: cakesResultData,
    ...restProps
  } = useMutation(() => postPublicCakes(parameter));

  return { postPublicCakesData, cakesResultData, ...restProps };
}
