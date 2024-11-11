import Header from '@/components/Common/Hedaer';
import MainPageContainer from '@/domain/home/container';

import MainLayout from '@/layouts/MainLayout';
import { getLoginUserCookiesData } from '@/utils/common/cookies';

export default async function Home() {
  const isLoggedIn = (await getLoginUserCookiesData()) ? true : false;

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <MainLayout>
        <MainPageContainer />
      </MainLayout>
    </>
  );
}
