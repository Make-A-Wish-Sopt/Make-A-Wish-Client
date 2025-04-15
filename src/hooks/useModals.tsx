'use client';

import ModalPortal from '@/layouts/ModalPortal';
import { ColorsTypes } from '@/styles/styles';
import { CloseBlueIc } from '@public/assets/icons';
import Image from 'next/image';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';

interface ModalProps<T extends string[]> {
  modalKey: T[number];
  Trigger?: JSX.Element;
}

interface ModalSubComponentProps extends PropsWithChildren {
  className?: string;
}

const ModalKeyContext = createContext<string | null>(null);

const useModals = <T extends string[]>() => {
  const [modalState, setModalState] = useState<Record<T[number], boolean>>(() =>
    ([] as T[number][]).reduce(
      (acc, key) => ({ ...acc, [key]: false }),
      {} as Record<T[number], boolean>,
    ),
  );

  const openModal = useCallback((key: T[number]) => {
    setModalState((prev) => ({ ...prev, [key]: true }));
  }, []);

  const closeModal = useCallback((key: T[number]) => {
    setModalState((prev) => ({ ...prev, [key]: false }));
  }, []);

  const toggleModal = useCallback((key: T[number]) => {
    setModalState((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  function Modal({ modalKey, Trigger, children }: ModalProps<T> & PropsWithChildren) {
    return (
      <ModalKeyContext.Provider value={modalKey}>
        {Trigger && <div className="cursor-pointer">{Trigger}</div>}
        {modalState[modalKey] && <ModalPortal>{children}</ModalPortal>}
      </ModalKeyContext.Provider>
    );
  }

  function ModalOverlay({ className, children }: ModalSubComponentProps) {
    const modalKey = useContext(ModalKeyContext);

    const handleClick = () => {
      if (modalKey) closeModal(modalKey);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') handleClick();
    };

    return (
      <div
        id="modal-overlay"
        role="button"
        tabIndex={0}
        className={`fixed top-0 left-0 flex justify-center items-center w-full h-full z-[9999] bg-black/70 ${className}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
    );
  }

  function ModalLayout({ className, children }: ModalSubComponentProps) {
    const modalKey = useContext(ModalKeyContext);

    return (
      <div
        className={`w-375 h-full ${
          className || 'flex flex-col items-center justify-center'
        } ${modalKey ? 'animate-appear' : ''}`}
      >
        {children}
      </div>
    );
  }

  function ModalHeader({
    className,
    onCloseButton = false,
    children,
  }: ModalSubComponentProps & { onCloseButton?: boolean }) {
    const modalKey = useContext(ModalKeyContext);

    return (
      <>
        {onCloseButton && modalKey && (
          <div className="flex justify-end w-full px-22">
            <button type="button" onClick={() => closeModal(modalKey)}>
              <Image src={CloseBlueIc} alt="닫기" />
            </button>
          </div>
        )}
        <div className={`${className || ''}`}>{children}</div>
      </>
    );
  }

  function ContentFrame({
    className,
    bgColor = 'main_blue',
    children,
  }: ModalSubComponentProps & { bgColor?: keyof ColorsTypes }) {
    const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
      e.stopPropagation();
    };

    return (
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick(e);
          }
        }}
        className={`bg-${bgColor} w-[85%] p-20 rounded-2xl ${className || ''}`}
      >
        {children}
      </div>
    );
  }

  function ContentHeader({
    className,
    CloseIcon,
    children,
  }: ModalSubComponentProps & { CloseIcon?: ReactNode }) {
    const modalKey = useContext(ModalKeyContext);

    return (
      <div className={`${className || ''}`}>
        {CloseIcon && modalKey && (
          <button type="button" onClick={() => closeModal(modalKey)}>
            {CloseIcon}
          </button>
        )}
        {children}
      </div>
    );
  }

  function ContentBody({ className, children }: ModalSubComponentProps) {
    return <div className={`w-full ${className || ''}`}>{children}</div>;
  }

  function ButtonWrapper({
    className = 'flex justify-between gap-10',
    children,
  }: ModalSubComponentProps) {
    return <div className={className}>{children}</div>;
  }

  // Subcomponent 바인딩
  Modal.ModalOverlay = ModalOverlay;
  Modal.ModalLayout = ModalLayout;
  Modal.ModalHeader = ModalHeader;
  Modal.ContentFrame = ContentFrame;
  Modal.ContentHeader = ContentHeader;
  Modal.ContentBody = ContentBody;
  Modal.ButtonWrapper = ButtonWrapper;

  return { modalState, Modal, openModal, closeModal, toggleModal };
};

export default useModals;
