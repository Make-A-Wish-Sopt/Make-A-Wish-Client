import Image from 'next/image';
import styled from 'styled-components';

interface IconButtonProps {
    src: string;
    alt: string;
    onClick?: () => void;
};

export default function IconButton(props: IconButtonProps) {
    const { src, alt, onClick } = props;

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <Image onClick={handleClick} src={src} alt={alt} style={{ cursor: 'pointer' }} ></Image>
    );
}