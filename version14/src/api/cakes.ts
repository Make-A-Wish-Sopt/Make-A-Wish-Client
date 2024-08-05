import { getAccessToken } from '@/utils/common/token';
import { client } from './common/axios';
import { API_VERSION_01, PATH_CAKES } from './path';

const ACCESS_TOKEN = getAccessToken();

/**
 * 해당 소원에 대한 케이크 조회
 */
export const getCakesInfo = async (
  wishId: string | string[] | undefined,
  cakeId: string | string[] | undefined,
) => {
  const data = await client.get(`${API_VERSION_01}${PATH_CAKES.GET_CAKES_INFO(wishId, cakeId)}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  return data.data.data;
};

/**
 * 해당 소원에 대한 모든 케이크 리스트 결과 조회
 */
export const getCakesResult = async (wishId: string | string[] | undefined) => {
  const data = await client.get(`${API_VERSION_01}${PATH_CAKES.GET_CAKES_RESULT(wishId)}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
  return data.data.data;
};
