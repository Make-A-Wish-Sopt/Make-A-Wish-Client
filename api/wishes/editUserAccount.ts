import { AccountInfoType } from '@/types/wishes/accountInfotype';
import { client } from '../common/axios';
import PATH from '../common/path';

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
