import { getPgTokenData } from '@/api/cakes/getPgTokenData';
import { QUERY_KEY } from '@/constant/queryKey';
import { useQuery } from 'react-query';

export default function useGetPgTokenData(pgToken: string | string[]) {
  const { data: pgTokenData } = useQuery(QUERY_KEY.WISHES_DATA, async () => getPgTokenData(pgToken));

  return { pgTokenData };
}
