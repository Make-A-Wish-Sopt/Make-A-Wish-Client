import Image from 'next/image';
import Box from '../Common/Box';

import { colors } from '@/styles/styles';
import ArrowIcon from '../Common/Icon/ArrowIcon';

export default function MoreBox({
  text,
  disabled = false,
  handleClick,
}: {
  text: string;
  disabled?: boolean;
  handleClick?: () => void;
}) {
  function handleMoreClick() {
    if (disabled) return;

    handleClick();
  }

  return (
    <li>
      <Box
        onClick={handleMoreClick}
        styles={{
          backgroundColor: disabled ? colors.gray4 : colors.dark_green,
          color: disabled ? colors.gray3 : colors.main_blue,
        }}
      >
        <div className="flex justify-between items-center w-full h-full font-bitbit text-[18px]">
          {text}
          <ArrowIcon color={disabled ? 'gray3' : 'main_blue'} />
        </div>
      </Box>
    </li>
  );
}
