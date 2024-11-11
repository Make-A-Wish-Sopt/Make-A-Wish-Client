import { postAuthKakao } from '@/api/auth';
import { LoginWithSavedCookiesDatas } from './container';
import ErrorPage from '@/app/error';

export async function LoginService({ code }: { code: string }) {
  const loginUserData = await postAuthKakao(code);

  return (
    <>
      {loginUserData ? (
        <LoginWithSavedCookiesDatas loginUserData={loginUserData} />
      ) : (
        <ErrorPage alertMessage="카카오 로그인 실패" />
      )}
    </>
  );
}
