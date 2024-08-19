'use client';

import React, { PropsWithChildren, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { ButtonSizeType, ColorSystemType, StyledCommon } from '../CommonStyle';
import { useRouter } from 'next/navigation';

export interface ButtonProps {
  size?: ButtonSizeType;
  icon?: ReactNode;
  color: ColorSystemType;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  handleRouter?: (path: string) => void;
}

const Button = (props: PropsWithChildren<ButtonProps>) => {
  const { size, color, disabled, onClick, icon, handleRouter, children } = props;

  const router = useRouter();

  const handleClick = () => {
    if (handleRouter) {
      return handleRouter;
    } else {
      return onClick;
    }
  };

  return (
    <StyledButton
      as="button"
      className={disabled ? 'gray1_white' : color}
      size={size || 'full'}
      disabled={disabled}
      icon={icon}
      onClick={onClick}
    >
      {icon && icon}
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled(StyledCommon)<{ icon?: ReactNode }>`
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.icon !== undefined &&
    css`
      gap: 1rem;
    `}
`;
