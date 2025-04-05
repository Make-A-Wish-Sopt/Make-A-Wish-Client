import { postAuthKakao } from '@/api/auth';

import MainLayout from '@/layouts/MainLayout';
import SaveUserDataWithRedirectWishes from './Components/Login';

//변경예정

interface PageProps {
  searchParams: {
    code: string;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  if (!searchParams.code) {
    return <div className="text-white">카카오 로그인 에러</div>;
  }
  const { code } = searchParams;
  const loginUserData = await postAuthKakao(code);

  if (!loginUserData) {
    return <div className="text-white">카카오 로그인 에러</div>;
  }

  return (
    <MainLayout>
      <SaveUserDataWithRedirectWishes loginUserData={loginUserData} />
    </MainLayout>
  );
};

export default Page;
