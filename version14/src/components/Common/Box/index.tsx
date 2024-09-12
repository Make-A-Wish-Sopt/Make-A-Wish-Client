import { ColorsTypes, FontsTypes } from '@/styles/styles';

import { CSSProperties, PropsWithChildren } from 'react';

interface BoxProps {
  bgColor: keyof ColorsTypes;
  fontColor: keyof ColorsTypes;
  font?: keyof FontsTypes;
  styles: CSSProperties;
}

export default function Box(props: PropsWithChildren<BoxProps>) {
  const { bgColor, fontColor, styles, children } = props;

  return (
    <div className={`w-full h-50 bg-${bgColor} text-${fontColor} rounded-xl`} style={styles}>
      {children}
    </div>
  );
}
