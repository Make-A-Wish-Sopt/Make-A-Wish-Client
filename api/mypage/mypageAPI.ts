import { client } from '../common/axios';
import PATH from '../../constant/path';
import { EditWishesInfoDataType } from '@/types/mypage/editWishesInfoDataType';

export const getEditWishesInfo = async () => {
  const accessToken = localStorage.getItem('accessToken');

  const data = await client.get(`${PATH.API}/${PATH.V1}/${PATH.WISHES}/${PATH.PROGRESS}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data.data.data;
};

export const editWishesInfo = async (editWishesInfoData: EditWishesInfoDataType) => {
  const accessToken = localStorage.getItem('accessToken');

  const data = await client.put(
    `${PATH.API}/${PATH.V1}/${PATH.WISHES}/${PATH.PROGRESS}`,
    { editWishesInfoData },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return data.data.data;
};

export const deleteUserInfo = async () => {
  const accessToken = localStorage.getItem('accessToken');

  const data = await client.delete(`${PATH.API}/${PATH.V1}/${PATH.USER}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};
