import { ColorsTypes } from '@/styles/styles';
import { PropsWithChildren } from 'react';

export interface ModalProps {
  isOpen: boolean;
  handleState: () => void;
  bgColor?: keyof ColorsTypes;
}

export default function Modal(props: PropsWithChildren<ModalProps>) {
  const { isOpen, handleState, bgColor, children } = props;

  return (
    <>
      {isOpen && (
        <div
          id="modal-overlay"
          className={`fixed top-0 left-0 flex justify-center items-center w-full h-[100svh] z-[9999] ${
            bgColor ? `bg-${bgColor}` : 'bg-black/70'
          }`}
          onClick={handleState}
        >
          <div className="w-full h-full" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
