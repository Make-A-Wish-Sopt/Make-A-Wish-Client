import { PARSING_TAG_KEY } from '@/constant/parsingTagKey';
import { client } from '../common/axios';

import PATH from '../common/path';

export const getItemInfo = async (link: string) => {
  const accessToken = localStorage.getItem('accessToken');

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
