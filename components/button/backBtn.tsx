import { BackBtnIc } from '@/public/assets/icons';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function BackBtn() {
  const router = useRouter();

  return (
    <>
      <Image
        src={BackBtnIc}
        alt="뒤로가기"
        style={{ cursor: 'pointer' }}
        onClick={() => router.back()}
      ></Image>
    </>
  );
}
