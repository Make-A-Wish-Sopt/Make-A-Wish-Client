import { client } from '../common/axios';
import * as cheerio from 'cheerio';

export const getItemImage = async (link: string) => {
  const data = await client.get(link);

  const $ = cheerio.load(data.data);
  const $price = $('.total-price');
  const $image = $('.prod-image__detail');
  const itemImage = `https:${$image[0].attributes[1].value}`;
  const totalPrice = $price[0].children[1].children[0].data;

  return { itemImage, totalPrice };
};
