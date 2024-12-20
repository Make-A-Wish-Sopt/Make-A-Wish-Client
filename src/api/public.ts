import { PostPublicCakesResponseType, PublicWishesDataResponseType } from '@/types/api/response';
import { client } from './common/axios';
import { API_VERSION_01, PATH_PUBLIC } from './path';
import { PresentDataResolverType } from '@/validation/present.validate';
import axios from 'axios';

export const getPublicWishes = async (wishId: string) => {
  try {
    const data = await axios.get<PublicWishesDataResponseType>(
      `${process.env.NEXT_PUBLIC_BASE_URL}${API_VERSION_01}${PATH_PUBLIC.GET_WISHES_INFO(
        Number(wishId),
      )}`,
    );

    return data.data.data;
  } catch (error) {}
};

//케이크 아이디 수정해야될거 같음
//리팩토링
export const postPublicCakes = async (
  presentData: PresentDataResolverType & { wishId: string },
) => {
  const requestData = {
    ...presentData,
    cakeId: presentData.cakeId,
  };

  const data = await client.post<PostPublicCakesResponseType>(
    `${API_VERSION_01}${PATH_PUBLIC.CAKES}`,
    requestData,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return data.data.data;
};
