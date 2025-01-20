import { getProgressWishLinkData } from '@/api/wishes';
import Header, { BackButton } from '@/components/Common/Hedaer';
import MypageContainer from '@/domain/mypage/container';
import MainLayout from '@/layouts/MainLayout';

import { getLoginUserCookiesData } from '@/utils/common/cookies';

export default async function Mypage() {
  const loginUserData = await getLoginUserCookiesData();

  if (!loginUserData) {
    return (
      <>
        <Header leftMenu={<BackButton routePath="/" />} />
        <MainLayout>
          <MypageContainer nickName={'조물주'} isLoggedIn={false} />
        </MainLayout>
      </>
    );
  }

  const { nickName } = loginUserData;

  const progressWishes = await getProgressWishLinkData();

  return (
    <>
      <Header leftMenu={<BackButton routePath="/wishes" />} />
      <MainLayout isPrivate>
        <MypageContainer nickName={nickName} progressWishes={progressWishes} isLoggedIn />
      </MainLayout>
    </>
  );
}
