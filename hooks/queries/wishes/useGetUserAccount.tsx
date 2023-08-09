import { getUserAccount } from '@/api/wishes/getUserAccount';
import { QUERY_KEY } from '@/constant/queryKey';
import useInput from '@/hooks/common/useInput';
import { AccountInfoType } from '@/types/wishes/accountInfotype';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

export default function useGetUserAccount() {
  const { data, isSuccess } = useQuery(QUERY_KEY.ITEM_DATA, getUserAccount);

  const [name, handleChangeName, setName] = useInput('');
  const [bankName, setBankName] = useState('');
  const [account, handleChangeAccount, setAccount] = useInput('');

  const [accountInfo, setAccountInfo] = useState<AccountInfoType>({
    name: name,
    bank: bankName,
    account: account,
  });

  useEffect(() => {
    setName(data?.accountInfo?.name);
    setBankName(data?.accountInfo?.bank);
    setAccount(data?.accountInfo?.account);
  }, [data]);

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
