import PATH from '../common/path';
import { CakesDataType } from '@/types/cakes/cakesDataType';
import { client } from '../common/axios';

export async function postPayApprove(
  pgToken: string | string[] | undefined,
  cakesData: CakesDataType | undefined,
  wishId: number,
) {
  const data = await client.post(
    `${PATH.API}/${PATH.V1}/${PATH.CAKES}/${PATH.PAY}/${PATH.APPROVE}`,
    {
      pgToken: pgToken,
      tid: cakesData?.tid,
      partnerOrderId: process.env.NEXT_PUBLIC_ORDER_ID,
      partnerUserId: process.env.NEXT_PUBLIC_USER_ID,
      name: cakesData?.giverName,
      cake: cakesData?.selectedCake.cakeNumber,
      message: cakesData?.message,
      wishId: wishId,
    },
    {
      headers: {},
    },
  );

  return data.data.data;
}
