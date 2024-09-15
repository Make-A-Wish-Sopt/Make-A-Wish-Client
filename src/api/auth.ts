import { API_VERSION_01, PATH_AUTH } from './path';
import { client } from './common/axios';

export const postAuthKakao = async (code: string) => {
  try {
    const data = await client.post(
      `${API_VERSION_01}${PATH_AUTH.KAKAO}?redirectUri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          code: `${code}`,
        },
      },
    );

    return data.data.data;
  } catch (error) {
    console.log(error);
  }
};
