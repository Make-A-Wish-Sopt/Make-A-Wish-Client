import styled from 'styled-components';
import { BoxSize, StyledBox } from '.';
import theme from '@/styles/theme';
import { ColorSystemType, ImageBoxTypes } from '@/types/common/box/boxStyleType';
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

const StyledImageBox = styled(StyledBox)<{ width?: number; height: number }>`
  ${BoxSize.Image}
  padding: 1rem 1rem 1rem 1.2rem;
  border: 0.1rem solid ${theme.colors.main_blue};

  //ImageBox Style System
  &.imageBox--textarea {
    border-radius: 1rem;
    padding: 1.4rem 1.2rem;
  }

  &.imageBox--image {
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 1.6rem;

    object-fit: cover;
  }
`;
