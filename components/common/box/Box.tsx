import theme, { ColorsTypes } from '@/styles/theme';
import { BoxType } from '@/types/common/boxStyleType';
import { assignColor } from '@/utils/common/assignStyle';
import { PropsWithChildren } from 'react';
import styled, { CSSProperties } from 'styled-components';

interface BoxProps {
  boxType?: keyof BoxType; //이거 전체적으로 바꿔야함
  boxStyle?: CSSProperties;
  bgColor?: keyof ColorsTypes;
  borderColor?: keyof ColorsTypes;
  padding?: boolean;
}

export default function Box(props: PropsWithChildren<BoxProps>) {
  const { boxType, boxStyle, bgColor, borderColor, padding, children } = props;

  return (
    <Styled.BoxContainer
      className={boxType}
      bgColor={assignColor(bgColor)}
      borderColor={assignColor(borderColor)}
      padding={padding}
      style={boxStyle}
    >
      {children}
    </Styled.BoxContainer>
  );
}

const Styled = {
  BoxContainer: styled.div<{
    bgColor: string | undefined;
    borderColor: string | undefined;
    padding: boolean | undefined;
  }>`
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${(props) => props.bgColor};
    border: ${(props) => props.borderColor && `1px solid ${props.borderColor}`};

    padding: ${(props) => (props.padding ? '1rem 1rem 1rem 1.2rem' : '0')};

    border-radius: 1rem;

    &.small {
      width: 7.4rem;
      height: 4.6rem;
    }

    &.medium {
      width: 16rem;
      height: 5rem;
    }

    &.large {
      width: 33.1rem;
      height: 5rem;
    }

    &.oneThree {
      width: 10.6rem;
      height: 5rem;
    }

    &.twoThree {
      width: 21.9rem;
      height: 5rem;
    }

    &.bank {
      width: 9rem;
      height: 6.6rem;

      padding: 1rem 0 0.5rem;

      background-color: ${theme.colors.white};
      border-radius: 1rem;

      cursor: pointer;
    }

    &.image {
      width: 33.1rem;
      height: 15rem;

      padding: ${(props) => props.padding && '1.2rem 1rem 1.2rem 1.2rem'};
    }
  `,
};
