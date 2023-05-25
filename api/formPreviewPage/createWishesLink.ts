import PATH from '../common/path';
import { client } from '../common/axios';
import { WishesDataType } from '@/types/wishesDataType';

export async function createWishesLink(wishesData: WishesDataType) {
  const accessToken =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjgzMTgxODk1LCJleHAiOjE2ODgwMjAyOTV9.RnUKwBtESVxvKU6YeXy4ssAJlEGHnIKd2LewByQhI8cPuTAh9tJQeJiMyRLYwJHFg8YwUZ667F1QRCECf1uR6w';

  const startDate = wishesData.startDate.replaceAll('-', '.');
  const endDate = wishesData.endDate.replaceAll('-', '.');
  console.log(startDate, endDate);

  const data = await client.post(
    `${PATH.API}/${PATH.V1}/${PATH.WISHES}`,
    {
      imageUrl: wishesData.imageUrl,
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
