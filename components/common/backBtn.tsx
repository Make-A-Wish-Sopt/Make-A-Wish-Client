import { BackBtnIc } from '@/public/assets/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function BackBtn() {
  const router = useRouter();

  return (
    <>
      <Link href="../">
        <Image
          src={BackBtnIc}
          alt="뒤로가기"
          style={{ cursor: 'pointer' }}
          onClick={() => router.back()}
        ></Image>
      </Link>
    </>
  );
}
