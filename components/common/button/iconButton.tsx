import Image from 'next/image';
import styled from 'styled-components';

interface IconButtonProps {
    src: string;
    alt: string;
};

export default function IconButton(props: IconButtonProps) {
    const { src, alt } = props;

    return (
        <Image src={src} alt={alt} style={{ cursor: 'pointer' }} />
    );
}