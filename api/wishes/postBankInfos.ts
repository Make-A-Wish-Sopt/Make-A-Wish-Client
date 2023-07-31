import { client } from '../common/axios';
import PATH from '../common/path';

export const postBankInfo = async () => {
  const accessToken = localStorage.getItem('accessToken');

  const data = await client.post(
    `${PATH.API}/${PATH.V1}/${PATH.WISHES}`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};
