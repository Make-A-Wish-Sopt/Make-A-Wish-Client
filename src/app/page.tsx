import Header from '@/components/Common/Hedaer';
import MainPageContainer from '@/container/container';
import MainLayout from '@/layouts/MainLayout';
import { getLoginUserCookiesData } from '@/utils/common/cookies';

export default async function Home() {
  const isLoggedIn = (await getLoginUserCookiesData()) ? true : false;

  // 로그인 되어 있다면 Wishes 페이지로 리디렉션
  // if (isLoggedIn) {
  //   setTimeout(() => {
  //     redirect('/wishes');
  //   }, 500);
  // }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <MainLayout>
        <MainPageContainer />
      </MainLayout>
    </>
  );
}
