import { API_VERSION_01, PATH_AUTH } from './path';
import { client } from './common/axios';
import { DefaultResponseType, LoginResponseType } from '@/types/api/response';
import { getLoginUserCookiesData } from '@/utils/common/cookies';

export const postAuthKakao = async (code: string) => {
  try {
    const data = await client.post<LoginResponseType>(
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
  } catch (error) {}
};

export const updateAccessToken = async () => {
  const { refreshToken } = await getLoginUserCookiesData();

  if (refreshToken) {
    try {
      const data = await client.post<DefaultResponseType>(`${API_VERSION_01}${PATH_AUTH.TOKEN}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      return data;
    } catch (error) {}
  }
};
