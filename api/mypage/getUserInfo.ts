import { client } from '../common/axios';
import PATH from '../common/path';

export const getUserInfo = async () => {
  const accessToken = localStorage.getItem('accessToken');

  const data = await client.get(`${PATH.API}/${PATH.V1}/${PATH.WISHES}/${PATH.PROGRESS}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};
