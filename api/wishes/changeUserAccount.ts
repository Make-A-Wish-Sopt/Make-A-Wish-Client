import { AccountInfoType } from '@/types/wishes/accountInfotype';
import { client } from '../common/axios';
import PATH from '../common/path';

export const changeUserAccount = async (accountInfo: AccountInfoType) => {
  const accessToken = localStorage.getItem('accessToken');

  const data = await client.put(
    `${PATH.API}/${PATH.V1}/${PATH.USER}/${PATH.ACCOUNT}`,
    {
      name: accountInfo.name,
      bank: accountInfo.bank,
      account: accountInfo.account,
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
