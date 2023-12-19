import Image from 'next/image';

interface IconButtonProps {
  src: string;
  alt: string;
  onClick?: () => void;
}

export default function IconButton(props: IconButtonProps) {
  const { src, alt, onClick } = props;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button onClick={handleClick}>
      <Image src={src} alt={alt} />
    </button>
  );
}
