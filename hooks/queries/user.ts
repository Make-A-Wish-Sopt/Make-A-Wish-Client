import { getUserAccount, patchUserAccount } from '@/api/user';
import { QUERY_KEY } from '@/constant/queryKey';
import { WishesDataInputType } from '@/types/wishesType';
import router from 'next/router';
import { UseFormReturn } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';

export function usePatchUserAccount(methods: UseFormReturn<WishesDataInputType, any, undefined>) {
  const { mutate: patchUserAccountData } = useMutation(() => patchUserAccount(methods), {
    onSuccess: () => {
      router.push('/wishes/share');
    },
  });

  return { patchUserAccountData };
}

export function useGetUserAccount() {
  const { data: userAccountData } = useQuery(QUERY_KEY.ITEM_DATA, getUserAccount);

  return { userAccountData };
}
