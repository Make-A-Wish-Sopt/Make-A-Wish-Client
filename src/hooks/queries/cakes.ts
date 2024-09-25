import { getCakesInfo, getCakesResult } from '@/api/cakes';
import { QUERY_KEY } from '@/constant/queryKey';
import { CakeLettersType } from '@/types/letters/cakeLettersType';
import { useState } from 'react';
import { useQuery } from 'react-query';

/**
 * 해당 소원에 대한 케이크 조회
 */
export function useGetCakesInfo(wishId: number, cakeId: number) {
  const [lettersData, setLettersData] = useState<CakeLettersType[]>([]);

  const { data } = useQuery(QUERY_KEY.CAKE_LETTERS, async () => getCakesInfo(wishId, cakeId), {
    onSuccess: (data) => {
      setLettersData(data);
    },
  });

  const lettersSum = lettersData ? lettersData.length : 0;

  return { data, lettersData, lettersSum };
}

/**
 * 해당 소원에 대한 모든 케이크 리스트 결과 조회
 */

export function useGetCakesResult(wishId: string) {
  const [receivedCakeListTotalCount, setReceivedCakeListTotalCount] = useState(0);

  const { data: receivedCakeList } = useQuery(
    QUERY_KEY.CAKES_COUNT,
    async () => getCakesResult(wishId),
    {
      onSuccess: (data) => {
        // if (Array.isArray(data)) {
        //   const cakesTotal = calculateTotal(data.map((cake: { count: number }) => cake.count));
        //   setReceivedCakeListTotalCount(cakesTotal);
        // }
      },
      enabled: wishId !== '',
    },
  );

  const calculateTotal = (cakeCounts: number[]): number => {
    const total = cakeCounts.reduce((sum, count) => sum + count, 0);
    return total;
  };

  return { receivedCakeList, receivedCakeListTotalCount };
}
