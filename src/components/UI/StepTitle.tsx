import { WishesFormPresentIc } from '@public/assets/icons';
import Image from 'next/image';
import { ReactNode } from 'react';

export default function StepTitle({ title }: { title: ReactNode }) {
  return (
    <div className="flex items-center gap-10 mt-26 mb-20">
      <Image src={WishesFormPresentIc} alt="선물 아이콘 이미지" />
      <p className="font-bitbit text-main_blue text-[24px]">{title}</p>
    </div>
  );
}
