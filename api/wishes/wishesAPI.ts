import { AccountInfoType } from '@/types/wishes/accountInfotype';
import PATH from '../../constant/path';
import { client } from '../common/axios';
import { WishesDataType } from '@/types/wishes/wishesDataType';
import { PARSING_TAG_KEY } from '@/constant/parsingTagKey';

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
      phone: wishesData.phone,
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

export const getItemInfo = async (link: string) => {
  const accessToken = localStorage.getItem('accessToken');

  const imageTag = await client.get(
    `${PATH.API}/${PATH.V1}/${PATH.WISHES}/${PATH.PRESENT}/${PATH.INFO}?url=${link}&tag=${PARSING_TAG_KEY['29cm'].imageTag}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const priceTag = await client.get(
    `${PATH.API}/${PATH.V1}/${PATH.WISHES}/${PATH.PRESENT}/${PATH.INFO}?url=${link}&tag=${PARSING_TAG_KEY['29cm'].priceTag}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

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
