import Image from 'next/image';
import ImageBox from './imageBox';

interface ItemImageBoxProps {
  src: string;
  alt: string;
}

export default function ItemImageBox(props: ItemImageBoxProps) {
  const { src, alt } = props;
  return (
    <ImageBox boxType="imageBox--image" colorSystem="white_mainBlue">
      <Image src={src} fill={true} alt={alt} />
    </ImageBox>
  );
}
