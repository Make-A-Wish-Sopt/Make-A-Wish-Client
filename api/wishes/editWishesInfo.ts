import { UserInfoType } from '@/types/mypage/userInfoType';
import { client } from '../common/axios';
import PATH from '../common/path';

export const editWishesInfo = async (userInfo: UserInfoType) => {
  const accessToken = localStorage.getItem('accessToken');

  const data = await client.put(
    `${PATH.API}/${PATH.V1}/${PATH.USER}`,
    {
      startDate: userInfo.startDate,
      endDate: userInfo.endDate,
      name: userInfo.name,
      bankName: userInfo.bankName,
      account: userInfo.account,
      phone: userInfo.phone,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};
