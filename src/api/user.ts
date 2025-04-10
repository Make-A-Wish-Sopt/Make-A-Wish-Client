import { client } from '@/configs/apiConfig';
import { BANK_LIST } from '@/constant/bankList';
import { DefaultResponseType, UserAccountDataResponseType } from '@/types/api/response';
import { AccountInfoType } from '@/types/wishesType';
import { AccountFormSchemaType } from '@/Schema/wishes.schema';
import { API_VERSION_01, PATH_USER } from './path';

export const putUserAccount = async (accountInputs: AccountFormSchemaType) => {
  try {
    const data = await client.put<DefaultResponseType>(
      `${API_VERSION_01}${PATH_USER.ACCOUNT}`,
      {
        accountInfo: accountInputs.accountInfo,
        kakaoPayCode: accountInputs.kakaoPayCode,
        forPayCode: accountInputs.forPayCode,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return data;
  } catch (error) {
    return null;
  }
};

export const getUserAccount = async () => {
  try {
    const data = await client.get<UserAccountDataResponseType>(
      `${API_VERSION_01}${PATH_USER.ACCOUNT}`,
    );

    return data?.data.data;
  } catch (error) {
    return null;
  }
};

export const deleteUserInfo = async () => {
  try {
    const data = await client.delete(`${API_VERSION_01}${PATH_USER.DEFAULT}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  } catch (error) {
    return null;
  }
};

export const postVerifyAccount = async (accountInfo: AccountInfoType) => {
  try {
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
        },
      },
    );

    return response.data;
  } catch (error) {
    return null;
  }
};
