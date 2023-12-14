import styled from 'styled-components';
import { BoxSize, StyledBox } from '.';
import theme from '@/styles/theme';
import { ColorSystemType, ImageBoxTypes } from '@/types/common/boxStyleType';
import { PropsWithChildren } from 'react';

interface ImageBoxProps {
  width?: number;
  height?: number;
  boxType?: ImageBoxTypes;
  colorSystem: ColorSystemType;
}

export default function ImageBox(props: PropsWithChildren<ImageBoxProps>) {
  const { width, height, boxType, colorSystem, children } = props;

  return (
    <StyledImageBox className={`${colorSystem} ${boxType}`} width={width} height={height}>
      {children}
    </StyledImageBox>
  );
}

type ImageBoxStyleType = 'Textarea' | 'Image';
const ImageBoxStyle: Record<ImageBoxStyleType, CSSProperties> = {
  Textarea: {
    padding: '1.4rem 1.2rem',
    border: `0.1rem solid ${theme.colors.main_blue}`,
  },

  Image: {
    position: 'relative',
    objectFit: 'cover',
    border: `0.1rem solid ${theme.colors.main_blue}`,
  },
};

const StyledImageBox = styled(StyledBox)<{ width?: number; height: number }>`
  padding: 1rem 1rem 1rem 1.2rem;
  border: 0.1rem solid ${theme.colors.main_blue};
  border-radius: 1rem;

  //ImageBox Style System
  &.imageBox--textarea {
    ${BoxSize.Image}
    ${ImageBoxStyle.Textarea}
  }

  &.imageBox--image {
    ${BoxSize.Image}
    ${ImageBoxStyle.Image}
  }
`;
