import PATH from '../common/path';
import { client } from '../common/axios';

export async function postPayReady(userId: string, cakeNumber: number) {
  return await client.post(
    `${PATH.API}/${PATH.V1}/${PATH.CAKES}/${PATH.PAY}/${PATH.READY}`,
    {
      partnerOrderId: process.env.NEXT_PUBLIC_ORDER_ID,
      partnerUserId: process.env.NEXT_PUBLIC_USER_ID,
      cake: cakeNumber,
      taxFreeAmount: '200',
      vatAmount: '1',
      approvalUrl: 'http://localhost:8080/cakes/approve',
      cancelUrl: 'http://localhost:8080/cakes',
      failUrl: 'http://localhost:8080/cakes',
    },
    {
      headers: {},
    },
  );
}
