import { MainProgressDataResponseType, WishesProgressDataResponseType } from '@/types/api/response';
import { client } from './common/axios';
import { getAccessToken } from '@/utils/common/token';
import { API_VERSION_01, PATH_WISHES } from './path';

import { UseFormReturn } from 'react-hook-form';
import { SiteDataType } from '@/types/siteDataType';
import { WishesDataInputType } from '@/types/wishesType';

const ACCESS_TOKEN = getAccessToken();

/**
 * 진행중인 소원 조회
 */
export const getMainProgressData = async () => {
  const data = await client.get<MainProgressDataResponseType>(
    `${API_VERSION_01}${PATH_WISHES.MAIN}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    },
  );

  return data.data.data;
};

/**
 * 모든 소원리스트 조회
 */
export const getWishes = async () => {
  const data = await client.get(`${API_VERSION_01}${PATH_WISHES.DEFAULT}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  return data.data.data.wishes;
};

/**
 * 소원링크 생성
 */
export const postWishes = async (methods: UseFormReturn<WishesDataInputType, any, undefined>) => {
  const data = await client.post(
    `${API_VERSION_01}${PATH_WISHES.DEFAULT}`,
    {
      imageUrl: methods.getValues('imageUrl'),
      price: methods.getValues('price'),
      title: methods.getValues('title'),
      hint: methods.getValues('hint'),
      initial: methods.getValues('initial'),
      phone: methods.getValues('phone'),
      startDate: methods.getValues('startDate'),
      endDate: methods.getValues('endDate'),
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    },
  );
  return data;
};

/**
 * 소원링크 삭제
 */
export const deleteWishes = async (wishesData: number[]) => {
  const data = await client.delete(`${API_VERSION_01}${PATH_WISHES.DEFAULT}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    data: {
      wishes: wishesData,
    },
  });

  return data;
};

/**
 * 29cm에서 파싱한 데이터
 */
export const getPresentLinkInfo = async (link: string, siteData: SiteDataType | undefined) => {
  const imageTag =
    siteData &&
    (await client.get(
      `${API_VERSION_01}${PATH_WISHES.PRESENT_LINK_INFO}?url=${link}&tag=${siteData.IMAGE_TAG}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      },
    ));

  const priceTag =
    siteData &&
    (await client.get(
      `${API_VERSION_01}${PATH_WISHES.PRESENT_LINK_INFO}?url=${link}&tag=${siteData.PRICE_TAG}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      },
    ));
  return { imageTag, priceTag };
};

/**
 * 진행중인 소원 정보 조회
 */
export const getProgressWishInfo = async () => {
  const data = await client.get<WishesProgressDataResponseType>(
    `${API_VERSION_01}${PATH_WISHES.PROGRESS}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    },
  );

  return data.data.data;
};

/**
 * 진행중인 소원 정보 수정
 */
export const patchProgressWishInfo = async (
  methods: UseFormReturn<WishesDataInputType, any, undefined>,
) => {
  const data = await client.put(
    `${API_VERSION_01}${PATH_WISHES.PROGRESS}`,
    {
      title: methods.getValues('title'),
      hint: methods.getValues('hint'),
      initial: methods.getValues('initial'),
      imageUrl: methods.getValues('imageUrl'),
      phone: methods.getValues('phone'),
      account: methods.getValues('account'),
      bank: methods.getValues('bank'),
      name: methods.getValues('name'),
      startDate: methods.getValues('startDate'),
      endDate: methods.getValues('endDate'),
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    },
  );

  return data.data.data;
};

/**
 * 소원 단건 조회
 */
export const getSingleWishInfo = async (wishId: string | string[] | undefined) => {
  const data = await client.get(`${API_VERSION_01}${PATH_WISHES.GET_SINGLE_WISH_INFO(wishId)}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  return data.data.data;
};
