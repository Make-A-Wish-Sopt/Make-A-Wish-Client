import { postAuthKakao } from '@/api/auth';
import LoginPageContainer from '@/domain/login/container';
import { LoginService } from '@/domain/login/service';
// import LoginContainer from '@/container/login/oauth2/code/kakao/container';

export default async function KakaoLoginPage({ searchParams }: { searchParams: { code: string } }) {
  const { code } = searchParams;
  return (
    <>
      <LoginPageContainer>
        <LoginService code={code} />
      </LoginPageContainer>
    </>
  );
}
