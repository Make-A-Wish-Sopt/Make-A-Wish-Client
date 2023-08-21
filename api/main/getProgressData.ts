import PATH from '../common/path';
import { client } from '../common/axios';

export const getProgressData = async () => {
  const accessToken = localStorage.getItem('accessToken');

  const url = `${PATH.API}/${PATH.V1}/${PATH.WISHES}/${PATH.MAIN}`;

  const data = await client.get(url,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  console.log(data.data.data);
  return data.data.data;
};
