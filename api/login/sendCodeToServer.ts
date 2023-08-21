import { client } from '@/api/common/axios';
import PATH from '../common/path';

export const sendCodeToServer = async (authCode: string) => {
  const url = `${PATH.API}/${PATH.V1}/${PATH.AUTH}/${PATH.KAKAO}/${PATH.CALLBACK}`;

  const data = await client.post(url, {},
    {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        code: authCode,
      },
    });

  return data.data.data;
};