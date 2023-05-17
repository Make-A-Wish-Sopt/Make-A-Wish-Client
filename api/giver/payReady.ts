import { client } from '../common/axios';

export async function PayReady() {
  const data = await client.get(`/test`, {
    headers: {},
  });
  return data;
}
