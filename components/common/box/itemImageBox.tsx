import Image from 'next/image';
import ImageBox from './imageBox';
import styled from 'styled-components';

interface ItemImageBoxProps {
  src: string;
  alt: string;
}

export default function ItemImageBox(props: ItemImageBoxProps) {
  const { src, alt } = props;
  return (
    <ImageBox boxType="imageBox--image" colorSystem="white_mainBlue">
      <Image src={src} alt={alt} fill={true} sizes="(max-width: 768px)" objectFit="cover" />
    </ImageBox>
  );
}
