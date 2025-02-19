import Image from 'next/image';
import { SelectRadioIc, UnSelectRadioIc } from '../../../public/assets/icons';

export default function RadioSelect({ isSelect }: { isSelect: boolean }) {
  if (isSelect) {
    return <Image src={SelectRadioIc} alt="라디오 아이콘" width={20} height={20} />;
  } else {
    return <Image src={UnSelectRadioIc} alt="라디오 아이콘" width={20} height={20} />;
  }
}
