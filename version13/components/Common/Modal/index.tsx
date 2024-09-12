import { PropsWithChildren } from 'react';
import styled from 'styled-components';

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
        <Styled.ModalOverlay onClick={handleToggle} bgNone={bgNone}>
          <Styled.ModalContainer onClick={(e) => e.stopPropagation()}>
            {children}
          </Styled.ModalContainer>
        </Styled.ModalOverlay>
      )}
    </>
  );
}

const Styled = {
  ModalOverlay: styled.div<{ bgNone?: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 9999;
    width: 100%;
    height: 100svh;

    position: fixed;
    top: 0;
    left: 0;
    background: ${(props) => (props.bgNone ? 'transparent' : 'rgba(0, 0, 0, 0.7)')};
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  ModalContainer: styled.div``,
};
