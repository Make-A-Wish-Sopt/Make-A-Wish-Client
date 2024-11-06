import { BANK_LIST } from '@/constant/bankList';
import { client } from './common/axios';
import { API_VERSION_01, PATH_USER } from './path';
import { UseFormReturn } from 'react-hook-form';
import { DefaultResponseType, UserAccountDataResponseType } from '@/types/api/response';
import { AccountInfoType, WishesDataInputType } from '@/types/wishesType';
import axios from 'axios';
import { getLoginUserCookiesData } from '@/utils/common/cookies';

export const putUserAccount = async (
  methods: UseFormReturn<WishesDataInputType, any, undefined>,
) => {
  const data = await client.put<DefaultResponseType>(
    `${API_VERSION_01}${PATH_USER.ACCOUNT}`,
    {
      accountInfo: {
        name: methods.getValues('name'),
        bank: methods.getValues('bank'),
        account: methods.getValues('account'),
      },
      phone: methods.getValues('phone'),
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return data;
};

export const getUserAccount = async () => {
  try {
    const data = await client.get<UserAccountDataResponseType>(
      `${API_VERSION_01}${PATH_USER.ACCOUNT}`,
    );

    return data?.data.data;
  } catch (error) {}
};

export const deleteUserInfo = async () => {
  const data = await client.delete(`${API_VERSION_01}${PATH_USER.DEFAULT}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return data;
};

export const postVerifyAccount = async (accountInfo: AccountInfoType) => {
  const bankCode = BANK_LIST.find((bank) => bank.name === accountInfo.bank)?.bankCode;

  const response = await client.post<DefaultResponseType<number>>(
    `${API_VERSION_01}${PATH_USER.ACCOUNT_VERIFY}`,
    {
      bankCode,
      accountNumber: accountInfo.account,
      name: accountInfo.name,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    },
  );

  return response.data;
};
