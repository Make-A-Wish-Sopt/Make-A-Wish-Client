'use client';

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
          className={`fixed top-0 left-0 flex justify-center items-center w-full h-full z-[9999]  ${
            bgColor ? `bg-${bgColor}` : 'bg-black/70'
          }`}
          onClick={handleState}
        >
          <div
            className="w-375  h-full"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: 'appearAnimation 0.3s ease-out forwards',
            }}
          >
            {children}
          </div>
          <style jsx>{`
            @keyframes appearAnimation {
              0% {
                transform: scale(0);
                opacity: 0;
              }
              100% {
                transform: scale(1);
                opacity: 1;
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
