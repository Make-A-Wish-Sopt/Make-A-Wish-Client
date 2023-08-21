import { getProgressData } from '@/api/main/getProgressData';
import { QUERY_KEY } from '@/constant/queryKey';
import { useState } from 'react';
import { useQuery } from 'react-query';

export default function useGetProgressData() {
  const [wishStatus, setWishStatus] = useState('none');

  const { data: progressData, isSuccess } = useQuery(
    QUERY_KEY.PROGRESS,
    async () => getProgressData(),
    {
      onSuccess: () => {
        if (progressData) {
          if (progressData.status === 'WHILE') {
            if (progressData.dayCount === 0) {
              setWishStatus('Dday');
            } else {
              setWishStatus('while');
            }
          } else if (progressData.status === 'END') {
            setWishStatus('end');
          } else if (progressData.status === 'before') {
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