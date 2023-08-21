import { client } from '@/api/common/axios';
import PATH from '@/api/common/path';

export const getCakesCount = async (wishId: string | string[] | undefined) => {
  const url = `${PATH.API}/${PATH.V1}/${PATH.CAKES}/${wishId}`;

  const data = await client.get(url);

  return data.data;
};