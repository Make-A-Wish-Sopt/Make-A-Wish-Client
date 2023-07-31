import { getUserInfo } from '@/api/mypage/getUserInfo';
import { QUERY_KEY } from '@/constant/queryKey';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import useInput from './useInput';
import { getDate } from '@/utils/common/getDate';
import { TODAY } from '@/constant/dateList';

export default function useUserInfo() {
  const { data } = useQuery(QUERY_KEY.USER, getUserInfo);

  const [startDate, setStartDate] = useState(getDate(TODAY, 0));
  const [endDate, setEndDate] = useState(getDate(startDate, 7));
  const [bankName, setBankName] = useState(data ? 'data' : '');
  const [account, handleChangeAccount] = useInput(data ? 'data' : '');
  const [phone, handleChangePhone] = useInput(data ? '010' : '');

  useEffect(() => {
    setEndDate(getDate(startDate, 7));
  }, [startDate]);

  const handleChangeBankName = (input: string) => {
    setBankName(input);
  };

  const changeStartDate = (value: Date) => {
    setStartDate(value);
  };



  return { startDate, changeStartDate, endDate, bankName, handleChangeBankName, account, handleChangeAccount, phone, handleChangePhone};
}
