import { EditWishesInfoType } from '@/types/mypage/userInfoType';
import { client } from '../common/axios';
import PATH from '../common/path';

export const editWishesInfo = async (editWishesInfo: EditWishesInfoType) => {
  const accessToken = localStorage.getItem('accessToken');

  const data = await client.put(`${PATH.API}/${PATH.V1}/${PATH.WISHES}/${PATH.PROGRESS}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data.data.data;
};
