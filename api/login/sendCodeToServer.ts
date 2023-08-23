import { client } from '@/api/common/axios';
import PATH from '../../constant/path';

export const sendCodeToServer = async (authCode: string) => {
  const url = `${PATH.API}/${PATH.V1}/${PATH.AUTH}/${PATH.KAKAO}/${PATH.CALLBACK}`;

  const data = await client.post(url, null, {
    params: {
      code: authCode,
    },
  });

  return data.data.data;
};
