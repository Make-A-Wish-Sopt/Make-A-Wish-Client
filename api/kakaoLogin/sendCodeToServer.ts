import { client } from '@/api/common/axios';
import PATH from '../common/path';


export async function sendCodeToServer(authCode: string) {
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
}