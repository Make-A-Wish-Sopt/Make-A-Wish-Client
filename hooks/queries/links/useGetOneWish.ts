import { useQuery } from 'react-query';
import { QUERY_KEY } from '@/constant/queryKey';
import { OneWishType } from '@/types/links/oneWishType';
import { getOneWish } from '@/api/links/getOneWish';

export function useGetOneWish(wishId: string | string[] | undefined) {
  const { data: wishData } = useQuery<OneWishType>(
    QUERY_KEY.ONE_WISH,
    async () => getOneWish(wishId),
    {
      onError: (error: any) => {
        if (error.response && error.response.status === 403) {
          alert('해당 소원에 접근할 수 없습니다.');
        }
      },
      enabled: wishId !== '',
    }
  );


  return { wishData };
}
