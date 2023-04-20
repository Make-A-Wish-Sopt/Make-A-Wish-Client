import { client } from './common/axios';

export async function test() {
  const data = await client.get(`/test`, {
    headers: {},
  });
  return data;
}
