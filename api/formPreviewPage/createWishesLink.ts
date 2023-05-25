import PATH from '../common/path';
import { client } from '../common/axios';
import { WishesDataType } from '@/types/wishesDataType';

export async function createWishesLink(wishesData: WishesDataType) {
  const data = await client.post(
    `${PATH.API}/${PATH.V1}/${PATH.WISHES}`,
    {
      imageUrl: wishesData.imageUrl,
      price: wishesData.price,
      title: wishesData.title,
      hint1: wishesData.hint1,
      hint2: wishesData.hint2,
      startDate: wishesData.startDate,
      endDate: wishesData.endDate,
      name: wishesData.name,
      bankName: wishesData.bankName,
      account: wishesData.account,
      phone: wishesData.phone,
    },
    {
      headers: {},
    },
  );
  return data;
}
