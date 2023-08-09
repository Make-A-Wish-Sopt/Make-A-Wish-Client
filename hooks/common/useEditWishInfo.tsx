import { getEditWishesInfo } from '@/api/mypage/getEditWishesInfo';
import { QUERY_KEY } from '@/constant/queryKey';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import useInput from './useInput';
import { getDate } from '@/utils/common/getDate';
import { TODAY } from '@/constant/dateList';

export default function useEditWishesInfo() {
  const { data, isSuccess } = useQuery(QUERY_KEY.USER, getEditWishesInfo);

  console.log(data?.startDate);
  const test = new Date(data?.startDate);
  console.log(test);

  const [startDate, setStartDate] = useState<Date>(getDate(TODAY, 0));
  const [endDate, setEndDate] = useState<Date>(getDate(startDate, 7));
  const [name, handleChangeName, setName] = useInput('');
  const [bankName, setBankName] = useState('');
  const [account, handleChangeAccount, setAccount] = useInput('');
  const [phone, handleChangePhone, setPhone] = useInput('');

  useEffect(() => {
    const startDate = new Date(data?.startDate);
    // setStartDate(startDate);
    // setEndDate(data?.endDate);
    setName(data?.accountInfo?.name);
    setBankName(data?.accountInfo?.bank);
    setAccount(data?.accountInfo?.account);
    setPhone(data?.phone);
  }, [data]);

  useEffect(() => {
    setEndDate(getDate(startDate, 7));
  }, [startDate]);

  const handleChangeBankName = (input: string) => {
    setBankName(input);
  };

  const changeStartDate = (value: Date) => {
    setStartDate(value);
  };

  return {
    startDate,
    changeStartDate,
    endDate,
    name,
    handleChangeName,
    bankName,
    handleChangeBankName,
    account,
    handleChangeAccount,
    phone,
    handleChangePhone,
    isSuccess,
  };
}
