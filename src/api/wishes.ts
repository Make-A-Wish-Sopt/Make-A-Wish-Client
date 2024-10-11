import {
  DefaultResponseType,
  MainProgressDataResponseType,
  WishesCreateResponseType,
  WishesProgressDataResponseType,
} from '@/types/api/response';
import { client } from './common/axios';
import { API_VERSION_01, PATH_WISHES } from './path';
import { UseFormReturn } from 'react-hook-form';
import { SiteDataType } from '@/types/siteDataType';
import { WishesDataInputType } from '@/types/wishesType';
import { WishesLinkDataType } from '@/types/input';
import { getLoginUserCookiesData } from '@/utils/common/cookies';

/**
 * 진행중인 소원 조회
 */
export const getMainProgressWishesData = async () => {
  const { accessToken } = await getLoginUserCookiesData();

  if (!accessToken) return;

  try {
    const data = await client.get<MainProgressDataResponseType>(
      `${API_VERSION_01}${PATH_WISHES.MAIN}`,
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

/**
 * 모든 소원리스트 조회
 */
export const getWishes = async () => {
  const { accessToken } = await getLoginUserCookiesData();

  if (!accessToken) return;

  const data = await client.get(`${API_VERSION_01}${PATH_WISHES.DEFAULT}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data.data.data.wishes;
};

/**
 * 소원링크 생성
 */
export const postWishes = async (methods: UseFormReturn<WishesLinkDataType, any, undefined>) => {
  const { accessToken } = await getLoginUserCookiesData();

  if (!accessToken) return;

  const data = await client.post<WishesCreateResponseType>(
    `${API_VERSION_01}${PATH_WISHES.DEFAULT}`,
    {
      ...methods.getValues(),
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};

/**
 * 소원링크 삭제
 */
export const deleteWishes = async (wishesData: number[]) => {
  const { accessToken } = await getLoginUserCookiesData();

  if (!accessToken) return;

  const data = await client.delete(`${API_VERSION_01}${PATH_WISHES.DEFAULT}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
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
  const { accessToken } = await getLoginUserCookiesData();

  if (!accessToken) return;

  const imageTag =
    siteData &&
    (await client.get(
      `${API_VERSION_01}${PATH_WISHES.PRESENT_LINK_INFO}?url=${link}&tag=${siteData.IMAGE_TAG}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
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
          Authorization: `Bearer ${accessToken}`,
        },
      },
    ));
  return { imageTag, priceTag };
};

/**
 * 진행중인 소원 정보 조회
 */
export const getProgressWishLinkData = async () => {
  const loginUserCookiesData = await getLoginUserCookiesData();
  const accessToken = loginUserCookiesData?.accessToken;

  const data = await client.get<WishesProgressDataResponseType>(
    `${API_VERSION_01}${PATH_WISHES.PROGRESS}`,
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
 * 진행중인 소원 정보 수정
 */
export const putProgressWishes = async (
  methods: UseFormReturn<WishesDataInputType, any, undefined>,
) => {
  const { accessToken } = await getLoginUserCookiesData();

  if (!accessToken) return;

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
      price: methods.getValues('price'),
    },
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
 * 진행중인 소원 중단
 */
export const patchProgressWishes = async () => {
  const { accessToken } = await getLoginUserCookiesData();

  if (!accessToken) return;

  const data = await client.patch(`${API_VERSION_01}${PATH_WISHES.PROGRESS}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data.data.data;
};

/**
 * 소원 단건 조회
 */
export const getSingleWishInfo = async (wishId: string | string[] | undefined) => {
  const { accessToken } = await getLoginUserCookiesData();

  if (!accessToken) return;

  const data = await client.get(`${API_VERSION_01}${PATH_WISHES.GET_SINGLE_WISH_INFO(wishId)}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data.data.data;
};
