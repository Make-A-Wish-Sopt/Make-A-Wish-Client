'use client';

import Box from '@/components/Common/Box';
import CheckBox from '@/components/UI/CheckBox';
import Image from 'next/image';
import { ArrowRightIc } from '../../../../public/assets/icons';
import useToggle from '@/hooks/common/useToggle';
import { useEffect } from 'react';
import { useRouters } from '@/hooks/common/useRouters';

export function WishHistoryBox({
  wishTitle,
  period,
  wishId,
  addToDeleteIdList,
  removeToDeleteIdList,
}: {
  wishTitle: string;
  period: string;
  wishId: number;
  addToDeleteIdList: (id: number) => void;
  removeToDeleteIdList: (id: number) => void;
}) {
  const { state: checkedState, changeState: changeCheckedState } = useToggle();

  const { handleRouter } = useRouters();

  useEffect(() => {
    if (checkedState) {
      addToDeleteIdList(wishId);
    } else {
      removeToDeleteIdList(wishId);
    }
  }, [checkedState]);

  function handleClick(e: React.MouseEvent) {
    handleRouter(`/mypage/wishes-history/${wishId}`);
  }

  return (
    <Box
      styles={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 'auto',
        padding: '14px 20px',
      }}
    >
      <CheckBox changeCheckedState={changeCheckedState}>
        <div className="flex flex-col w-full  ml-10">
          <h3 className="font-bitbit text-[18px] text-main_blue">{wishTitle}</h3>
          <p className="font-galmuri text-[11px] text-gray2">{period}</p>
        </div>
      </CheckBox>
      <div className="flex flex-row-reverse w-35 h-35" onClick={handleClick}>
        <Image src={ArrowRightIc} alt="왼쪽 화살표" width={10} priority />
      </div>
    </Box>
  );
}
