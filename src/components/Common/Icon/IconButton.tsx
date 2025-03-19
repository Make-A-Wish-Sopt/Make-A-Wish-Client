import { ColorsTypes } from '@/styles/styles';
import { MouseEventHandler, PropsWithChildren } from 'react';

interface IconButtonProps {
  onClick: MouseEventHandler;
  hoverColor?: keyof ColorsTypes;
}

const IconButton = ({
  onClick,
  children,
  hoverColor = 'black',
}: IconButtonProps & PropsWithChildren) => {
  return (
    //호버기능 추가예정
    <button className={`rounded-full p-5 `} onClick={onClick}>
      {children}
    </button>
  );
};

export default IconButton;
