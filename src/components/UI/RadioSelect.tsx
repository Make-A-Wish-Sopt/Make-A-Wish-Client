import Image from 'next/image';
import { SelectRadioIc, UnSelectRadioIc } from '../../../public/assets/icons';

export default function RadioSelect({ isSelect }: { isSelect: boolean }) {
  return <Image src={isSelect ? SelectRadioIc : UnSelectRadioIc} alt="라디오 아이콘" />;
}
