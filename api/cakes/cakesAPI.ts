import PATH from '../../constant/path';
import { client } from '../common/axios';
import { CakesDataType } from '@/types/cakes/cakesDataType';

export const getWishesData = async () => {
  const pathname = window.location.pathname.replace('/cakes/', '');
  const wishesNumber = pathname.replace('/wishes/', '');

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

export const requestPayReady = async (wishId: number, cakeNumber: number) => {
  return await client.post(
    `${PATH.API}/${PATH.V1}/${PATH.PUBLIC}/${PATH.PAY}/${PATH.READY}`,
    {
      partnerOrderId: process.env.NEXT_PUBLIC_ORDER_ID,
      partnerUserId: process.env.NEXT_PUBLIC_USER_ID,
      cake: cakeNumber,
      taxFreeAmount: '200',
      vatAmount: '1',
      approvalUrl: `${process.env.NEXT_PUBLIC_KAKAOPAY_REDIRECT_URI}`,
      cancelUrl: `https://sunmulzu.store/${wishId}`,
      failUrl: `https://sunmulzu.store/${wishId}`,
    },
    {
      headers: {},
    },
  );
};
