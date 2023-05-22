import axios from 'axios';

export async function getWishesMain() {
  const url = `https://www.sunmulzu.shop/api/v1/wishes/main`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error :', error);
    throw error;
  }
}