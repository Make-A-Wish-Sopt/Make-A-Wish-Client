import Header from '@/components/Common/Hedaer';
import MypageContainer from '@/domain/mypage/container';
import MainLayout from '@/layouts/MainLayout';

import { getLoginUserCookiesData } from '@/utils/common/cookies';

export default async function Mypage() {
  const { nickName } = await getLoginUserCookiesData();

  return (
    <>
      <Header backBtn />
      <MainLayout>
        <MypageContainer nickName={nickName} />
      </MainLayout>
    </>
  );
}
