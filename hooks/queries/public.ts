import { getPublicWishes } from '@/api/public';
import { useQuery } from 'react-query';

export function useGetPublicWishes(wishId: string | string[] | undefined) {
  const { data: publicWishesData } = useQuery('publicWishes', () => getPublicWishes(wishId), {
    enabled: wishId !== '',
  });

  return { publicWishesData };
}
