import { getLoginUserCookiesData } from '@/utils/common/cookies';
import { client } from './common/axios';
import { API_VERSION_01, PATH_CAKES } from './path';
import { CakePresentMessageResponseType, GetCakesResultResponseType } from '@/types/api/response';

/**
 * 해당 소원에 대한 케이크 조회
 */

export const getCakePresentMessage = async (wishId: string, presentId: number) => {
  if (!wishId || !presentId) return;

  const { accessToken } = await getLoginUserCookiesData();

  if (!accessToken) return;

  const data = await client.get<CakePresentMessageResponseType>(
    `${API_VERSION_01}${PATH_CAKES.GET_CAKES_INFO(wishId, presentId)}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return data.data.data;
};

/**
 * 해당 소원에 대한 모든 케이크 리스트 결과 조회
 */
export const getCakesResult = async (wishId: string) => {
  try {
    const data = await client.get<GetCakesResultResponseType>(
      `${API_VERSION_01}${PATH_CAKES.GET_CAKES_RESULT(Number(wishId))}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return data.data.data;
  } catch (error) {}
};
