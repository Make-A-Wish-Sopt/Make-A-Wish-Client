import { getLoginUserCookiesData } from '@/utils/common/cookies';
import { client } from './common/axios';
import { API_VERSION_01, PATH_CAKES } from './path';
import { GetCakesResultResponseType } from '@/types/api/response';

/**
 * 해당 소원에 대한 케이크 조회
 */
export const getCakesInfo = async (wishId: number, cakeId: number) => {
  const data = await client.get(`${API_VERSION_01}${PATH_CAKES.GET_CAKES_INFO(wishId, cakeId)}`, {
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  return data.data.data;
};

/**
 * 해당 소원에 대한 모든 케이크 리스트 결과 조회
 */
export const getCakesResult = async (wishId: string) => {
  const loginUserData = await getLoginUserCookiesData();
  const accessToken = loginUserData?.accessToken;
  try {
    const data = await client.get<GetCakesResultResponseType>(
      `${API_VERSION_01}${PATH_CAKES.GET_CAKES_RESULT(Number(wishId))}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return data.data.data;
  } catch (error) {}
};
