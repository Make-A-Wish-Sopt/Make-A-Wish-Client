import Image from 'next/image';
import Box from '../Common/Box';
import { ArrowRightIc } from '../../../public/assets/icons';

export default function MoreBox({ text, handleClick }: { text: string; handleClick: () => void }) {
  return (
    <li>
      <Box bgColor="dark_green" fontColor="main_blue" onClick={handleClick}>
        <div className="flex justify-between items-center w-full h-full font-bitbit text-[18px]">
          {text}
          <Image src={ArrowRightIc} alt="왼쪽 화살표" width={10} priority></Image>
        </div>
      </Box>
    </li>
  );
}
