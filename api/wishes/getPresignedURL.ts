import { client } from '../common/axios';
import PATH from '../common/path';

export const getPresignedURL = async (fileName: string | undefined) => {
  const accessToken = localStorage.getItem('accessToken');
  const data = await client.get(
    `${PATH.API}/${PATH.V1}/${PATH.FILE}?${PATH.FILE_NAME}=${fileName}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return data;
};
