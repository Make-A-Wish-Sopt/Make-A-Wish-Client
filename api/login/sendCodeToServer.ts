import { client } from '@/api/common/axios';
import PATH from '../../constant/path';

export const sendCodeToServer = async (code: string) => {
  const url = `${PATH.API}/${PATH.V1}/${PATH.AUTH}/${PATH.KAKAO}/${PATH.CALLBACK}`;

  const data = await client.post(url, null, {
    headers: {
      'Content-Type': 'application/json',
      code: `${code}`,
    },
  });

  return data.data.data;
};
