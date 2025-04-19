'use client';

import { useFunnelContext } from '@/Context/FunnelContext';
import { BackBtnIc } from '@public/assets/icons';
import Image from 'next/image';

export default function StepBackHeader() {
  const { prevStep } = useFunnelContext();

  return (
    <header className="flex  w-full pt-16">
      <button type="button" onClick={prevStep}>
        <Image src={BackBtnIc} alt="뒤로가기 아이콘" />
      </button>
    </header>
  );
}
