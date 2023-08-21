import PATH from '../common/path';
import { client } from '../common/axios';

export const getWishesData = async (wishesNumber: string | string[] | undefined) => {
  const accessToken = localStorage.getItem('accessToken');

  const data = await client.get(`${PATH.API}/${PATH.V1}/${PATH.WISHES}/${wishesNumber}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return data.data.data;
};
