import { getUserAccount } from '@/api/wishes/getUserAccount';
import { QUERY_KEY } from '@/constant/queryKey';
import useInput from '@/hooks/common/useInput';
import { AccountInfoType } from '@/types/wishes/accountInfotype';
import { useState } from 'react';
import { useQuery } from 'react-query';

export default function useGetUserAccount() {
  const { data, isSuccess } = useQuery(QUERY_KEY.ITEM_DATA, getUserAccount);

  const [name, handleChangeName] = useInput(isSuccess ? data?.accountInfo.name : '');
  const [bankName, setBankName] = useState(isSuccess ? data?.accountInfo.bank : '');
  const [account, handleChangeAccount] = useInput(isSuccess ? data?.accountInfo.account : '');

  const [accountInfo, setAccountInfo] = useState<AccountInfoType>({
    name: name,
    bank: bankName,
    account: account,
  });

  const handleChangeBankName = (input: string) => {
    setBankName(input);
  };

  return {
    name,
    handleChangeName,
    bankName,
    handleChangeBankName,
    account,
    handleChangeAccount,
    accountInfo,
    setAccountInfo,
    isSuccess,
  };
}
