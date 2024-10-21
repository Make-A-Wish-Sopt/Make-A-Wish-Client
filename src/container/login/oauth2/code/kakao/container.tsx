import Loading from '@/app/loading';
import { LoginUserDataType } from '@/utils/common/cookies';
import { redirect } from 'next/navigation';

export default async function LoginContainer({
  loginUserData,
}: {
  loginUserData?: LoginUserDataType;
}) {
  if (!loginUserData) {
    alert('카카오 로그인 에러');
    redirect('/');
  }

  await fetch('http://localhost:8080/api/set-cookies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginUserData),
  }).then(() => {
    redirect('/wishes');
  });

  return <></>;
}
