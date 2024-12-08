import Image from 'next/image';
import { PropsWithChildren } from 'react';
import { MainBlueArrowIc } from '../../../public/assets/icons';
import Box, { BoxProps } from '../Common/Box';

interface DropDownBoxProps extends BoxProps {
  isOpen: boolean;
  handleState: () => void;
}

export default function DropDwonBox({
  isOpen,
  handleState,
  ...rest
}: PropsWithChildren<DropDownBoxProps>) {
  return (
    <Box {...rest} styles={{ padding: isOpen && '0', height: isOpen && 'auto' }}>
      <div className="flex items-center gap-8 w-full h-full text-[14px]">
        {rest.children}
        <div onClick={handleState}>
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
