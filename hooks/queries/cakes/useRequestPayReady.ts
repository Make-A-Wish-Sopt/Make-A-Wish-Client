import { requestPayReady } from '@/api/cakes/cakesAPI';
import { QUERY_KEY } from '@/constant/queryKey';
import { useMutation } from 'react-query';

export default function useRequestPayReady(wishId: number, cakeNumber: number) {
  const { data, mutate, isSuccess } = useMutation(QUERY_KEY.PAYREADY, () =>
    requestPayReady(wishId, cakeNumber),
  );

  return { data, mutate, isSuccess };
}
