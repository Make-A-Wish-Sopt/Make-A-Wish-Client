'use client';

import { PropsWithChildren } from 'react';
import { useRouters } from '@/hooks/common/useRouters';
import { FixedBottomButtonWrapper } from '@/components/Common/Button/FixedBottomButton';
import Button from '@/components/Common/Button';
import CloseIconInModal from '@/components/Common/Modal/CloseIconInModal';
import useToggle from '@/hooks/common/useToggle';

export default function WishesSharePageContainer({ children }: {} & PropsWithChildren) {
  const { state, handleState } = useToggle();
  return (
    <>
      {children}
      <SharePageFixedButtons />
      {/* <CloseIconInModal isOpen={!state} handleState={handleState}></CloseIconInModal> */}
    </>
  );
}

function SharePageFixedButtons() {
  const { handleRouter } = useRouters();

  return (
    <>
      <FixedBottomButtonWrapper>
        <div className="flex flex-col gap-10">
          <Button>생일잔치에 친구 초대하기</Button>
          <Button
            bgColor="gray4"
            fontColor="white"
            onClick={() => {
              handleRouter('/wishes');
            }}
          >
            홈으로 이동하기
          </Button>
        </div>
      </FixedBottomButtonWrapper>
    </>
  );
}
