'use client';

import FixedBottomButton from '@/components/Common/Button/FixedBottomButton';
import { useRouter } from 'next/navigation';

export function WishesCreateBeforeCakesList() {
  return <></>;
}

export function WishesCreateButton() {
  const router = useRouter();
  const handleWishesCreate = () => {
    router.push('/wishes/create');
  };

  return (
    <FixedBottomButton bgColor="main_blue" fontColor="black" onClick={handleWishesCreate}>
      생일잔치 링크 생성하기
    </FixedBottomButton>
  );
}
