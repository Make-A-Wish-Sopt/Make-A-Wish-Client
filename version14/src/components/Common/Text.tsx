import { ColorsTypes, FontsTypes } from '@/styles/theme';
import { forwardRef, ReactNode, Ref } from 'react';
import styled, { CSSProperties } from 'styled-components';

export interface BaseProps {
  children?: ReactNode;
  font?: keyof FontsTypes;
  color: keyof ColorsTypes;
  style?: CSSProperties;
}

export type Props = BaseProps;

type TextProps<Element extends keyof JSX.IntrinsicElements = 'span'> = BaseProps & {
  as?: Element;
};

function Text<Element extends keyof JSX.IntrinsicElements = 'span'>(
  props: TextProps<Element>,
  ref: Ref<HTMLElement>,
) {
  const { as: Component, children, font, color, style, ...rest } = props as TextProps;

  return (
    <StText as={Component} ref={ref} font={font} color={color} style={style} {...rest}>
      {children}
    </StText>
  );
}

export const StText = styled.span<{
  font: keyof FontsTypes;
  color: keyof ColorsTypes;
}>`
  ${({ theme, font }) => theme.fonts[font]};
  color: ${({ theme, color }) => theme.colors[color]};

  white-space: pre-wrap;
  user-select: text;
`;

export default forwardRef(Text);
