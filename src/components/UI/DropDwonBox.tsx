import Image from 'next/image';
import { CSSProperties, ReactNode } from 'react';
import { MainBlueArrowIc } from '../../../public/assets/icons';
import Box from '../Common/Box';

export default function DropDwonBox({
  isOpen,
  handleToggle,
  styles,
  children,
}: {
  isOpen: boolean;
  handleToggle: () => void;
  styles?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <Box bgColor="dark_green" fontColor="white" font="galmuri">
      <div className="flex items-center gap-8 w-full h-full text-[14px]" style={styles}>
        {children}
        <div className="h-full " onClick={handleToggle}>
          <Image
            src={MainBlueArrowIc}
            alt="화살표 아이콘"
            className={`origin-center ${isOpen ? 'rotate-90' : '-rotate-90'}`}
          />
        </div>
      </div>
    </Box>
  );
}
