import { client } from '../common/axios';
import PATH from '../common/path';

export const getUserAccount = async () => {
  const accessToken = localStorage.getItem('accessToken');

  const data = await client.get(`${PATH.API}/${PATH.V1}/${PATH.USER}/${PATH.ACCOUNT}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data?.data;
};
