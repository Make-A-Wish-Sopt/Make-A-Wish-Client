import PATH from '../common/path';
import { client } from '../common/axios';
import { WishesDataType } from '@/types/wishes/wishesDataType';

export const createWishesLink = async (wishesData: WishesDataType) => {
  const accessToken = localStorage.getItem('accessToken');

  const data = await client.post(
    `${PATH.API}/${PATH.V1}/${PATH.WISHES}`,
    {
      imageUrl: wishesData.imageURL,
      price: wishesData.price,
      title: wishesData.title,
      hint: wishesData.hint,
      initial: wishesData.initial,
      startDate: wishesData.startDate,
      endDate: wishesData.endDate,
      phone: wishesData.phone,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};
