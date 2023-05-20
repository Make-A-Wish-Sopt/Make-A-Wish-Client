import axios from 'axios';
import PATH from '../common/path';

export async function postPayReady(userId: string, cakeNumber: number) {
  return await axios.post(
    `https://www.sunmulzu.shop/${PATH.API}/${PATH.V1}/${PATH.CAKES}/${PATH.PAY}/${PATH.READY}`,
    {
      partnerOrderId: 'test123',
      partnerUserId: userId,
      cake: cakeNumber,
      taxFreeAmount: '200',
      vatAmount: '1',
      approvalUrl: 'http://localhost:8080/cakes/approve',
      cancelUrl: 'http://localhost:8080/api/v1/cakes/pay/approve',
      failUrl: 'http://localhost:8080/api/v1/cakes/pay/approve',
    },
    {
      headers: {},
    },
  );
}
