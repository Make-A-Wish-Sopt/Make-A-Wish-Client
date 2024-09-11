import { SizesTypes } from '@/styles/sizes';
import Image from 'next/image';
import { CSSProperties, ReactNode } from 'react';
import { MainBlueArrowIc } from '../../../public/assets/icons';

export default function DropDwonBox({
  isOpen,
  handleToggle,
  styles,
  width,
  height,
  children,
}: {
  isOpen: boolean;
  handleToggle: () => void;
  styles?: CSSProperties;
  width?: keyof SizesTypes;
  height?: keyof SizesTypes;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-8 w-full  font-galmuri text-white text-[14px] bg-dark_green round-xl rounded-xl">
      {children}
      <div className="h-full " onClick={handleToggle}>
        <Image
          src={MainBlueArrowIc}
          alt="화살표 아이콘"
          className={`origin-center ${isOpen ? '' : '-'}rotate-90`}
        />
      </div>
    </div>
  );
}
