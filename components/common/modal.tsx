import { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface ModalProps {
  isOpen: boolean;
  modalToggle: () => void;
}

export default function Modal(props: PropsWithChildren<ModalProps>) {
  const { isOpen, modalToggle, children } = props;
  return (
    <>
      {isOpen && (
        <Styled.ModalOverlay onClick={modalToggle}>
          <Styled.ModalContainer onClick={(e) => e.stopPropagation()}>
            {children}
          </Styled.ModalContainer>
        </Styled.ModalOverlay>
      )}
    </>
  );
}

const Styled = {
  ModalOverlay: styled.div`
    z-index: 9999;
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  ModalContainer: styled.div``,
};
