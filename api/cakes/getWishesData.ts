import axios from 'axios';
import PATH from '../common/path';

export const getWishesData = async (wishesNumber: number) => {
  const data = await axios.get(
    `https://www.sunmulzu.shop/${PATH.API}/${PATH.V1}/${PATH.WISHES}/${wishesNumber}`,
  );

  return data.data.data;
};
