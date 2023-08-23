import PATH from '../common/path';
import { client } from '../common/axios';

export const getWishesData = async (wishesNumber: number) => {
  const data = await client.get(
    `${PATH.API}/${PATH.V1}/${PATH.PUBLIC}/${PATH.WISHES}/${wishesNumber}`,
  );
  return data.data.data;
};
