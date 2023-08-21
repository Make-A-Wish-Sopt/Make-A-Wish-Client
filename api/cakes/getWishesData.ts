import PATH from '../common/path';
import { client } from '../common/axios';

export const getWishesData = async (wishesNumber: string | string[] | undefined) => {
  const data = await client.get(
    `${PATH.API}/${PATH.V1}/${PATH.PUBLIC}/${PATH.WISHES}/${wishesNumber}`,
  );

  return data.data.data;
};
