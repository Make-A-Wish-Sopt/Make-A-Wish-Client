import { client } from '@/api/common/axios';
import PATH from '@/api/common/path';

export const getOneWish = async (wishId: string | string[] | undefined) => {
  const accessToken = localStorage.getItem('accessToken');

  const url = `${PATH.API}/${PATH.V1}/${PATH.WISHES}/${wishId}`;

  const data = await client.get(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },

  });

  return data.data.data;
};


