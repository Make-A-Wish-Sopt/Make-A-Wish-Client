import { PublicWishesDataResponseType } from '@/types/api/response';
import { client } from './common/axios';
import { API_VERSION_01, PATH_PUBLIC } from './path';

export const getPublicWishes = async (wishId: string | string[] | undefined) => {
  const data = await client.get<PublicWishesDataResponseType>(
    `${API_VERSION_01}${PATH_PUBLIC.GET_WISHES_INFO(wishId)}`,
  );

  return data.data.data;
};
