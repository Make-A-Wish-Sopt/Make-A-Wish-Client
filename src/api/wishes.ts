import {
  DefaultResponseType,
  MainProgressDataResponseType,
  WishesCreateResponseType,
  WishesHistoryListResponseType,
  WishesHistoryResponseType,
  WishesProgressDataResponseType,
} from '@/types/api/response';
import { AccountFormSchemaType, WishesFormScehmaType } from '@/Schema/wishes.schema';
import { client } from '../configs/apiConfig';
import { API_VERSION_01, PATH_WISHES } from './path';

/**
 * 진행중인 생일잔치 조회
 */
export const getMainProgressWishesData = async () => {
  try {
    const data = await client.get<MainProgressDataResponseType>(
      `${API_VERSION_01}${PATH_WISHES.MAIN}`,
    );

    return data.data.data;
  } catch (error) {
    return;
  }
};

/**
 * 모든 생일잔치리스트 조회
 */
export const getWishes = async () => {
  try {
    const data = await client.get<WishesHistoryListResponseType>(
      `${API_VERSION_01}${PATH_WISHES.DEFAULT}`,
      {
        adapter: 'fetch',
        fetchOptions: { cache: 'no-store' },
      },
    );

    return data.data.data.wishes;
  } catch (error) {
    return;
  }
};

/**
 * 생일잔치링크 생성
 */
export const postWishes = async (wishesData: WishesFormScehmaType) => {
  try {
    const data = await client.post<WishesCreateResponseType>(
      `${API_VERSION_01}${PATH_WISHES.DEFAULT}`,
      {
        ...wishesData,
      },
    );

    return data;
  } catch (error) {
    return;
  }
};

/**
 * 생일잔치링크 삭제
 */
export const deleteWishes = async (wishesIdList: number[]) => {
  try {
    const data = await client.delete<DefaultResponseType>(
      `${API_VERSION_01}${PATH_WISHES.DEFAULT}`,
      {
        data: {
          wishes: wishesIdList,
        },
      },
    );

    return data;
  } catch (error) {
    return;
  }
};

/**
 * 진행중인 생일잔치 정보 조회
 */
export const getProgressWishLinkData = async () => {
  try {
    const data = await client.get<WishesProgressDataResponseType>(
      `${API_VERSION_01}${PATH_WISHES.PROGRESS}`,
    );

    return data.data.data;
  } catch (error) {
    return null;
  }
};

/**
 * 진행중인 생일잔치 정보 수정
 */
export const putProgressWishes = async (editData: WishesFormScehmaType & AccountFormSchemaType) => {
  try {
    const data = await client.put<DefaultResponseType>(`${API_VERSION_01}${PATH_WISHES.PROGRESS}`, {
      ...editData,
    });

    return data.data;
  } catch (error) {
    return;
  }
};

/**
 * 진행중인 생일잔치 중단
 */
export const patchProgressWishes = async () => {
  try {
    const data = await client.patch<DefaultResponseType>(
      `${API_VERSION_01}${PATH_WISHES.PROGRESS}`,
      {},
    );

    return data.data;
  } catch (error) {
    return;
  }
};

/**
 * 생일잔치 단건 조회
 */
export const getSingleWishInfo = async (wishId: string | string[] | undefined) => {
  try {
    const data = await client.get<WishesHistoryResponseType>(
      `${API_VERSION_01}${PATH_WISHES.GET_SINGLE_WISH_INFO(wishId)}`,
    );

    return data.data.data;
  } catch (error) {
    return;
  }
};
