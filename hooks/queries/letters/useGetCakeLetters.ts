import { useQuery } from 'react-query';
import { QUERY_KEY } from '@/constant/queryKey';
import { CakeLettersType } from '@/types/letters/cakeLettersType';
import { getCakesLetters } from '@/api/letters/getCakeLetters';

export function useGetCakesLetters(wishId: string | string[] | undefined, cakeId: string | string[] | undefined) {
  const { data: lettersData } = useQuery<CakeLettersType[]>(
    QUERY_KEY.CAKE_LETTERS,
    async () => getCakesLetters(wishId, cakeId),
    {
      enabled: wishId !== '' && cakeId !== ''
    }
  );

  const lettersSum = lettersData ? lettersData.length : 0;

  return { lettersData: lettersData || [], lettersSum };
}