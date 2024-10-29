import Image from 'next/image';
import { PropsWithChildren } from 'react';
import { MainBlueArrowIc } from '../../../public/assets/icons';
import Box, { BoxProps } from '../Common/Box';

interface DropDownBoxProps extends BoxProps {
  isOpen: boolean;
  handleToggle: () => void;
}

export default function DropDwonBox({
  isOpen,
  handleToggle,
  ...rest
}: PropsWithChildren<DropDownBoxProps>) {
  return (
    <Box {...rest}>
      <div className="flex items-center gap-8 w-full h-full text-[14px]">
        {rest.children}
        <div onClick={handleToggle}>
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
