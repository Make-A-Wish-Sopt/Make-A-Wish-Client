import { ColorsTypes, FontsTypes } from '@/styles/styles';

import { CSSProperties, PropsWithChildren } from 'react';

export interface BoxProps {
  bgColor?: keyof ColorsTypes;
  fontColor?: keyof ColorsTypes;
  font?: keyof FontsTypes;
  styles?: CSSProperties;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export default function Box(props: PropsWithChildren<BoxProps>) {
  const {
    bgColor = 'dark_green',
    font = 'galmuri',
    fontColor = 'white',
    styles,
    onClick,
    children,
  } = props;

  return (
    <div
      className={`w-full h-50 bg-${bgColor} font-${font} text-${fontColor} p-10 pl-12 rounded-xl`}
      style={styles}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
