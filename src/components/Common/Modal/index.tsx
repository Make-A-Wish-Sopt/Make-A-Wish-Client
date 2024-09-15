import { PropsWithChildren } from 'react';

interface ModalProps {
  isOpen: boolean;
  handleToggle: () => void;
  bgNone?: boolean;
}

export default function Modal(props: PropsWithChildren<ModalProps>) {
  const { isOpen, handleToggle, bgNone, children } = props;

  return (
    <>
      {isOpen && (
        <div
          id="modal-overlay"
          className={`fixed top-0 left-0 flex justify-center items-center w-full h-[100svh] z-[9999] ${
            bgNone ? 'bg-transparent' : 'bg-black/70'
          }`}
          onClick={handleToggle}
        >
          <div onClick={(e) => e.stopPropagation()}>{children}</div>
        </div>
      )}
    </>
  );
}
