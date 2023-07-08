import Image from 'next/image';

interface IconButtonProps {
  src: string;
  alt: string;
  handleClick?: () => void;
}

export default function IconButton(props: IconButtonProps) {
  const { src, alt, handleClick } = props;


  return <Image onClick={handleClick} src={src} alt={alt} style={{ cursor: 'pointer' }} />;
}
