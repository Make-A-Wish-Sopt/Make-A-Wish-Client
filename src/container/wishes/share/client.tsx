'use client';

import Button from '@/components/Common/Button';
import FixedBottomButton from '@/components/Common/Button/FixedBottomButton';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export default function WishesSharePageStateContainer({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <SharePageFixedButtons />
    </>
  );
}

function SharePageFixedButtons() {
  const router = useRouter();

  return (
    <>
      <FixedBottomButton>
        <div className="flex flex-col gap-10">
          <Button>생일잔치에 친구 초대하기</Button>
          <Button
            bgColor="gray4"
            fontColor="white"
            onClick={() => {
              router.push('/wishes');
            }}
          >
            홈으로 이동하기
          </Button>
        </div>
      </FixedBottomButton>
    </>
  );
}
