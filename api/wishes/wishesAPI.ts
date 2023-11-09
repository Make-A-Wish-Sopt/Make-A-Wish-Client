import PATH from '../../constant/path';
import { client } from '../common/axios';
import axios from 'axios';
import { SiteDataType } from '@/types/siteDataType';
import { AccountInfoType, WishesDataType } from '@/types/common/input';

export const createWishesLink = async (wishesData: WishesDataType) => {
  const accessToken = localStorage.getItem('accessToken');

  const data = await client.post(
    `${PATH.API}/${PATH.V1}/${PATH.WISHES}`,
    {
      imageUrl: wishesData.imageURL,
      price: wishesData.price,
      title: wishesData.title,
      hint: wishesData.hint,
      initial: wishesData.initial,
      startDate: wishesData.startDate,
      endDate: wishesData.endDate,
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

export const editUserAccount = async (accountInfo: AccountInfoType, phone: string) => {
  const accessToken = localStorage.getItem('accessToken');

  const data = await client.put(
    `${PATH.API}/${PATH.V1}/${PATH.USER}/${PATH.ACCOUNT}`,
    {
      accountInfo: {
        name: accountInfo.name,
        bank: accountInfo.bankName,
        account: accountInfo.account,
      },
      phone,
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

export const getItemInfo = async (link: string, siteData: SiteDataType | undefined) => {
  const accessToken = localStorage.getItem('accessToken');

  const imageTag =
    siteData &&
    (await client.get(
      `${PATH.API}/${PATH.V1}/${PATH.WISHES}/${PATH.PRESENT}/${PATH.INFO}?url=${link}&tag=${siteData.IMAGE_TAG}`,
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
      `${PATH.API}/${PATH.V1}/${PATH.WISHES}/${PATH.PRESENT}/${PATH.INFO}?url=${link}&tag=${siteData.PRICE_TAG}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    ));
  return { imageTag, priceTag };
};

export const getUserAccount = async () => {
  const accessToken = localStorage.getItem('accessToken');

  const data = await client.get(`${PATH.API}/${PATH.V1}/${PATH.USER}/${PATH.ACCOUNT}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data?.data;
};

export const getPresignedURL = async (fileName: string | undefined) => {
  const accessToken = localStorage.getItem('accessToken');
  const data = await client.get(
    `${PATH.API}/${PATH.V1}/${PATH.FILE}?${PATH.FILE_NAME}=${fileName}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return data;
};

export const uploadPresignedURL = async (signedURL: string, file: File | Blob | null) => {
  const data = await axios.put(signedURL, file, {
    headers: {
      'Content-Type': file?.type,
    },
  });

  return data;
};
