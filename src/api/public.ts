import {
  DefaultResponseType,
  PostPublicCakesResponseType,
  PublicWishesDataResponseType,
} from '@/types/api/response';
import { client } from '../configs/apiConfig';
import { API_VERSION_01, PATH_PUBLIC } from './path';

import axios from 'axios';
import { PresentFormSchemaType } from '@/Schema/present.schema';
import { AlimTalkSchemaType } from '@/Schema/wishes.schema';

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
export const postPublicCakes = async (presentData: PresentFormSchemaType & { wishId: string }) => {
  try {
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
  } catch (error) {}
};

export const postAlimTalk = async (formData: AlimTalkSchemaType) => {
  try {
    const data = await client.post<DefaultResponseType>(
      `${API_VERSION_01}${PATH_PUBLIC.ALARM}`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return data.data;
  } catch (error) {}
};
