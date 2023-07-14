import { getWishesData } from '@/api/cakes/getWishesData';
import { QUERY_KEY } from '@/constant/queryKey';
import { useQuery } from 'react-query';

export function useGetWishesData(wishesId: string | string[] | undefined) {
  const { data: wishesData } = useQuery(QUERY_KEY.wishesData, async () => getWishesData(wishesId), {
    enabled: wishesId !== '',
  });

  return { wishesData };
}
