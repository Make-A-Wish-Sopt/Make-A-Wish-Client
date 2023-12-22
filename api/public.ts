import { PostPublicCakesResponseType, PublicWishesDataResponseType } from '@/types/api/response';
import { client } from './common/axios';
import { API_VERSION_01, PATH_PUBLIC } from './path';
import { PostPublicCakesRequestType } from '@/types/api/request';
import { getAccessToken } from '@/utils/common/token';

const ACCESS_TOKEN = getAccessToken();

export const getPublicWishes = async (wishId: string | string[] | undefined) => {
  const data = await client.get<PublicWishesDataResponseType>(
    `${API_VERSION_01}${PATH_PUBLIC.GET_WISHES_INFO(wishId)}`,
  );

  return data.data.data;
};

export const postPublicCakes = async (parameter: PostPublicCakesRequestType) => {
  const data = await client.post<PostPublicCakesResponseType>(
    `${API_VERSION_01}${PATH_PUBLIC.CAKES}`,
    parameter,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    },
  );

  return data.data.data;
};
