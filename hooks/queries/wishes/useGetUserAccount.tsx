import { getUserAccount } from '@/api/wishes/getUserAccount';
import { QUERY_KEY } from '@/constant/queryKey';
import useInput from '@/hooks/common/useInput';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

export default function useGetUserAccount() {
  const { data } = useQuery(QUERY_KEY.ITEM_DATA, getUserAccount);

  const [name, handleChangeName, setName] = useInput('');
  const [bankName, setBankName] = useState('');
  const [account, handleChangeAccount, setAccount] = useInput('');
  const [phone, handleChangePhone, setPhone] = useInput('');

  useEffect(() => {
    setName(data?.data?.accountInfo?.name);
    setBankName(data?.data?.accountInfo?.bank);
    setAccount(data?.data?.accountInfo?.account);
    setPhone(data?.data?.phone);
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
    phone,
    handleChangePhone,
    apiStatus: data?.success,
  };
}
