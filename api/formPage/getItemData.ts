import { PARSING_TAG_KEY } from '@/constant/parsingTagKey';
import { client } from '../common/axios';

import PATH from '../common/path';

export const getItemInfo = async (link: string) => {
  const accessToken =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjgzMTgxODk1LCJleHAiOjE2ODgwMjAyOTV9.RnUKwBtESVxvKU6YeXy4ssAJlEGHnIKd2LewByQhI8cPuTAh9tJQeJiMyRLYwJHFg8YwUZ667F1QRCECf1uR6w';
  
  const imageTag = await client.get(
    `${PATH.API}/${PATH.V1}/${PATH.WISHES}/${PATH.PRESENT}/${PATH.INFO}?url=${link}&tag=${PARSING_TAG_KEY['29cm'].imageTag}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const priceTag = await client.get(
    `${PATH.API}/${PATH.V1}/${PATH.WISHES}/${PATH.PRESENT}/${PATH.INFO}?url=${link}&tag=${PARSING_TAG_KEY['29cm'].priceTag}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return { imageTag, priceTag };
};
