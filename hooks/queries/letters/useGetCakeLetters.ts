import { useQuery } from 'react-query';
import { QUERY_KEY } from '@/constant/queryKey';
import { CakeLettersType } from '@/types/letters/cakeLettersType';
import { getCakesLetters } from '@/api/letters/getCakeLetters';
import { useState } from 'react';

export function useGetCakesLetters(wishId: string | string[] | undefined, cakeId: string | string[] | undefined) {
  const [lettersData, setLettersData] = useState<CakeLettersType[]>([]);

  const { data } = useQuery(
    QUERY_KEY.CAKE_LETTERS,
    async () => getCakesLetters(wishId, cakeId),
    {
      onSuccess: (data) => {
        setLettersData(data);
      },
      enabled: wishId !== '' && cakeId !== ''
    }
  );

  const lettersSum = lettersData ? lettersData.length : 0;

  return { data, lettersData, lettersSum };
}