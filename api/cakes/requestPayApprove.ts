import PATH from '../common/path';
import { CakesDataType } from '@/types/cakes/cakesDataType';
import { client } from '../common/axios';

export const requestPayApprove = async (cakesData: CakesDataType | undefined) => {
  const data = await client.post(
    `${PATH.API}/${PATH.V1}/${PATH.PUBLIC}/${PATH.PAY}/${PATH.APPROVE}`,
    {
      pgToken: cakesData?.pgToken,
      tid: cakesData?.tid,
      partnerOrderId: process.env.NEXT_PUBLIC_ORDER_ID,
      partnerUserId: process.env.NEXT_PUBLIC_USER_ID,
      name: cakesData?.giverName,
      cake: cakesData?.selectedCake.cakeNumber,
      message: cakesData?.message,
      wishId: cakesData?.wishId,
    },
    {
      headers: {},
    },
  );

  return data.data.data;
};
