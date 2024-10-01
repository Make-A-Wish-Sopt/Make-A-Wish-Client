import { PostPublicCakesResponseType, PublicWishesDataResponseType } from '@/types/api/response';
import { client } from './common/axios';
import { API_VERSION_01, PATH_PUBLIC } from './path';
import { PostPublicCakesRequestType } from '@/types/api/request';

export const getPublicWishes = async (wishId: string) => {
  if (wishId) {
    try {
      const data = await client.get<PublicWishesDataResponseType>(
        `${API_VERSION_01}${PATH_PUBLIC.GET_WISHES_INFO(Number(wishId))}`,
      );

      return data.data.data;
    } catch (error) {}
  }
};

export const postPublicCakes = async (parameter: PostPublicCakesRequestType) => {
  const data = await client.post<PostPublicCakesResponseType>(
    `${API_VERSION_01}${PATH_PUBLIC.CAKES}`,
    parameter,
    {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    },
  );

  return data.data.data;
};
