import { getUserAccount, postVerifyAccount, putUserAccount } from '@/api/user';
import { QUERY_KEY } from '@/constant/queryKey';
import { AccountInfoType, WishesDataInputType } from '@/types/wishesType';
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

export function usePostVerifyAccount(accountInfo: AccountInfoType) {
  const { mutate, data } = useMutation(() => postVerifyAccount(accountInfo));

  /**
   * 틀린 경우와 맞은 경우 둘 다 200으로 응답이 오고, success 값을 다르게 받음.
   * (팝빌에서 예외처리 없이 받은 에러는(ex. 503) 200으로 응답이 오지 않지만, success 값은 false로 옴.)
   * data는 일반적으로 null 이고, success가 false일 때 틀린 횟수를 data에 받아옴.
   * 이 횟수가 4 이상이면, 잠금 처리.
   */
  return {
    handleVerifyAccount: mutate,
    isSuccess: data ? data.success : false,
    isReady: data !== undefined,
    isAbused: data ? (data.data ? data.data >= 4 : false) : false,
  };
}
