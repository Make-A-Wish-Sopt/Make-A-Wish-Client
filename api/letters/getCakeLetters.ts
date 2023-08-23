import { client } from '@/api/common/axios';
import PATH from '@/constant/path';

export const getCakesLetters = async (
  wishId: string | string[] | undefined,
  cakeId: string | string[] | undefined,
) => {
  const accessToken = localStorage.getItem('accessToken');

  const url = `${PATH.API}/${PATH.V1}/${PATH.CAKES}/${wishId}/${cakeId}`;

  const data = await client.get(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data.data.data;
};
