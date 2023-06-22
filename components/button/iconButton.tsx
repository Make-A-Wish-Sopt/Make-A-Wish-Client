import Image from 'next/image';

interface IconButtonProps {
  src: string;
  alt: string;
  onClick?: () => void;
}

export default function IconButton(props: IconButtonProps) {
  const { src, alt, onClick } = props;


  return <Image onClick={onClick} src={src} alt={alt} style={{ cursor: 'pointer' }} />;
}
