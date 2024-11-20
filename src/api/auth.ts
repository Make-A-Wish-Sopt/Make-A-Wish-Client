import { API_VERSION_01, PATH_AUTH } from './path';
import { LoginResponseType, UpdateTokenResponseType } from '@/types/api/response';
import { getLoginUserCookiesData } from '@/utils/common/cookies';
import axios from 'axios';

export const postAuthKakao = async (code: string) => {
  //이거 수정해야됩니다
  try {
    const data = await axios.post<LoginResponseType>(
      `${process.env.NEXT_PUBLIC_BASE_URL}${API_VERSION_01}${PATH_AUTH.KAKAO}?redirectUri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`,
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

  if (!refreshToken) return;

  try {
    const data = await axios.post<UpdateTokenResponseType>(
      `${process.env.NEXT_PUBLIC_BASE_URL}${API_VERSION_01}${PATH_AUTH.TOKEN}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    );

    return data.data.data;
  } catch (error) {}
};
