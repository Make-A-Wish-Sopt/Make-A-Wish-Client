import { ColorsTypes } from '@/styles/styles';
import { PropsWithChildren } from 'react';

export interface ModalProps {
  isOpen: boolean;
  handleToggle: () => void;
  bgColor?: keyof ColorsTypes;
}

export default function Modal(props: PropsWithChildren<ModalProps>) {
  const { isOpen, handleToggle, bgColor, children } = props;

  return (
    <>
      {isOpen && (
        <div
          id="modal-overlay"
          className={`fixed top-0 left-0 flex justify-center items-center w-full h-[100svh] z-[9999] ${
            bgColor ? `bg-${bgColor}` : 'bg-black/70'
          }`}
          onClick={handleToggle}
        >
          <div className="w-auto h-auto" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
