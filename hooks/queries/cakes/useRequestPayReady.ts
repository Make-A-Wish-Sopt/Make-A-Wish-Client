import { requestPayReady } from '@/api/cakes/requestPayReady';
import { QUERY_KEY } from '@/constant/queryKey';
import { useMutation } from 'react-query';

export default function useRequestPayReady(userId: string, cakeNumber: number) {
  const { data, mutate, isSuccess } = useMutation(QUERY_KEY.payReady, () =>
    requestPayReady(userId, cakeNumber),
  );

  return { data, mutate, isSuccess };
}
