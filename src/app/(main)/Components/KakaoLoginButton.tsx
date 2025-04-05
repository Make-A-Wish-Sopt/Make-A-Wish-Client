import Button from '@/components/Elements/Button';
import useKakaoAuth from '@/hooks/useKakaoAuth';
import { KakaoLoginIc } from '@public/assets/icons';
import Image from 'next/image';

const KakaoLoginButton = () => {
  //변경예정 : react-query
  const { handleKaKaoLogin } = useKakaoAuth();

  return (
    <Button
      bgColor="yellow"
      fontColor="black"
      onClick={handleKaKaoLogin}
      style={{ marginTop: '3.3rem' }}
      icon={<Image src={KakaoLoginIc} alt="카카오 로고 아이콘" />}
    >
      카카오톡 로그인으로 시작하기
    </Button>
  );
};

export default KakaoLoginButton;
