import PATH from '../../constant/path';
import { client } from '../common/axios';
import { CakesDataType } from '@/types/cakes/cakesDataType';

export const getWishesData = async (wishesNumber: number) => {
  const data = await client.get(
    `${PATH.API}/${PATH.V1}/${PATH.PUBLIC}/${PATH.WISHES}/${wishesNumber}`,
  );
  return data.data.data;
};

export const requestPayApprove = async (cakesData: CakesDataType | undefined) => {
  const data = await client.post(
    `${PATH.API}/${PATH.V1}/${PATH.PUBLIC}/${PATH.PAY}/${PATH.APPROVE}`,
    {
      pgToken: cakesData?.pgToken,
      tid: cakesData?.tid,
      partnerOrderId: process.env.NEXT_PUBLIC_ORDER_ID,
      partnerUserId: process.env.NEXT_PUBLIC_USER_ID,
      name: cakesData?.giverName,
      cakeId: cakesData?.selectedCake.cakeNumber,
      message: cakesData?.message,
      wishId: cakesData?.wishId,
    },
    {
      headers: {},
    },
  );

  return data.data.data;
};

export const requestPayReady = async (userId: string, cakeNumber: number) => {
  return await client.post(
    `${PATH.API}/${PATH.V1}/${PATH.PUBLIC}/${PATH.PAY}/${PATH.READY}`,
    {
      partnerOrderId: process.env.NEXT_PUBLIC_ORDER_ID,
      partnerUserId: process.env.NEXT_PUBLIC_USER_ID,
      cake: cakeNumber,
      taxFreeAmount: '200',
      vatAmount: '1',
      approvalUrl: 'http://localhost:8080/cakes/approve',
      // approvalUrl: 'https://sunmulzu.store/cakes/approve',
      cancelUrl: 'https://sunmulzu.store/cakes',
      failUrl: 'https://sunmulzu.store/cakes',
    },
    {
      headers: {},
    },
  );
};