'use client';

import React, { ButtonHTMLAttributes, CSSProperties, PropsWithChildren, ReactNode } from 'react';
import { colors, ColorsTypes, FontsTypes } from '@/styles/styles';
import { sendGAEvent, sendGTMEvent } from '@next/third-parties/google';

export const defaultButtonClassName = ({
  font = 'bitbit',
  bgColor = 'main_blue',
  restClass,
}: {
  font?: keyof FontsTypes;
  bgColor: keyof ColorsTypes;
  restClass?: string;
}) => {
  return `flex justify-center items-center w-full h-50 text-[20px] font-${font} bg-${bgColor} rounded-xl ${restClass ?? ''}`;
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  disabled?: boolean;
  bgColor?: keyof ColorsTypes;
  fontColor?: keyof ColorsTypes;
  font?: keyof FontsTypes;
  onClick?: React.MouseEventHandler<HTMLElement>;
  gaEventLable?: string;
  className?: string;
}

function Button(props: PropsWithChildren<ButtonProps>) {
  const {
    disabled,
    bgColor = 'main_blue',
    fontColor = 'black',
    font = 'bitbit',
    onClick,
    icon,
    gaEventLable,
    className,
    children,
    style,
  } = props;

  let backgroundColor = colors.main_blue;
  if (disabled) backgroundColor = colors.gray2;
  else if (bgColor) backgroundColor = colors[bgColor];

  let textColor = colors.black;
  if (disabled) textColor = colors.white;
  else if (fontColor) textColor = colors[fontColor];

  const defaultStyle: CSSProperties = {
    backgroundColor,
    color: textColor,
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  const combinedStyle: CSSProperties = { ...defaultStyle, ...style };

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (onClick) {
      if (gaEventLable) {
        sendGTMEvent('event', gaEventLable);
        sendGAEvent('event', gaEventLable);
      }
      onClick(e);
    }
  }

  return (
    <button
      type="button"
      className={`flex justify-center items-center ${
        icon ? 'gap-10px' : 'gap-0'
      } w-full h-50 text-[20px] font-${font} bg-${bgColor} rounded-xl ${className}`}
      disabled={disabled}
      onClick={handleClick}
      style={combinedStyle}
    >
      {icon}
      {children}
    </button>
  );
}

export default Button;
