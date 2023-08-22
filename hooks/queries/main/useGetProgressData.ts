import { getProgressData } from '@/api/main/getProgressData';
import { QUERY_KEY } from '@/constant/queryKey';
import { LoginUserInfo } from '@/recoil/auth/loginUserInfo';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

export default function useGetProgressData() {
  const [wishStatus, setWishStatus] = useState('');

  const { data: progressData, isSuccess } = useQuery(
    QUERY_KEY.PROGRESS,
    getProgressData,
    {
      onSuccess: (data) => {
        if (data) {
          if (data.status === 'WHILE') {
            setWishStatus('while');
          } else if (data.status === 'END') {
            setWishStatus('end');
          } else if (data.status === 'BEFORE') {
            setWishStatus('before');
          }
        } else {
          setWishStatus('none');
        }
      },
    }
  );

  return { progressData, wishStatus, isSuccess };
}