import LoginPageContainer from '@/domain/login/container';
import { LoginService } from '@/domain/login/service';

export default async function KakaoLoginPage({ searchParams }: { searchParams: { code: string } }) {
  const { code } = searchParams;

  return (
    <LoginPageContainer>
      <LoginService code={code} />
    </LoginPageContainer>
  );
}
