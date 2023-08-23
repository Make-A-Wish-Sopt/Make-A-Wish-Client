import { useQuery } from 'react-query';
import { QUERY_KEY } from '@/constant/queryKey';
import { getCakesCount } from '@/api/letters/getCakesCount';
// import { CakesCountData } from '@/recoil/cakesCountData';
// import { useSetRecoilState } from 'recoil';
import { useState } from 'react';

export function useGetCakesCount(wishId: string | string[] | undefined) {
  const [total, setTotal] = useState(0);
  // const setCakesCountData = useSetRecoilState(CakesCountData);

  const { data: cakesCount } = useQuery(
    QUERY_KEY.CAKES_COUNT,
    async () => getCakesCount(wishId),
    {
      onSuccess: (data) => {
        // setCakesCountData(data);
        if (Array.isArray(data)) {
          const cakesTotal = calculateTotal(data.map((cake: { count: any; }) => cake.count));
          setTotal(cakesTotal);
        }
      },
      enabled: wishId !== '',
    }
  );

  const calculateTotal = (cakeCounts: number[]): number => {
    const total = cakeCounts.reduce((sum, count) => sum + count, 0);
    return total;
  };

  return { cakesCount, total };
}
