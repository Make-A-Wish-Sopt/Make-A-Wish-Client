import Image from 'next/image';
import { PropsWithChildren } from 'react';
import { MainBlueArrowIc } from '../../../public/assets/icons';
import Box, { BoxProps } from '../Elements/Box';

interface DropDownBoxProps extends BoxProps {
  isOpen: boolean;
  changeOpenState: () => void;
}

export default function DropDwonBox({
  isOpen,
  changeOpenState,
  ...rest
}: PropsWithChildren<DropDownBoxProps>) {
  return (
    <Box
      {...rest}
      styles={{
        height: isOpen && 'auto',
      }}
    >
      <div className="flex items-center gap-8 w-full h-full text-[14px] ">
        {rest.children}
        <button onClick={changeOpenState} className="flex justify-center items-center w-30 h-30 ">
          <Image
            src={MainBlueArrowIc}
            alt="화살표 아이콘"
            className={`origin-center transition-transform duration-500 ease-in-out ${
              isOpen ? 'rotate-90' : '-rotate-90'
            }`}
          />
        </button>
      </div>
    </Box>
  );
}
