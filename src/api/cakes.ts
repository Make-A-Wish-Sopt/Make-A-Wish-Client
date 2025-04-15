import { getLoginUserCookiesData } from '@/utils/cookies';
import { CakePresentMessageResponseType, GetCakesResultResponseType } from '@/types/api/response';
import { client } from '../configs/apiConfig';
import { API_VERSION_01, PATH_CAKES } from './path';

/**
 * 해당 생일잔치에 대한 케이크 조회
 */

export const getCakePresentMessage = async (wishId: string, presentId: number) => {
  if (!wishId || !presentId) return null;

  const { accessToken } = await getLoginUserCookiesData();

  if (!accessToken) return null;

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
 * 해당 생일잔치에 대한 모든 케이크 리스트 결과 조회
 */
export const getCakesResult = async (wishId: string) => {
  const data = await client.get<GetCakesResultResponseType>(
    `${API_VERSION_01}${PATH_CAKES.GET_CAKES_RESULT(Number(wishId))}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return data.data.data;
};
