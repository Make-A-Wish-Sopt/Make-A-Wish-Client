import { EditWishesInfoDataType } from '@/types/mypage/editWishesInfoDataType';
import { client } from '../common/axios';
import PATH from '../../constant/path';

export const editWishesInfo = async (editWishesInfoData: EditWishesInfoDataType) => {
  const accessToken = localStorage.getItem('accessToken');
  console.log(editWishesInfoData);

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
