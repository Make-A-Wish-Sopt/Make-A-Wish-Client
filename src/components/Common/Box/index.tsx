import { ColorsTypes, FontsTypes } from '@/styles/styles';

import { CSSProperties, PropsWithChildren } from 'react';

interface BoxProps {
  bgColor?: keyof ColorsTypes;
  fontColor: keyof ColorsTypes;
  font?: keyof FontsTypes;
  styles?: CSSProperties;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export default function Box(props: PropsWithChildren<BoxProps>) {
  const { bgColor, fontColor, styles, onClick, children } = props;

  return (
    <div
      className={`w-full h-50 bg-${bgColor} text-${fontColor} p-10 pl-12 rounded-xl`}
      style={styles}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
