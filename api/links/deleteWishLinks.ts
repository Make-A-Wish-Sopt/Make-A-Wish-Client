import { client } from '@/api/common/axios';
import PATH from '@/constant/path';

export const deleteWishLinks = async (wishesData: number[]) => {
  const accessToken = localStorage.getItem('accessToken');

  const url = `${PATH.API}/${PATH.V1}/${PATH.WISHES}`;

  const data = await client.delete(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      wishes: wishesData,
    },
  });

  return data;
};
