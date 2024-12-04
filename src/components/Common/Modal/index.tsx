'use client';

import { ColorsTypes } from '@/styles/styles';
import { PropsWithChildren, useEffect } from 'react';

export interface ModalProps {
  isOpen: boolean;
  handleState: () => void;
  bgColor?: keyof ColorsTypes;
}

export default function Modal(props: PropsWithChildren<ModalProps>) {
  const { isOpen, handleState, bgColor, children } = props;

  // const preventScroll = () => {
  //   const currentScrollY = window.scrollY;
  //   document.body.style.position = 'fixed';
  //   document.body.style.width = '100%';
  //   document.body.style.top = `-${currentScrollY}px`;
  //   return currentScrollY;
  // };

  // const allowScroll = (prevScrollY) => {
  //   document.body.style.position = '';
  //   document.body.style.width = '';
  //   document.body.style.top = '';
  //   window.scrollTo(0, prevScrollY);
  // };

  // useEffect(() => {
  //   if (isOpen) {
  //     const prevScrollY = preventScroll();
  //     return () => {
  //       allowScroll(prevScrollY);
  //     };
  //   }
  // }, [isOpen]);

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
          <div className="w-full h-full" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
