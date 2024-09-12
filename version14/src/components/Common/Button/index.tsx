'use client';

import React, { CSSProperties, PropsWithChildren, ReactNode } from 'react';
import { colors, ColorsTypes, FontsTypes } from '@/styles/styles';

export interface ButtonProps {
  icon?: ReactNode;
  disabled?: boolean;
  bgColor?: keyof ColorsTypes;
  fontColor?: keyof ColorsTypes;
  font?: keyof FontsTypes;
  onClick?: React.MouseEventHandler<HTMLElement>;
  styles?: CSSProperties;
}

const Button = (props: PropsWithChildren<ButtonProps>) => {
  const { disabled, bgColor, fontColor, font, styles, onClick, icon, children } = props;

  const defaultStyle: CSSProperties = {
    backgroundColor: disabled ? colors.gray2 : bgColor ? colors[bgColor] : colors.main_blue,
    color: disabled ? colors.white : fontColor ? colors[fontColor] : colors.black,
  };

  const combinedStyle: CSSProperties = { ...defaultStyle, ...styles };

  return (
    <button
      className={`flex justify-center items-center ${
        icon ? 'gap-10px' : 'gap-0'
      } w-full h-50 text-[20px] font-${font ? font : 'bitbit'} bg-${
        bgColor ? bgColor : 'main_blue'
      } rounded-xl`}
      disabled={disabled}
      onClick={onClick}
      style={combinedStyle}
    >
      {icon && icon}
      {children}
    </button>
  );
};

export default Button;
