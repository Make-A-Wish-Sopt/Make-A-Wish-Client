import Image from 'next/image';
import { useRouter } from 'next/router';
import { MenuIc } from '../../../public/assets/icons';

export default function Menu() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/wishes/mypage');
  };

  return <Image src={MenuIc} alt="메뉴 아이콘" />;
}
