import { postAuthKakao } from '@/api/auth';
import { SaveUserDataWithRedirectWishes } from './container';
import ErrorPage from '@/app/error';

export async function LoginService({ code }: { code: string }) {
  const loginUserData = await postAuthKakao(code);

  return (
    <>
      {loginUserData ? (
        <SaveUserDataWithRedirectWishes loginUserData={loginUserData} />
      ) : (
        <ErrorPage alertMessage="카카오 로그인 실패" />
      )}
    </>
  );
}
