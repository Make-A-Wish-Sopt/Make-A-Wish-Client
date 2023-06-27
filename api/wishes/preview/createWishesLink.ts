import PATH from '../../common/path';
import { client } from '../../common/axios';
import { WishesDataType } from '@/types/wishes/wishesDataType';

export async function createWishesLink(wishesData: WishesDataType) {
  const accessToken = localStorage.getItem('accessToken');

  const startDate = wishesData.startDate.replaceAll('-', '.');
  const endDate = wishesData.endDate.replaceAll('-', '.');

  const data = await client.post(
    `${PATH.API}/${PATH.V1}/${PATH.WISHES}`,
    {
      imageUrl: wishesData.imageURL,
      price: wishesData.price,
      title: wishesData.title,
      hint1: wishesData.hint1,
      hint2: wishesData.hint2,
      startDate: startDate,
      endDate: endDate,
      name: wishesData.name,
      bankName: wishesData.bankName,
      account: wishesData.account,
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
}
