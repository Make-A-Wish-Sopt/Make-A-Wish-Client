import Image from 'next/image';
import styled from 'styled-components';

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
    <Button onClick={handleClick}>
      <Image src={src} alt={alt} />
    </Button>
  );
}

const Button = styled.button`
  border: none;
  background-color: transparent;
`;
