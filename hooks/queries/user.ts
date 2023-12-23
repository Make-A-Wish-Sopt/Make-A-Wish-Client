import { getUserAccount, putUserAccount } from '@/api/user';
import { QUERY_KEY } from '@/constant/queryKey';
import { WishesDataInputType } from '@/types/wishesType';
import router from 'next/router';
import { UseFormReturn } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';

export function usePutUserAccount(methods: UseFormReturn<WishesDataInputType, any, undefined>) {
  const { mutate: handlePutUserAccount } = useMutation(() => putUserAccount(methods), {
    onSuccess: () => {
      router.push('/wishes/share');
    },
  });

  return { handlePutUserAccount };
}

export function useGetUserAccount() {
  const { data: userAccountData } = useQuery(QUERY_KEY.ITEM_DATA, getUserAccount);

  return { userAccountData };
}
