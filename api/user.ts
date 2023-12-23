import { getAccessToken } from '@/utils/common/token';
import { client } from './common/axios';
import { API_VERSION_01, PATH_USER } from './path';
import { UseFormReturn } from 'react-hook-form';

import { UserAccountDataResponseType } from '@/types/api/response';
import { WishesDataInputType } from '@/types/wishesType';

const ACCESS_TOKEN = getAccessToken();

export const patchUserAccount = async (
  methods: UseFormReturn<WishesDataInputType, any, undefined>,
) => {
  const data = await client.put(
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
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    },
  );
  return data;
};

export const getUserAccount = async () => {
  const data = await client.get<UserAccountDataResponseType>(
    `${API_VERSION_01}${PATH_USER.ACCOUNT}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    },
  );
  return data?.data.data;
};

export const deleteUserInfo = async () => {
  const data = await client.delete(`${API_VERSION_01}${PATH_USER.DEFAULT}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  return data;
};
