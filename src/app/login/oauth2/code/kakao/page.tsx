import { postAuthKakao } from '@/api/auth';
import LoginContainer from '@/container/login/oauth2/code/kakao/container';

export default async function KakaoLoginPage({ searchParams }: { searchParams: { code: string } }) {
  const loginUserData = await postAuthKakao(searchParams.code);

  return <LoginContainer loginUserData={loginUserData} />;
}
