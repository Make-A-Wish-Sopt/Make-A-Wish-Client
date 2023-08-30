import PATH from '@/constant/path';
import { client } from '../common/axios';

export const deleteUserInfo = async () => {
  const accessToken = localStorage.getItem('accessToken');

  const data = await client.delete(`${PATH.API}/${PATH.V1}/${PATH.USER}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};
