import { colors, ColorsTypes, FontsTypes } from '@/styles/styles';
import { CSSProperties, PropsWithChildren, ElementType, ComponentPropsWithoutRef } from 'react';

export interface BoxProps<T extends ElementType = 'div'> {
  as?: T;
  bgColor?: keyof ColorsTypes;
  fontColor?: keyof ColorsTypes;
  font?: keyof FontsTypes;
  styles?: CSSProperties;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export default function Box<T extends ElementType = 'div' | 'button' | 'li'>(
  props: PropsWithChildren<BoxProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof BoxProps>>,
) {
  const {
    as: Component = 'div',
    bgColor = 'dark_green',
    font = 'galmuri',
    fontColor = 'white',
    styles,
    onClick,
    className = '',
    disabled,
    children,
    ...rest
  } = props;

  return (
    <Component
      className={`w-full h-50 font-${font} text-${fontColor} p-10 pl-12 rounded-xl ${className}`}
      style={{
        ...styles,
        backgroundColor: disabled ? colors.gray4 : bgColor ? colors[bgColor] : undefined,
        color: disabled ? colors.gray3 : undefined,
      }}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Component>
  );
}
