import PATH from '../common/path';
import { client } from '../common/axios';

export const getPgTokenData = async (pgToken: string | undefined) => {
  const data = await client.get(`${PATH.CAKES}/${PATH.APPROVE}?${PATH.PG_TOKEN}=${pgToken}`);

  return data;
};
