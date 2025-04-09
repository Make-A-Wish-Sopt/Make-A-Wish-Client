import ModalPortal from '@/layouts/ModalPortal';
import { ColorsTypes } from '@/styles/styles';
import { CloseBlueIc } from '@public/assets/icons';
import Image from 'next/image';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

interface ModalProps<T extends string[]> {
  modalKey: T[number];
  Trigger?: JSX.Element;
}

interface ModalOverlayType {
  bgColor?: keyof ColorsTypes | 'black/70';
  backDrop?: boolean;
  closeIcon?: boolean;
  bgScroll?: boolean;
}

interface ModalSubComponentProps extends PropsWithChildren {
  className?: string;
}

const useModals = <T extends string[]>() => {
  const [modalState, setModalState] = useState<Record<T[number], boolean>>(() =>
    [].reduce((acc, key) => ({ ...acc, [key]: false }), {} as Record<T[number], boolean>),
  );

  const openModal = (key: T[number]) => {
    setModalState({ ...modalState, [key]: true });
  };

  const closeModal = (key: T[number]) => {
    setModalState({ ...modalState, [key]: false });
  };

  const toggleModal = (key: T[number]) => {
    setModalState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const ModalKeyContext = createContext<T[number] | null>(null);

  const Modal = ({
    modalKey,
    Trigger,
    children,
  }: ModalProps<T> & ModalOverlayType & PropsWithChildren) => {
    return (
      <ModalKeyContext.Provider value={modalKey}>
        <div className="cursor-pointer">{Trigger}</div>
        {modalState[modalKey] ? <ModalPortal>{children}</ModalPortal> : null}
      </ModalKeyContext.Provider>
    );
  };

  Modal.ModalOverlay = ({
    bgColor = 'black/70',
    backDrop = true,
    className = 'fixed top-0 left-0 flex justify-center items-center w-full h-full z-[9999]',
    children,
  }: ModalSubComponentProps & ModalOverlayType) => {
    const modalKey = useContext(ModalKeyContext);

    return (
      <div
        id="modal-overlay"
        className={`${className || ''} bg-${bgColor}`}
        onClick={() => {
          backDrop && closeModal(modalKey);
        }}
      >
        {children}
      </div>
    );
  };

  Modal.ModalLayout = ({ className, children }: ModalSubComponentProps) => {
    const modalKey = useContext(ModalKeyContext);
    return (
      <>
        <div
          className={`w-375 h-full ${className || 'flex flex-col items-center justify-center'}`}
          style={{
            animation: modalState[modalKey] ? 'appearAnimation 0.3s ease-out forwards' : '',
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
      </>
    );
  };

  Modal.ModalHeader = ({
    className,
    onCloseButton = false,
    children,
  }: ModalSubComponentProps & { onCloseButton?: boolean }) => {
    const modalKey = useContext(ModalKeyContext);

    return (
      <>
        {onCloseButton ? (
          <>
            <div className="flex justify-end w-full px-22 ">
              <button onClick={() => closeModal(modalKey)}>
                <Image src={CloseBlueIc} alt="닫기" />
              </button>
            </div>
            <div className={`${className || ''}`}>{children}</div>
          </>
        ) : (
          <div className={`${className || ''}`}>{children}</div>
        )}
      </>
    );
  };

  Modal.ContentFrame = ({
    className,
    bgColor = 'main_blue',
    children,
  }: ModalSubComponentProps & { bgColor?: keyof ColorsTypes }) => {
    return (
      <div
        className={`bg-${bgColor} w-[85%] p-20 rounded-2xl ${className || ''} `}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    );
  };

  Modal.ContentHeader = ({
    className,
    CloseIcon,
    children,
  }: ModalSubComponentProps & { CloseIcon?: JSX.Element }) => {
    const modalKey = useContext(ModalKeyContext);

    return (
      <div className={`${className || ''}`}>
        {CloseIcon && <button onClick={() => closeModal(modalKey)}>{CloseIcon}</button>}
        {children}
      </div>
    );
  };

  Modal.ContentBody = ({ className, children }: ModalSubComponentProps) => {
    return <div className={`w-full ${className || ''}`}>{children}</div>;
  };

  Modal.ButtonWrapper = ({
    className = 'flex justify-between gap-10',
    children,
  }: ModalSubComponentProps) => {
    return <div className={`${className || ''}`}>{children}</div>;
  };

  return { modalState, Modal, openModal, closeModal, toggleModal };
};

export default useModals;
