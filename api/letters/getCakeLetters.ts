import { client } from '@/api/common/axios';
import PATH from '@/api/common/path';

export const getCakesLetters = async (wishId: string | string[] | undefined, cakeId: string | string[] | undefined) => {
  const url = `${PATH.API}/${PATH.V1}/${PATH.CAKES}/${wishId}/${cakeId}`;

  const data = await client.get(url);

  return data.data;
};